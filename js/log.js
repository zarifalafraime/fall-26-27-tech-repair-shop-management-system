function renderLog() {
  const keyword = field("logSearch").value.trim().toLowerCase();
  const body = field("logRows");
  body.innerHTML = "";
  for (let i = activityLog.length - 1; i >= 0; i--) {
    const entry = activityLog[i];
    if ((entry.user + " " + entry.details).toLowerCase().indexOf(keyword) !== -1) {
      addRow(body, [entry.time, entry.user, entry.role, entry.details]);
    }
  }
  if (!body.rows.length) addRow(body, ["No matching activity."]);
}
renderLog();
