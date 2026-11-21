let editIndex = -1;

function renderUsers() {
  const body = field("userRows");
  body.replaceChildren();
  users.forEach(function (user, index) {
    const row = body.insertRow();
    addCells(row, [user.name, user.email, user.role, user.status]);
    const actions = row.insertCell();
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.onclick = function () { editUser(index); };
    const ban = document.createElement("button");
    ban.textContent = user.status === "Active" ? "Ban" : "Activate";
    ban.onclick = function () {
      user.status = user.status === "Active" ? "Inactive" : "Active";
      logAction({name: "Demo Admin", role: "Admin"}, user.email + " marked " + user.status);
      renderUsers();
    };
    actions.append(edit, ban);
  });
}

function editUser(index) {
  editIndex = index;
  for (const key of ["name", "email", "role", "status"]) field(key).value = users[index][key];
  field("saveButton").textContent = "Save changes";
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
  else Object.assign(users[editIndex], values);
  logAction({name: "Demo Admin", role: "Admin"}, (editIndex === -1 ? "Created " : "Updated ") + email);
  editIndex = -1;
  field("userForm").reset();
  field("saveButton").textContent = "Create User";
  showMessage("User saved.");
  renderUsers();
  return false;
}

renderUsers();
