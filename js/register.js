function validateRegister() {
  const name = field("name").value.trim();
  const email = field("email").value.trim();
  const password = field("password").value;
  if (!name || !email || !field("email").validity.valid) {
    showMessage("Enter your name and a valid email.");
  } else if (findUser(email)) {
    showMessage("That email is already registered.");
  } else if (password.length < 8 || password !== field("confirm-password").value) {
    showMessage("Use at least eight characters and enter the same password twice.");
  } else {
    const user = {name, email, password, role: "Customer", status: "Active"};
    users.push(user);
    logAction(user, "Registered a demo account");
    field("registerForm").reset();
    showMessage("Registration successful for this page demo. Use a sample account on the sign-in page.");
  }
  return false;
}
