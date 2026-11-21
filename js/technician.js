const assigned = [];
for (const job of shop.repairs) {
  if (job.technician === "Demo Technician") assigned.push(job);
}

function renderJobs() {
  const body = element("jobs");
  for (const job of assigned) {
    const cell = addCell(addRow(body, [job.id, job.customer, job.device, job.issue, job.status]), "");
    cell.innerHTML = "<a href='repair-records.html'>View record</a>";
  }
  emptyTable(body, 6, "No repairs assigned.");
}

function selectedJob() {
  for (const job of assigned) {
    if (job.id === Number(value("job"))) return job;
  }
  return null;
}

function fillRecord() {
  const job = selectedJob();
  element("diagnosis").value = job && job.diagnosis ? job.diagnosis : "";
  element("parts").value = job && job.parts ? job.parts : "";
  element("notes").value = job && job.notes ? job.notes : "";
}

function renderRecords() {
  const body = element("records");
  body.innerHTML = "";
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
  shop.updates.push("Repair notes updated for #" + job.id + ".");
  renderRecords();
  message("Repair record saved.");
  return false;
}

function renderCharges() {
  const body = element("charges");
  body.innerHTML = "";
  for (const charge of shop.charges) {
    for (const job of assigned) {
      if (job.id === charge.job) addRow(body, [charge.job, charge.work, charge.cost, charge.status]);
    }
  }
  emptyTable(body, 4, "No additional charges requested.");
}

function requestCharge(form) {
  const job = selectedJob();
  if (!job || !value("work")) {
    message("Select a job and describe the additional work.");
    return false;
  }
  shop.charges.push({job: job.id, work: value("work"), cost: Number(value("cost")), status: "Pending"});
  shop.updates.push("Additional work needs your approval for repair #" + job.id + ".");
  form.reset();
  renderCharges();
  message("Approval requested.");
  return false;
}

if (element("jobs")) renderJobs();
if (element("job")) {
  for (const job of assigned) addOption(element("job"), "#" + job.id + " - " + job.device, job.id);
}
if (element("records")) {
  element("job").addEventListener("change", fillRecord);
  fillRecord();
  renderRecords();
}
if (element("charges")) renderCharges();
