// Each page starts with the same sample shop records.
const shop = {
  repairs: [
    {id: 1001, customer: "Demo Customer", device: "Laptop", model: "ThinkPad", serial: "DEMO1",
      issue: "Does not turn on", technician: "Demo Technician", status: "Assigned"},
    {id: 1002, customer: "Demo Customer", device: "PC", model: "Desktop", serial: "DEMO2",
      issue: "No display", technician: "", status: "Pending"}
  ],
  stock: [{name: "Laptop adapter", quantity: 2, minimum: 3}],
  returns: [],
  charges: [{job: 1001, work: "Replace adapter", cost: 500, status: "Pending"}],
  updates: ["Repair #1001 assigned to Demo Technician.", "Order #5042: Replacement part has arrived."]
};

function element(id) {
  return document.getElementById(id);
}

function value(id) {
  return element(id).value.trim();
}

function message(text) {
  element("feedback").innerHTML = text;
}

function emptyTable(body, columns, text) {
  if (body.innerHTML === "") {
    body.innerHTML = "<tr><td colspan='" + columns + "'>" + text + "</td></tr>";
  }
}
