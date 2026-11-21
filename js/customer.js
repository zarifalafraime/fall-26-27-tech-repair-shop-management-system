const customer = "Demo Customer";
const myRepairs = shop.repairs.filter(job => job.customer === customer);

function submitRepair(form) {
  for (const key of ["device", "model", "serial", "issue"]) {
    if (!value(key)) {
      message("Enter the device details and describe the issue.");
      return false;
    }
  }
  const id = Math.max(1000, ...shop.repairs.map(job => job.id)) + 1;
  shop.repairs.push({id, customer, device: value("device"), model: value("model"), serial: value("serial"),
    issue: value("issue"), technician: "", status: "Pending"});
  shop.updates.unshift("Repair #" + id + " received for review.");
  saveShop();
  form.reset();
  message("Repair request #" + id + " submitted.");
  return false;
}

function renderHistory() {
  for (const job of myRepairs) {
    let approved = 0;
    for (const charge of shop.charges) {
      if (charge.job === job.id && charge.status === "Approved") approved += charge.cost;
    }
    addRow(element("history"), [job.id, job.device + " " + job.model, job.issue, job.status, approved.toFixed(2), job.notes || "Awaiting repair notes"]);
  }
  emptyTable(element("history"), 6, "No repair requests yet.");
}

function decide(charge, decision) {
  charge.status = decision;
  shop.updates.unshift("Additional charge for #" + charge.job + ": " + decision + ".");
  saveShop();
  renderUpdates();
}

function renderUpdates() {
  const list = element("updates");
  list.replaceChildren();
  for (const update of shop.updates) {
    const li = document.createElement("li");
    li.textContent = update;
    list.appendChild(li);
  }
  const body = element("decisions");
  body.replaceChildren();
  for (const charge of shop.charges) {
    if (!myRepairs.some(job => job.id === charge.job)) continue;
    const cell = addRow(body, [charge.job, charge.work, charge.cost]).insertCell();
    if (charge.status === "Pending") {
      action(cell, "Approve", function () { decide(charge, "Approved"); });
      action(cell, "Decline", function () { decide(charge, "Declined"); });
    } else {
      cell.textContent = charge.status;
    }
  }
  emptyTable(body, 4, "No additional charges.");
}

if (element("history")) renderHistory();
if (element("updates")) renderUpdates();
