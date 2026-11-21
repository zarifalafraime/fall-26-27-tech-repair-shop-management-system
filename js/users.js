let editIndex = -1;

function renderUsers() {
  const body = field("userRows");
  body.innerHTML = "";
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const row = addRow(body, [user.name, user.email, user.role, user.status]);
    const actions = addCell(row, "");
    const label = user.status === "Active" ? "Ban" : "Activate";
    actions.innerHTML = "<button type='button' onclick='editUser(" + index + ")'>Edit</button> " +
      "<button type='button' onclick='toggleStatus(" + index + ")'>" + label + "</button>";
  }
}

function toggleStatus(index) {
  const user = users[index];
  user.status = user.status === "Active" ? "Inactive" : "Active";
  logAction({name: "Demo Admin", role: "Admin"}, user.email + " marked " + user.status);
  renderUsers();
}

function editUser(index) {
  editIndex = index;
  field("name").value = users[index].name;
  field("email").value = users[index].email;
  field("role").value = users[index].role;
  field("status").value = users[index].status;
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
    users[editIndex].name = values.name;
    users[editIndex].email = values.email;
    users[editIndex].role = values.role;
    users[editIndex].status = values.status;
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
