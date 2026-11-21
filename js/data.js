// Classroom sample data resets when a page opens, as in the library project.
let users = [
  {name: "Demo Admin", email: "admin@example.test", password: "admin1234", role: "Admin", status: "Active"},
  {name: "Demo Technician", email: "tech@example.test", password: "repair1234", role: "Technician", status: "Active"},
  {name: "Demo Manager", email: "manager@example.test", password: "manager1234", role: "Manager", status: "Active"},
  {name: "Demo Customer", email: "customer@example.test", password: "customer1234", role: "Customer", status: "Active"}
];

let repairs = [{id: 1001, status: "Pending"}];
let stock = [{item: "Laptop adapter", quantity: 2, minimum: 3}];
let returns = [];
let activityLog = [
  {time: "2026-11-01 10:00", user: "Demo Technician", role: "Technician", details: "Received repair #1001"}
];
