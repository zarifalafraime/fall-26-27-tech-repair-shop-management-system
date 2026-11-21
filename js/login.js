function validateLogin() {
  const user = findUser(field("email").value.trim());
  if (!user || user.password !== field("password").value || user.status !== "Active") {
    showMessage("Check your email, password and account status.");
    return false;
  }
  const pages = {Admin: "user-management.html", Manager: "repair-assignment.html",
    Technician: "assigned-repairs.html", Customer: "repair-history.html"};
  logAction(user, "Signed in");
  location.assign(pages[user.role]);
  return false;
}
