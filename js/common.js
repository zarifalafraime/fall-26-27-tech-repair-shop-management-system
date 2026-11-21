function field(id) {
  return document.getElementById(id);
}

// Encode values before displaying form input as HTML.
function displayText(value) {
  let result = "";
  for (const letter of "" + value) {
    switch (letter) {
      case "<": result += "&lt;"; break;
      case ">": result += "&gt;"; break;
      case "&": result += "&amp;"; break;
      default: result += letter;
    }
  }
  return result;
}

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.innerHTML = displayText(value);
  row.appendChild(cell);
  return cell;
}

function addRow(body, values) {
  const row = document.createElement("tr");
  for (const value of values) addCell(row, value);
  body.appendChild(row);
  return row;
}

function addOption(select, label, value) {
  const option = document.createElement("option");
  option.value = value;
  option.innerHTML = displayText(label);
  select.appendChild(option);
}

function findUser(email) {
  for (const user of users) {
    if (user.email.toLowerCase() === email.toLowerCase()) return user;
  }
  return null;
}

function showMessage(text) {
  field("message").innerHTML = displayText(text);
}

function logAction(user, details) {
  const now = new Date();
  activityLog.push({time: now.getHours() + ":" + now.getMinutes(), user: user.name, role: user.role, details});
}
