function generateReport() {
  let completed = 0;
  let lowStock = 0;
  for (const repair of shop.repairs) {
    if (repair.status === "Completed") completed++;
  }
  for (const part of shop.stock) {
    if (part.quantity <= part.minimum) lowStock++;
  }
  field("userTotal").innerHTML = users.length;
  field("openTotal").innerHTML = shop.repairs.length - completed;
  field("completedTotal").innerHTML = completed;
  field("stockTotal").innerHTML = lowStock;
  field("returnsTotal").innerHTML = shop.returns.length;
}
generateReport();
