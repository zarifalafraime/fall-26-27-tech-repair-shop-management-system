function validateLogin() {
  const user = findUser(field("email").value.trim());
  if (!user || user.password !== field("password").value || user.status !== "Active") {
    showMessage("Check your email, password and account status.");
    return false;
  }
  const form = field("loginForm");
  switch (user.role) {
    case "Admin": form.action = "user-management.html"; break;
    case "Manager": form.action = "repair-assignment.html"; break;
    case "Technician": form.action = "assigned-repairs.html"; break;
    case "Customer": form.action = "repair-history.html"; break;
    default: return false;
  }
  logAction(user, "Signed in");
  return true;
}
