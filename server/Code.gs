/* ============================================
   Mercadato - Google Apps Script
   Código del lado del servidor
   ============================================ */

/* ============================================
   doPost - Procesar peticiones desde GitHub Pages
   ============================================ */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ============================================
    // INSERT_BUDGET - Guardar presupuesto
    // ============================================
    if (data.action === "INSERT_BUDGET") {
      var sheetMaestro = ss.getSheetByName("Presupuestos_Maestro") || ss.insertSheet("Presupuestos_Maestro");
      
      // Encabezados si es la primera vez
      if (sheetMaestro.getLastRow() === 0) {
        sheetMaestro.appendRow([
          "ID_Presupuesto", "Fecha", "Nombre_Cliente", "Tipo_Cliente", "Marca",
          "Clases", "Cantidad_Clases", "Tasa_Busqueda", "Tasa_Solicitud", "Honorarios",
          "Subtotal_Bruto", "Descuento", "Subtotal_Neto", "IVA", "Total", "Estado"
        ]);
      }
      
      // Generar ID único
      var budgetId = 'M' + new Date().getTime().toString(36).toUpperCase();
      
      sheetMaestro.appendRow([
        budgetId,
        new Date(),
        data.nombreCliente || '',
        data.tipoCliente || '',
        data.marca || '',
        data.clasesSeleccionadas || '',
        data.cantidadClases || 0,
        data.tasaBusqueda || 0,
        data.tasaSolicitud || 0,
        data.honorarios || 0,
        data.subtotalBruto || 0,
        data.montoDescuento || 0,
        data.subtotalNeto || 0,
        data.montoIva || 0,
        data.total || 0,
        "Pendiente"
      ]);
      
      // Registrar en LOG
      var sheetLog = ss.getSheetByName("Log_Actividad") || ss.insertSheet("Log_Actividad");
      if (sheetLog.getLastRow() === 0) {
        sheetLog.appendRow(["Timestamp", "Evento", "Detalles"]);
      }
      sheetLog.appendRow([
        new Date(),
        "NUEVO_PRESUPUESTO",
        data.marca + " - " + data.nombreCliente
      ]);
      
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", budgetID: budgetId })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ============================================
    // GET_PRECIOS_MARCAS - Obtener configuración
    // ============================================
    if (data.action === "GET_PRECIOS_MARCAS" || !data.action) {
      var sheet = ss.getSheetByName("Precios_Marcas") || ss.insertSheet("Precios_Marcas");
      
      // Crear estructura si no existe
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Concepto", "clave", "Valor", "Porcentaje"]);
        sheet.appendRow(["Búsqueda Fonética", "fonetica", 60, ""]);
        sheet.appendRow(["Búsqueda Gráfica", "grafica", 60, ""]);
        sheet.appendRow(["Búsqueda Mixta", "mixta", 120, ""]);
        sheet.appendRow(["Honorarios Profesionales", "honorarios", 700, ""]);
        sheet.appendRow(["Tasa de Solicitud", "tasaSolicitud", 120, ""]);
        sheet.appendRow(["Descuento", "descuento", "", 0]);
        sheet.appendRow(["IVA", "iva", "", 16]);
      }
      
      var result = {};
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][1]) {
          if (rows[i][3] !== "") {
            result[rows[i][1]] = rows[i][3]; // Porcentaje
          } else {
            result[rows[i][1]] = rows[i][2]; // Valor
          }
        }
      }
      
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ============================================
    // UPDATE_PRECIO_CELDA - Actualizar precio
    // ============================================
    if (data.action === "UPDATE_PRECIO_CELDA") {
      var sheet = ss.getSheetByName("Precios_Marcas") || ss.insertSheet("Precios_Marcas");
      
      var lastRow = sheet.getLastRow();
      if (data.fila > lastRow) {
        for (var i = lastRow + 1; i <= data.fila; i++) {
          sheet.appendRow(["", "", "", ""]);
        }
      }
      
      var colIndex = data.columna.charCodeAt(0) - 64;
      sheet.getRange(data.fila, colIndex).setValue(data.valor);
      
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "Acción no reconocida" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/* ============================================
   doGet - Página principal
   ============================================ */
function doGet(e) {
  var action = e.parameter.action;
  
  // ============================================
  // GET_PRECIOS_MARCAS
  // ============================================
  if (action === "GET_PRECIOS_MARCAS" || !action) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName("Precios_Marcas") || ss.insertSheet("Precios_Marcas");
      
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Concepto", "clave", "Valor", "Porcentaje"]);
        sheet.appendRow(["Búsqueda Fonética", "fonetica", 60, ""]);
        sheet.appendRow(["Búsqueda Gráfica", "grafica", 60, ""]);
        sheet.appendRow(["Búsqueda Mixta", "mixta", 120, ""]);
        sheet.appendRow(["Honorarios Profesionales", "honorarios", 700, ""]);
        sheet.appendRow(["Tasa de Solicitud", "tasaSolicitud", 120, ""]);
        sheet.appendRow(["Descuento", "descuento", "", 0]);
        sheet.appendRow(["IVA", "iva", "", 16]);
      }
      
      var result = {};
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][1]) {
          if (rows[i][3] !== "") {
            result[rows[i][1]] = rows[i][3];
          } else {
            result[rows[i][1]] = rows[i][2];
          }
        }
      }
      
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
      
    } catch(error) {
      return ContentService.createTextOutput(
        JSON.stringify({ error: error.toString() })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Página HTML de estado
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_top">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Inter', sans-serif; 
            background: #0a192f; 
            color: #fff; 
            padding: 40px; 
          }
          .card { 
            background: rgba(255,255,255,0.05); 
            border: 1px solid rgba(0,255,255,0.3); 
            border-radius: 12px; 
            padding: 24px; 
            margin: 20px 0; 
          }
          h1 { color: #00FFFF; text-shadow: 0 0 10px rgba(0,255,255,0.5); margin: 0; }
          .success { color: #4ade80; }
          .status-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #4ade80;
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <h1>🔗 Mercadato - API</h1>
        <div class="card">
          <p><span class="status-dot"></span><span class="success">Sistema activo</span></p>
          <p>ID: ${new Date().toISOString()}</p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 15px;">
            Endpoints disponibles:<br>
            • ?action=GET_PRECIOS_MARCAS<br>
            • POST {action: "INSERT_BUDGET", ...}
          </p>
        </div>
      </body>
    </html>
  `).setTitle("Mercadato - Status");
}

/* ============================================
   GUARDAR EN GOOGLE DRIVE (Opcional)
   ============================================ */
function uploadPdfToDrive(pdfData, filename) {
  try {
    var folder = DriveApp.getRootFolder();
    var file = folder.createFile(pdfData);
    file.setName(filename);
    console.log('📁 PDF guardado en Drive:', filename);
    return { success: true, url: file.getUrl() };
  } catch(error) {
    console.error('❌ Error guardando PDF:', error);
    return { success: false, error: error.message };
  }
}

/* ============================================
   ENVIAR EMAIL DE NOTIFICACIÓN (Opcional)
   ============================================ */
function sendNotificationEmail(data) {
  try {
    MailApp.sendEmail({
      to: "tu-email@ejemplo.com",
      subject: "Nuevo Presupuesto: " + data.marca,
      htmlBody: `
        <h2>Nuevo Presupuesto Registrado</h2>
        <p><strong>Marca:</strong> ${data.marca}</p>
        <p><strong>Cliente:</strong> ${data.nombreCliente}</p>
        <p><strong>Total:</strong> $${data.total}</p>
        <p><strong>Clases:</strong> ${data.clasesSeleccionadas}</p>
      `
    });
    return { success: true };
  } catch(error) {
    return { success: false, error: error.message };
  }
}