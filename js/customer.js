const customer = "Demo Customer";
const myRepairs = [];
for (const job of shop.repairs) {
  if (job.customer === customer) myRepairs.push(job);
}

function submitRepair(form) {
  for (const key of ["device", "model", "serial", "issue"]) {
    if (!value(key)) {
      message("Enter the device details and describe the issue.");
      return false;
    }
  }
  let id = 1001;
  for (const job of shop.repairs) {
    if (job.id >= id) id = job.id + 1;
  }
  shop.repairs.push({id, customer, device: value("device"), model: value("model"), serial: value("serial"),
    issue: value("issue"), technician: "", status: "Pending"});
  shop.updates.push("Repair #" + id + " received for review.");
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
    addRow(element("history"), [job.id, job.device + " " + job.model, job.issue, job.status, Math.round(approved * 100) / 100, job.notes || "Awaiting repair notes"]);
  }
  emptyTable(element("history"), 6, "No repair requests yet.");
}

function decide(index, decision) {
  const charge = shop.charges[index];
  charge.status = decision;
  shop.updates.push("Additional charge for #" + charge.job + ": " + decision + ".");
  renderUpdates();
}

function renderUpdates() {
  const list = element("updates");
  list.innerHTML = "";
  for (const update of shop.updates) {
    const li = document.createElement("li");
    li.innerHTML = update;
    list.appendChild(li);
  }
  const body = element("decisions");
  body.innerHTML = "";
  for (let index = 0; index < shop.charges.length; index++) {
    const charge = shop.charges[index];
    let mine = false;
    for (const job of myRepairs) {
      if (job.id === charge.job) mine = true;
    }
    if (mine) {
      const cell = addCell(addRow(body, [charge.job, charge.work, charge.cost]), "");
      if (charge.status === "Pending") {
        cell.innerHTML = "<button type='button' onclick=\"decide(" + index + ", 'Approved')\">Approve</button> " +
          "<button type='button' onclick=\"decide(" + index + ", 'Declined')\">Decline</button>";
      } else {
        cell.innerHTML = charge.status;
      }
    }
  }
  emptyTable(body, 4, "No additional charges.");
}

if (element("history")) renderHistory();
if (element("updates")) renderUpdates();
