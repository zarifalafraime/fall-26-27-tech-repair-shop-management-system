function currentAdmin() {
  return accounts().find(user => user.id === sessionStorage.getItem("techcare.session") &&
    user.role === "Admin" && user.status === "Active");
}

function showUsers(admin) {
  const form = document.querySelector("form");
  const table = document.querySelector("table");
  const submit = form.querySelector("[type=submit]");
  const password = document.createElement("input");
  password.type = "password";
  password.minLength = 8;
  password.required = true;
  const label = document.createElement("label");
  label.textContent = "Initial password (8 or more characters) ";
  label.append(password);
  submit.before(label, document.createElement("br"));
  let editing = null;

  function draw() {
    while (table.rows.length > 1) table.deleteRow(1);
    for (const user of accounts()) {
      const row = table.insertRow();
      for (const value of [user.name, user.email, user.role, user.status]) row.insertCell().textContent = value;
      const actions = row.insertCell();
      const edit = document.createElement("button");
      edit.textContent = "Edit";
      edit.onclick = function () {
        editing = user.id;
        for (const field of ["name", "email", "role", "status"]) form.elements.namedItem(field).value = user[field];
        label.hidden = true;
        password.disabled = true;
        submit.textContent = "Save changes";
      };
      const ban = document.createElement("button");
      ban.textContent = user.status === "Active" ? "Ban" : "Activate";
      ban.disabled = user.id === admin.id;
      ban.onclick = function () {
        if (!currentAdmin()) return location.replace("signin.html");
        const users = accounts();
        const target = users.find(item => item.id === user.id);
        target.status = target.status === "Active" ? "Inactive" : "Active";
        saveAccounts(users);
        logActivity(admin, target.email + " marked " + target.status);
        form.reset();
        draw();
      };
      actions.append(edit, ban);
    }
  }
  form.onreset = function () {
    editing = null;
    label.hidden = false;
    password.disabled = false;
    submit.textContent = "Create User";
  };
  form.onsubmit = async function (event) {
    event.preventDefault();
    if (!currentAdmin()) return location.replace("signin.html");
    const users = accounts();
    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.email.value.trim().toLowerCase();
    const role = form.elements.role.value;
    const status = form.elements.status.value;
    if (!name) return alert("Enter a name.");
    if (users.some(user => user.email === email && user.id !== editing)) return alert("Email already in use.");
    if (editing === admin.id && (role !== "Admin" || status !== "Active")) return alert("Keep your own admin account active.");
    submit.disabled = true;
    try {
      if (editing) {
        Object.assign(users.find(user => user.id === editing), {name, email, role, status});
      } else {
        const salt = crypto.randomUUID();
        users.push({id: crypto.randomUUID(), name, email, role, status, salt, hash: await passwordHash(password.value, salt)});
      }
      saveAccounts(users);
      logActivity(admin, (editing ? "Updated " : "Created ") + email);
      form.reset();
      draw();
    } finally {
      submit.disabled = false;
    }
  };
  draw();
}

function showAdminPage() {
  const admin = currentAdmin();
  if (!admin) return location.replace("signin.html");
  const signout = document.createElement("button");
  signout.textContent = "Sign out";
  signout.onclick = function () {
    logActivity(admin, "Signed out");
    sessionStorage.removeItem("techcare.session");
    location.replace("signin.html");
  };
  document.querySelector("nav").append(" ", signout);
  if (document.querySelector("form")) return showUsers(admin);
  const table = document.querySelector("table");
  if (table) {
    while (table.rows.length > 1) table.deleteRow(1);
    for (const entry of historyEntries()) {
      const row = table.insertRow();
      for (const value of [new Date(entry.date).toLocaleString(), entry.name, entry.role, entry.details])
        row.insertCell().textContent = value;
    }
  } else {
    const users = accounts();
    const list = document.querySelector("ul");
    list.replaceChildren();
    for (const [label, count] of [
      ["Total users", users.length], ["Active users", users.filter(user => user.status === "Active").length],
      ["Inactive users", users.filter(user => user.status === "Inactive").length], ["Recorded activities", historyEntries().length]
    ]) {
      const item = document.createElement("li");
      item.textContent = label + ": " + count;
      list.append(item);
    }
    const note = document.createElement("p");
    note.textContent = "Repair and inventory totals are unavailable until those modules save records.";
    list.after(note);
  }
}
showAdminPage();
