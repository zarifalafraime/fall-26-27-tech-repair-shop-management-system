function renderAssignments() {
  const body = element("assignments");
  body.replaceChildren();
  for (const job of shop.repairs) {
    const cell = addRow(body, [job.id, job.customer, job.device, job.issue]).insertCell();
    if (job.technician) {
      cell.textContent = job.technician;
    } else {
      action(cell, "Assign Demo Technician", function () {
        job.technician = "Demo Technician";
        job.status = "Assigned";
        shop.updates.unshift("Repair #" + job.id + " assigned to " + job.technician + ".");
        saveShop();
        renderAssignments();
      });
    }
  }
}

function renderReturns() {
  const body = element("returnRows");
  body.replaceChildren();
  for (const item of shop.returns) addRow(body, [item.product, item.kind, item.quantity, item.reason]);
  emptyTable(body, 4, "No damaged or returned products recorded.");
}

function saveReturn(form) {
  if (!value("product") || !value("reason")) {
    message("Enter a product and a reason.");
    return false;
  }
  shop.returns.unshift({product: value("product"), kind: value("kind"), quantity: Number(value("quantity")), reason: value("reason")});
  saveShop();
  form.reset();
  renderReturns();
  message("Product record saved.");
  return false;
}

function renderStock() {
  const body = element("stockRows");
  body.replaceChildren();
  for (const item of shop.stock) {
    const alert = item.quantity <= item.minimum ? "Low stock" : "In stock";
    addRow(body, [item.name, item.quantity, item.minimum, alert]);
  }
}

function setMinimum() {
  const item = shop.stock.find(part => part.name === value("part"));
  item.minimum = Number(value("minimum"));
  saveShop();
  renderStock();
  message("Minimum quantity updated.");
  return false;
}

if (element("assignments")) renderAssignments();
if (element("returnRows")) renderReturns();
if (element("stockRows")) {
  for (const item of shop.stock) element("part").add(new Option(item.name, item.name));
  renderStock();
}
