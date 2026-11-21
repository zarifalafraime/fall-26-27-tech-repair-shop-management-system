function renderAssignments() {
  const body = element("assignments");
  body.innerHTML = "";
  for (const job of shop.repairs) {
    const cell = addCell(addRow(body, [job.id, job.customer, job.device, job.issue]), "");
    if (job.technician) {
      cell.innerHTML = job.technician;
    } else {
      action(cell, "Assign Demo Technician", function () {
        job.technician = "Demo Technician";
        job.status = "Assigned";
        shop.updates.push("Repair #" + job.id + " assigned to " + job.technician + ".");
        renderAssignments();
      });
    }
  }
}

function renderReturns() {
  const body = element("returnRows");
  body.innerHTML = "";
  for (const item of shop.returns) addRow(body, [item.product, item.kind, item.quantity, item.reason]);
  emptyTable(body, 4, "No damaged or returned products recorded.");
}

function saveReturn(form) {
  if (!value("product") || !value("reason")) {
    message("Enter a product and a reason.");
    return false;
  }
  shop.returns.push({product: value("product"), kind: value("kind"), quantity: Number(value("quantity")), reason: value("reason")});
  form.reset();
  renderReturns();
  message("Product record saved.");
  return false;
}

function renderStock() {
  const body = element("stockRows");
  body.innerHTML = "";
  for (const item of shop.stock) {
    const alert = item.quantity <= item.minimum ? "Low stock" : "In stock";
    addRow(body, [item.name, item.quantity, item.minimum, alert]);
  }
}

function setMinimum() {
  for (const item of shop.stock) {
    if (item.name === value("part")) item.minimum = Number(value("minimum"));
  }
  renderStock();
  message("Minimum quantity updated.");
  return false;
}

if (element("assignments")) renderAssignments();
if (element("returnRows")) renderReturns();
if (element("stockRows")) {
  for (const item of shop.stock) addOption(element("part"), item.name, item.name);
  renderStock();
}
