// Browser-only classroom demo. Serve all pages from the same localhost origin.
function accounts() {
  return JSON.parse(localStorage.getItem("techcare.users") || "[]");
}

function saveAccounts(users) {
  localStorage.setItem("techcare.users", JSON.stringify(users));
}

function historyEntries() {
  return JSON.parse(localStorage.getItem("techcare.activity") || "[]");
}

function logActivity(user, details) {
  const entries = historyEntries();
  entries.unshift({date: new Date().toISOString(), name: user.name, role: user.role, details});
  localStorage.setItem("techcare.activity", JSON.stringify(entries));
}

async function passwordHash(password, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2", salt: encoder.encode(salt), iterations: 600000, hash: "SHA-256"
  }, key, 256);
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
}
