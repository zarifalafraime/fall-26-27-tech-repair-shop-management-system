function field(id) {
  return document.getElementById(id);
}

function findUser(email) {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

function showMessage(text) {
  field("message").textContent = text;
}

// Keep activity across the three separate admin pages in this tab.
function logAction(user, details) {
  const entries = JSON.parse(sessionStorage.getItem("repairShopLog") || "[]");
  entries.unshift({time: new Date().toLocaleString(), user: user.name, role: user.role, details});
  sessionStorage.setItem("repairShopLog", JSON.stringify(entries));
}

function addCells(row, values) {
  for (const value of values) row.insertCell().textContent = value;
}
