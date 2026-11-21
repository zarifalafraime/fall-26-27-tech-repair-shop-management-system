// Sample shop records are shared by the role pages in the current demo tab.
const shopKey = "techcare.shop.v1";
const shop = JSON.parse(sessionStorage.getItem(shopKey)) || {
  repairs: [
    {id: 1001, customer: "Demo Customer", device: "Laptop", model: "ThinkPad", serial: "DEMO1",
      issue: "Does not turn on", technician: "Demo Technician", status: "Assigned"}
  ],
  stock: [{name: "Laptop adapter", quantity: 2, minimum: 3}],
  returns: [],
  charges: [],
  updates: ["Repair #1001 assigned to Demo Technician.", "Order #5042: Replacement part has arrived."]
};

function saveShop() {
  sessionStorage.setItem(shopKey, JSON.stringify(shop));
}

function element(id) {
  return document.getElementById(id);
}

function value(id) {
  return element(id).value.trim();
}

function message(text) {
  element("feedback").textContent = text;
}

function addRow(body, values) {
  const row = body.insertRow();
  for (const text of values) row.insertCell().textContent = text;
  return row;
}

function action(cell, label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.onclick = handler;
  cell.appendChild(button);
}

function emptyTable(body, columns, text) {
  if (!body.rows.length) {
    const cell = body.insertRow().insertCell();
    cell.colSpan = columns;
    cell.textContent = text;
  }
}
