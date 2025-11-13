function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById("PON_AQUI_EL_ID_DE_TU_HOJA");
  const sheet = ss.getSheetByName("CitasTatuajes");

  // GUARDAR USUARIO
  if (data.tipo === "usuario") {
    sheet.appendRow([
      new Date(),
      "usuario",
      data.email,
      data.password
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    );
  }


  // GUARDAR CITA
  if (data.tipo === "cita") {
    sheet.appendRow([
      new Date(),
      "cita",
      data.nombre,
      data.telefono,
      data.fecha,
      data.hora,
      data.descripcion,
      data.metodo_pago,
      data.transaction_id,
      data.status
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    );
  }


  // PROCESAR PAGO (TU PARTE PRIVADA)
  if (data.tipo === "pago") {

    // 🔥 AQUI VA TU ENCRIPTACION, TU LOGICA PRIVADA 🔥
    // Ejemplo:
    const encryptedCard = data.card_number; // <-- Tú lo transformas
    const encryptedExpiry = data.expiry;
    const encryptedCVV = data.cvv;

    const pagos = ss.getSheetByName("pagos");
    const transaction_id = "TS-" + Date.now();

    // Se guarda SOLO AQUÍ, nunca en el front-end
    pagos.appendRow([
      new Date(),
      transaction_id,
      encryptedCard,
      encryptedExpiry,
      encryptedCVV,
      data.zip_code,
      "processed"
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        transaction_id
      })
    );
  }
}
