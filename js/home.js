function filterServices() {
  const keyword = document.getElementById("search").value.trim().toLowerCase();
  const rows = document.getElementById("catalogue").getElementsByTagName("tr");
  let shown = 0;
  for (const row of rows) {
    const service = row.getElementsByTagName("td")[0].innerHTML.toLowerCase();
    const matches = service.indexOf(keyword) !== -1;
    row.hidden = !matches;
    if (matches) shown++;
  }
  document.getElementById("empty").hidden = shown !== 0;
}
