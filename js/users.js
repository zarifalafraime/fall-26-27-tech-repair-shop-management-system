let editIndex = -1;

function renderUsers() {
  const body = field("userRows");
  body.innerHTML = "";
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const row = addRow(body, [user.name, user.email, user.role, user.status]);
    const actions = addCell(row, "");
    const edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.addEventListener("click", function () { editUser(index); });
    const ban = document.createElement("button");
    ban.innerHTML = user.status === "Active" ? "Ban" : "Activate";
    ban.addEventListener("click", function () {
      user.status = user.status === "Active" ? "Inactive" : "Active";
      logAction({name: "Demo Admin", role: "Admin"}, user.email + " marked " + user.status);
      renderUsers();
    });
    actions.appendChild(edit);
    actions.appendChild(ban);
  }
}

function editUser(index) {
  editIndex = index;
  for (const key of ["name", "email", "role", "status"]) field(key).value = users[index][key];
  field("saveButton").innerHTML = "Save changes";
}

function saveUser() {
  const name = field("name").value.trim();
  const email = field("email").value.trim();
  const existing = findUser(email);
  if (!name || (existing && existing !== users[editIndex])) {
    showMessage("Enter a name and a unique email.");
    return false;
  }
  const values = {name, email, role: field("role").value, status: field("status").value};
  if (editIndex === -1) users.push(values);
  else {
    for (const key of ["name", "email", "role", "status"]) users[editIndex][key] = values[key];
  }
  logAction({name: "Demo Admin", role: "Admin"}, (editIndex === -1 ? "Created " : "Updated ") + email);
  editIndex = -1;
  field("userForm").reset();
  field("saveButton").innerHTML = "Create User";
  showMessage("User saved.");
  renderUsers();
  return false;
}

renderUsers();
