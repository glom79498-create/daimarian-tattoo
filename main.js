// Crear cuenta (se guarda en Google Sheets)
function crearCuenta() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Completa correo y contraseña.");
    return;
  }

  sendToSheets({
    tipo: "usuario",
    email,
    password
  });

  alert("Cuenta creada.");
}


// Procesar cita + pago
async function procesarFormulario() {
  const data = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    descripcion: document.getElementById("descripcion").value,
    metodo_pago: document.getElementById("metodo_pago").value,
  };

  if (!data.nombre || !data.telefono || !data.fecha || !data.hora) {
    alert("Faltan datos obligatorios.");
    return;
  }

  // DATOS DE TARJETA (estos SI se guardan en Sheets)
  const card_number = document.getElementById("card_number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  const zip_code = document.getElementById("zip_code").value;

  // Enviar datos sensibles a tu backend privado
  const pagoResponse = await processPagoPrivado(card_number, expiry, cvv, zip_code);

  if (!pagoResponse.success) {
    alert("Error procesando el pago.");
    return;
  }

  // Guardar cita con datos de tarjeta
  sendToSheets({
    tipo: "cita",
    nombre: data.nombre,
    telefono: data.telefono,
    fecha: data.fecha,
    hora: data.hora,
    card_number: data.card_number,
    expiry: data.expiry,
    cvv: data.cvv,
    zip_code: data.zip_code
    descripcion: data.descripcion,
    metodo_pago: data.metodo_pago,
    transaction_id: pagoResponse.transaction_id,
    status: "confirmed"
  });

  alert("Cita confirmada.");
}


// LLAMADA AL BACKEND PRIVADO
async function processPagoPrivado(card_number, expiry, cvv, zip_code) {
  const url = "https://script.google.com/macros/s/AKfycbz4PLq-gNQTGo2bsJiNKpvG1DuVC69YttbwqjH3yLkKEdo6nbCVpDk65AGvbA9Nqw/exec";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      tipo: "pago",
      card_number,
      expiry,
      cvv,
      zip_code
    })
  });

  return await response.json();
}
