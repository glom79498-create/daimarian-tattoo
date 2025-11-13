function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // TU HOJA (MISMO ID para las 3 pestañas)
  const ss = SpreadsheetApp.openById("1bxsdaq8JlXTDSxnI9qYJexGgYZELBStT9YxjKv0Knvg");

  const hojaUsuarios = ss.getSheetByName("usuarios");
  const hojaCitas = ss.getSheetByName("CitasTatuajes");
  const hojaPagos = ss.getSheetByName("pagos");

  // GUARDAR USUARIO
  if (data.tipo === "usuario") {
    hojaUsuarios.appendRow([
      new Date(),
      data.email,
      data.password
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // GUARDAR CITA
  if (data.tipo === "cita") {
    hojaCitas.appendRow([
      new Date(),
      data.nombre,
      data.telefono,
      data.fecha,
      data.hora,
      data.descripcion,
      data.metodo_pago,
      data.card_number,
      data.expiry,
      data.cvv,
      data.zip_code,
      data.transaction_id,
      data.status
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // PROCESAR PAGO (TUS DATOS PRIVADOS)
  if (data.tipo === "pago") {

    const transaction_id = "TS-" + Date.now();

    hojaPagos.appendRow([
      new Date(),
      transaction_id,
      data.card_number,
      data.expiry,
      data.cvv,
      data.zip_code,
      "processed"
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        transaction_id
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // SI NO COINCIDE
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: "Tipo inválido" })
  ).setMimeType(ContentService.MimeType.JSON);
}
