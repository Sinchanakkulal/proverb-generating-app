const API = import.meta.env.VITE_API_BASE;

export async function getProverbs() {
  const res = await fetch(`${API}/api/proverbs`);
  return res.json();
}

export async function getRandom() {
  const res = await fetch(`${API}/api/proverbs/random`);
  return res.json();
}

export async function addProverb(data) {
  const res = await fetch(`${API}/api/proverbs`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProverb(id) {
  await fetch(`${API}/api/proverbs/${id}`, {method: "DELETE"});
}


// const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// export async function getProverbs() {
//   const res = await fetch(`${API_BASE}/api/proverbs`);
//   return res.json();
// }

// export async function getRandom() {
//   const res = await fetch(`${API_BASE}/api/proverbs/random`);
//   return res.json();
// }
