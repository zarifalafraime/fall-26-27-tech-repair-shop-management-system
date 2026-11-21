const assigned = shop.repairs.filter(job => job.technician === "Demo Technician");

function renderJobs() {
  const body = element("jobs");
  for (const job of assigned) {
    const cell = addRow(body, [job.id, job.customer, job.device, job.issue, job.status]).insertCell();
    const link = document.createElement("a");
    link.href = "repair-records.html#job-" + job.id;
    link.textContent = "View record";
    cell.appendChild(link);
  }
  emptyTable(body, 6, "No repairs assigned.");
}

function selectedJob() {
  return assigned.find(job => job.id === Number(value("job")));
}

function fillRecord() {
  const job = selectedJob();
  for (const key of ["diagnosis", "parts", "notes"]) element(key).value = job?.[key] || "";
}

function renderRecords() {
  const body = element("records");
  body.replaceChildren();
  for (const job of assigned) {
    if (job.diagnosis) addRow(body, [job.id, job.diagnosis, job.parts || "None", job.notes]);
  }
  emptyTable(body, 4, "No repair details recorded.");
}

function saveRecord() {
  const job = selectedJob();
  if (!job || !value("diagnosis") || !value("notes")) {
    message("Select an assigned job and enter the diagnosis and notes.");
    return false;
  }
  job.diagnosis = value("diagnosis");
  job.parts = value("parts");
  job.notes = value("notes");
  job.status = "In progress";
  shop.updates.unshift("Repair notes updated for #" + job.id + ".");
  saveShop();
  renderRecords();
  message("Repair record saved.");
  return false;
}

function renderCharges() {
  const body = element("charges");
  body.replaceChildren();
  for (const charge of shop.charges) {
    if (assigned.some(job => job.id === charge.job)) addRow(body, [charge.job, charge.work, charge.cost, charge.status]);
  }
  emptyTable(body, 4, "No additional charges requested.");
}

function requestCharge(form) {
  const job = selectedJob();
  if (!job || !value("work")) {
    message("Select a job and describe the additional work.");
    return false;
  }
  shop.charges.unshift({job: job.id, work: value("work"), cost: Number(value("cost")), status: "Pending"});
  shop.updates.unshift("Additional work needs your approval for repair #" + job.id + ".");
  saveShop();
  form.reset();
  renderCharges();
  message("Approval requested.");
  return false;
}

if (element("jobs")) renderJobs();
if (element("job")) {
  for (const job of assigned) element("job").add(new Option("#" + job.id + " - " + job.device, job.id));
}
if (element("records")) {
  const linked = assigned.find(job => location.hash === "#job-" + job.id);
  if (linked) element("job").value = linked.id;
  element("job").onchange = fillRecord;
  fillRecord();
  renderRecords();
}
if (element("charges")) renderCharges();
