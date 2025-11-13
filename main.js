// =============================================
// main.js — Versión Final con Sheets integrado
// =============================================

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz4PLq-gNQTGo2bsJiNKpvG1DuVC69YttbwqjH3yLkKEdo6nbCVpDk65AGvbA9Nqw/exec";


// =============================================
// FUNCIÓN ÚNICA PARA ENVIAR AL WEBAPP
// =============================================
async function enviarAlWebApp(data) {
  try {
    const res = await fetch(WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();

  } catch (err) {
    console.error("Error enviando al WebApp:", err);
    return { success: false, error: err };
  }
}



// =============================================
// 1. CREAR CUENTA
// =============================================
async function crearCuenta() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor ingresa correo y contraseña");
    return;
  }

  const data = {
    tipo: "usuario",
    email,
    password
  };

  const json = await enviarAlWebApp(data);

  if (json.success) {
    alert("Cuenta creada con éxito");
  } else {
    alert("Error al crear cuenta");
  }
}



// =============================================
// 2. PROCESAR FORMULARIO COMPLETO
// =============================================
async function procesarFormulario() {

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const descripcion = document.getElementById("descripcion").value;

  const card_number = document.getElementById("card_number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  const zip_code = document.getElementById("zip_code").value;



  // ===================================================
  // 1. PROCESAR PAGO
  // ===================================================
  const pagoData = {
    tipo: "pago",
    card_number,
    expiry,
    cvv,
    zip_code
  };

  const dPago = await enviarAlWebApp(pagoData);

  if (!dPago.success) {
    alert("Error procesando pago");
    return;
  }

  const transaction_id = dPago.transaction_id;



  // ===================================================
  // 2. GUARDAR CITA
  // ===================================================
  const citaData = {
    tipo: "cita",
    nombre,
    telefono,
    fecha,
    hora,
    descripcion,
    metodo_pago: document.getElementById("metodo_pago").value,

    card_number,
    expiry,
    cvv,
    zip_code,

    transaction_id,
    status: "Pagado"
  };

  const dCita = await enviarAlWebApp(citaData);


  if (dCita.success) {
    alert("Cita guardada con éxito y pago procesado");
  } else {
    alert("Error guardando cita");
  }
}
