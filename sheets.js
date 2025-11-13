function sendToSheets(data) {
  fetch("TU_URL_DE_APPS_SCRIPT", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(r => console.log("Guardado:", r))
  .catch(err => console.error("Error:", err));
}
