function renderLog() {
  const recent = JSON.parse(sessionStorage.getItem("repairShopLog") || "[]");
  const keyword = field("logSearch").value.trim().toLowerCase();
  const body = field("logRows");
  body.replaceChildren();
  for (const entry of recent.concat(activityLog)) {
    if ((entry.user + " " + entry.details).toLowerCase().includes(keyword)) {
      addCells(body.insertRow(), [entry.time, entry.user, entry.role, entry.details]);
    }
  }
  if (!body.rows.length) body.insertRow().insertCell().textContent = "No matching activity.";
}
renderLog();
