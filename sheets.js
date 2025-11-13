function sendToSheets(data) {
  fetch("https://script.google.com/macros/s/AKfycbz4PLq-gNQTGo2bsJiNKpvG1DuVC69YttbwqjH3yLkKEdo6nbCVpDk65AGvbA9Nqw/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(r => console.log("Guardado:", r))
  .catch(err => console.error("Error:", err));
}
