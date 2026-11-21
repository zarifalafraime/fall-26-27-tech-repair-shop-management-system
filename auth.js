const form = document.querySelector("form");
const signup = Boolean(document.getElementById("confirm-password"));
const message = document.createElement("p");
message.setAttribute("role", "status");
form.after(message);
form.method = "post";
for (const input of form.querySelectorAll("input:not([type=submit])")) input.required = true;
if (signup && accounts().length === 0) message.textContent = "Create the first administrator account for this browser demo.";

form.onsubmit = async function (event) {
  event.preventDefault();
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  try {
    const email = form.elements.email.value.trim().toLowerCase();
    const password = form.elements.password.value;
    const users = accounts();
    const user = users.find(item => item.email === email);
    if (signup) {
      const name = form.elements.namedItem("name").value.trim();
      if (!name) throw Error("Enter your name.");
      if (user) throw Error("This email already has an account.");
      if (password.length < 8) throw Error("Use at least eight characters for your password.");
      if (password !== document.getElementById("confirm-password").value) throw Error("Passwords must match.");
      const salt = crypto.randomUUID();
      const account = {id: crypto.randomUUID(), name, email, role: users.length ? "Customer" : "Admin",
        status: "Active", salt, hash: await passwordHash(password, salt)};
      users.push(account);
      saveAccounts(users);
      logActivity(account, "Created account");
      location.assign("signin.html");
    } else {
      if (!user || user.status !== "Active" || await passwordHash(password, user.salt) !== user.hash)
        throw Error("Check your credentials or contact the administrator.");
      sessionStorage.setItem("techcare.session", user.id);
      logActivity(user, "Signed in");
      const pages = {Admin: "user-management.html", Technician: "assigned-repairs.html",
        Manager: "repair-assignment.html", Customer: "repair-history.html"};
      location.assign(pages[user.role]);
    }
  } catch (error) {
    message.textContent = error.message;
  } finally {
    submit.disabled = false;
  }
};
