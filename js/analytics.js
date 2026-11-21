function generateReport() {
  const completed = repairs.filter(repair => repair.status === "Completed").length;
  const lowStock = stock.filter(part => part.quantity <= part.minimum).length;
  field("userTotal").textContent = users.length;
  field("openTotal").textContent = repairs.length - completed;
  field("completedTotal").textContent = completed;
  field("stockTotal").textContent = lowStock;
  field("returnsTotal").textContent = returns.length;
}
generateReport();
