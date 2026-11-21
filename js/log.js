function renderLog() {
  const keyword = field("logSearch").value.trim().toLowerCase();
  const body = field("logRows");
  body.innerHTML = "";
  let shown = 0;
  for (let i = activityLog.length - 1; i >= 0; i--) {
    const entry = activityLog[i];
    if ((entry.user + " " + entry.details).toLowerCase().indexOf(keyword) !== -1) {
      shown++;
      addRow(body, [entry.time, entry.user, entry.role, entry.details]);
    }
  }
  if (shown === 0) addRow(body, ["No matching activity."]);
}
renderLog();
