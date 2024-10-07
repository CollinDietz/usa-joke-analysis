async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const response = await json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");

process.stdout.write(JSON.stringify(response));
