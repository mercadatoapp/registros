/* ============================================
   Mercadato - JavaScript
   ============================================ */

// ============================================
// URL GOOGLE Apps Script - CONFIGURE ESTA URL
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZKHP1HR49IlF5owwZFRvQHEsozRkubBRp6It92UPh2TVLIIVYUE-41jaMLo8XdoMB/exec';

// ============================================
// CLASES NIZA (Sistema de clasificación)
// ============================================
const NIZA_CLASSES = [
  { id: 1, name: "Clase 1", desc: "Productos químicos para uso en la industria, ciencia, fotografía..." },
  { id: 2, name: "Clase 2", desc: "Pinturas, barnices, lacas; productos antioxidantes..." },
  { id: 3, name: "Clase 3", desc: "Productos cosméticos y de tocador no medicados; dentífricos..." },
  { id: 4, name: "Clase 4", desc: "Aceites y grasas industriales; lubricantes; polvo para absorber..." },
  { id: 5, name: "Clase 5", desc: "Productos farmacéuticos, médicos y veterinarios; productos higiénicos..." },
  { id: 6, name: "Clase 6", desc: "Metales comunes y sus aleaciones, minerales; construcciones..." },
  { id: 7, name: "Clase 7", desc: "Máquinas, máquinas herramientas y herramientas mecánicas..." },
  { id: 8, name: "Clase 8", desc: "Herramientas e implementos accionados manualmente; artículos de cuchillería..." },
  { id: 9, name: "Clase 9", desc: "Aparatos e instrumentos científicos, de investigación, de navegación..." },
  { id: 10, name: "Clase 10", desc: "Aparatos e instrumentos quirúrgicos, médicos, odontológicos y veterinarios..." },
  { id: 11, name: "Clase 11", desc: "Aparatos e instalaciones de alumbrado, calefacción, enfriamiento..." },
  { id: 12, name: "Clase 12", desc: "Vehículos; aparatos de locomoción terrestre, aérea o acuática..." },
  { id: 13, name: "Clase 13", desc: "Armas de fuego; municiones y proyectiles; explosivos; fuegos artificiales..." },
  { id: 14, name: "Clase 14", desc: "Metales preciosos y sus aleaciones; artículos de joyería..." },
  { id: 15, name: "Clase 15", desc: "Instrumentos musicales; atriles para partituras y soportes..." },
  { id: 16, name: "Clase 16", desc: "Papel y cartón; productos de imprenta; material de encuadernación..." },
  { id: 17, name: "Clase 17", desc: "Caucho, gutapercha, goma, amianto, mica y sucedáneos procesados..." },
  { id: 18, name: "Clase 18", desc: "Cuero y cuero de imitación; pieles de animales; artículos de equipaje..." },
  { id: 19, name: "Clase 19", desc: "Materiales de construcción no metálicos; tubos rígidos no metálicos..." },
  { id: 20, name: "Clase 20", desc: "Muebles, espejos, marcos; contenedores no metálicos..." },
  { id: 21, name: "Clase 21", desc: "Utensilios y recipientes para uso doméstico y culinario..." },
  { id: 22, name: "Clase 22", desc: "Cuerdas y cordeles; redes; tiendas de campaña y lonas..." },
  { id: 23, name: "Clase 23", desc: "Hilos para uso textil." },
  { id: 24, name: "Clase 24", desc: "Tejidos y sus sucedáneos; ropa de casa; cortinas..." },
  { id: 25, name: "Clase 25", desc: "Prendas de vestir, calzado, artículos de sombrerería." },
  { id: 26, name: "Clase 26", desc: "Encajes, cordones y bordados, cintas y botones..." },
  { id: 27, name: "Clase 27", desc: "Alfombras, tapetes, esteras, linóleo..." },
  { id: 28, name: "Clase 28", desc: "Juegos y juguetes; artículos de gimnasia y deporte..." },
  { id: 29, name: "Clase 29", desc: "Carne, pescado, carne de ave y caza; extractos de carne..." },
  { id: 30, name: "Clase 30", desc: "Café, té, cacao y sucedáneos; arroz, pastas..." },
  { id: 31, name: "Clase 31", desc: "Productos agrícolas, acuícolas, hortícolas y forestales..." },
  { id: 32, name: "Clase 32", desc: "Cervezas; bebidas sin alcohol; aguas minerales..." },
  { id: 33, name: "Clase 33", desc: "Bebidas alcohólicas (excepto cervezas)..." },
  { id: 34, name: "Clase 34", desc: "Tabaco y sucedáneos; cigarrillos y puros..." },
  { id: 35, name: "Clase 35", desc: "Publicidad; gestión de negocios comerciales..." },
  { id: 36, name: "Clase 36", desc: "Servicios de seguros; operaciones financieras..." },
  { id: 37, name: "Clase 37", desc: "Servicios de construcción; instalación y reparación..." },
  { id: 38, name: "Clase 38", desc: "Servicios de telecomunicaciones." },
  { id: 39, name: "Clase 39", desc: "Servicios de transporte; organización de viajes." },
  { id: 40, name: "Clase 40", desc: "Tratamiento de materiales; reciclaje..." },
  { id: 41, name: "Clase 41", desc: "Educación; formación; servicios de entretenimiento..." },
  { id: 42, name: "Clase 42", desc: "Servicios científicos y tecnológicos..." },
  { id: 43, name: "Clase 43", desc: "Servicios de restauración; hospedaje temporal." },
  { id: 44, name: "Clase 44", desc: "Servicios médicos; tratamientos de higiene y belleza..." },
  { id: 45, name: "Clase 45", desc: "Servicios jurídicos; servicios de seguridad..." }
];

// ============================================
// CONFIGURACIÓN (Valores por defecto)
// ============================================
const DEFAULT_PRICES = {
  precioFonetica: 60,
  precioGrafica: 60,
  precioMixta: 120,
  honorarioUnitario: 700,
  tasaClase: 120,
  planilla: 0,
  descuento: 0,
  iva: 16
};

let appState = {
  configuracion: { ...DEFAULT_PRICES },
  tiposBusqueda: { fonetica: false, grafica: false, mixta: false },
  clasesSeleccionadas: [],
  clientType: 'Natural Person',
  isOnline: false
};

// ============================================
// API GOOGLE SHEETS
// ============================================
const GoogleSheetsAPI = {
  async init() {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=GET_PRECIOS_MARCAS`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        appState.configuracion = { ...DEFAULT_PRICES, ...data };
        appState.isOnline = true;
        this.updateStatusIndicator(true);
        console.log('✅ Conectado a Google Sheets');
      }
    } catch (e) {
      console.log('📴 Modo local - Sin conexión a Google Sheets');
      appState.isOnline = false;
      this.updateStatusIndicator(false);
    }
    loadConfigToUI();
  },

  updateStatusIndicator(online) {
    const indicator = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');
    if (indicator && statusText) {
      if (online) {
        indicator.classList.add('bg-green-500');
        indicator.classList.remove('bg-yellow-500');
        statusText.textContent = 'En Línea';
      } else {
        indicator.classList.add('bg-yellow-500');
        indicator.classList.remove('bg-green-500');
        statusText.textContent = 'Modo Local';
      }
    }
  },

  async saveBudget(data) {
    console.log('📤 Guardando presupuesto:', data);
    
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'INSERT_BUDGET', ...data })
      });
      
      const text = await response.text();
      console.log('📥 Respuesta:', text);
      
      try {
        const json = JSON.parse(text);
        if (json.status === 'success' || json.budgetID) {
          return { success: true, id: json.budgetID || json.id };
        }
      } catch(e) {
        return { success: true, id: 'GS-' + Date.now() };
      }
      
      return { success: true, id: 'GS-' + Date.now() };
    } catch (e) {
      console.error('❌ Error:', e);
      // Guardar en localStorage como backup
      const budgets = JSON.parse(localStorage.getItem('mercadato_budgets') || '[]');
      budgets.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('mercadato_budgets', JSON.stringify(budgets));
      return { success: true, id: 'LOCAL-' + Date.now() };
    }
  }
};

// ============================================
// UTILIDADES
// ============================================
function formatCurrency(value) {
  const num = Number(value) || 0;
  return '$ ' + num.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function generateBudgetID() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return 'M' + ts.slice(-4) + '-' + rnd;
}

function showToast(type, message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = message;
  toast.className = `fixed bottom-8 right-8 z-50 p-4 rounded-xl border bg-[#0a192f]/95 backdrop-blur-md shadow-lg transition-all ${
    type === 'success' ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
  }`;
  
  toast.style.display = 'block';
  setTimeout(() => toast.classList.add('toast-show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.style.display = 'none', 300);
  }, 4000);
}

// ============================================
// CÁLCULO FINANCIERO
// Subtotal ARRIBA del descuento
// Descuento SOLO sobre honorarios
// ============================================
function recalculate() {
  const cfg = appState.configuracion;
  const tipos = appState.tiposBusqueda;
  const clases = appState.clasesSeleccionadas;
  
  // Contadores
  const N_B = [tipos.fonetica, tipos.grafica, tipos.mixta].filter(Boolean).length;
  const N_C = clases.length;
  const totalItems = N_B + N_C;
  
  // 1. Tasas de búsqueda
  const tasaBusqueda = 
    (tipos.fonetica ? Number(cfg.precioFonetica) : 0) +
    (tipos.grafica ? Number(cfg.precioGrafica) : 0) +
    (tipos.mixta ? Number(cfg.precioMixta) : 0);
  
  // 2. Tasa de solicitud (por clase)
  const tasaSolicitud = Number(cfg.tasaClase) * N_C;
  
  // 3. Honorarios
  const honorarios = Number(cfg.honorarioUnitario) * totalItems;
  
  // 4. Planilla
  const planilla = (N_B + N_C) > 0 ? Number(cfg.planilla || 0) : 0;
  
  // 5. SUBTOTAL BRUTO (antes de descuento)
  const subtotalBruto = tasaBusqueda + tasaSolicitud + planilla + honorarios;
  
  // 6. Descuento (SOLO sobre honorarios)
  const descuentoPct = Number(document.getElementById('input-descuento')?.value) || 0;
  const montoDescuento = honorarios * (descuentoPct / 100);
  
  // 7. Subtotal Neto (después de descuento)
  const subtotalNeto = subtotalBruto - montoDescuento;
  
  // 8. IVA
  const ivaPct = Number(document.getElementById('input-iva')?.value) || 16;
  const montoIva = subtotalNeto * (ivaPct / 100);
  
  // 9. Total
  const total = subtotalNeto + montoIva;
  
  // Actualizar UI
  document.getElementById('tipos-seleccionados').textContent = N_B;
  document.getElementById('cant-clases').textContent = N_C;
  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('tasa-busqueda-val').textContent = formatCurrency(tasaBusqueda);
  document.getElementById('tasa-solicitud-val').textContent = formatCurrency(tasaSolicitud);
  document.getElementById('honorarios-val').textContent = formatCurrency(honorarios);
  document.getElementById('planilla-val').textContent = formatCurrency(planilla);
  document.getElementById('planilla-row').style.display = planilla > 0 ? 'flex' : 'none';
  document.getElementById('subtotal-bruto-val').textContent = formatCurrency(subtotalBruto);
  document.getElementById('descuento-monto-val').textContent = '-' + formatCurrency(montoDescuento);
  document.getElementById('subtotal-neto-val').textContent = formatCurrency(subtotalNeto);
  document.getElementById('iva-monto-val').textContent = formatCurrency(montoIva);
  document.getElementById('inversion-total-val').textContent = formatCurrency(total);
  document.getElementById('id-solicitud').textContent = generateBudgetID();
  
  // Actualizar botón
  const btnGenerar = document.getElementById('btn-generar');
  if (N_B === 0) {
    btnGenerar.className = 'btn-disabled w-full py-5 rounded-[12px] font-headline font-bold uppercase tracking-widest flex items-center justify-center gap-3';
    btnGenerar.innerHTML = 'SELECCIONE TIPO DE BÚSQUEDA <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>';
    btnGenerar.disabled = true;
  } else {
    btnGenerar.className = 'btn-neon-primary w-full py-5 rounded-[12px] font-headline font-bold uppercase tracking-widest flex items-center justify-center gap-3 text-[#010812]';
    btnGenerar.innerHTML = 'GENERAR PRESUPUESTO <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>';
    btnGenerar.disabled = false;
  }
  
  return { tasaBusqueda, tasaSolicitud, honorarios, subtotalBruto, montoDescuento, subtotalNeto, montoIva, total };
}

// ============================================
// GESTIÓN DE CLASES
// ============================================
function renderClasesBuscador(filter = '') {
  const container = document.getElementById('lista-clases');
  if (!container) return;
  
  const filtered = NIZA_CLASSES.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) || 
    c.desc.toLowerCase().includes(filter.toLowerCase())
  ).slice(0, 50);
  
  container.innerHTML = filtered.map(c => {
    const isSelected = appState.clasesSeleccionadas.some(sc => sc.id === c.id);
    return `
      <div class="clase-item p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors ${isSelected ? 'bg-[#00FFFF]/10' : ''}" data-id="${c.id}">
        <div>
          <span class="font-bold font-number text-[#00FFFF] text-sm mr-3">${String(c.id).padStart(2, '0')}</span>
          <span class="text-sm text-white font-medium">${c.desc.split(' ')[0]}</span>
        </div>
        <div class="check-circle ${isSelected ? 'active' : ''}"></div>
      </div>
    `;
  }).join('');
  
  container.querySelectorAll('.clase-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id);
      toggleClase(id);
    });
  });
}

function renderClasesSeleccionadas() {
  const container = document.getElementById('clases-seleccionadas');
  const emptyMsg = document.getElementById('empty-classes');
  if (!container) return;
  
  if (appState.clasesSeleccionadas.length === 0) {
    emptyMsg.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(emptyMsg);
    return;
  }
  
  emptyMsg.style.display = 'none';
  
  container.innerHTML = appState.clasesSeleccionadas.map(c => `
    <div class="niza-card active p-6 cursor-pointer relative group flex items-start gap-4" data-id="${c.id}">
      <button class="niza-card-remove absolute top-4 right-12 z-10 text-gray-500 hover:text-red-400 transition-opacity" data-remove="${c.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
      <div class="flex justify-between items-start w-full">
        <div class="flex items-center gap-4">
          <div class="niza-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
          </div>
          <div>
            <span class="niza-card-id">${String(c.id).padStart(2, '0')}</span>
          </div>
        </div>
        <div class="check-circle active"></div>
      </div>
      <div class="w-full">
        <h3 class="niza-card-title">${c.desc.split(' ')[0]} - Clase ${c.id}</h3>
        <p class="niza-card-desc">${c.desc}</p>
      </div>
    </div>
  `).join('');
  
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.remove);
      appState.clasesSeleccionadas = appState.clasesSeleccionadas.filter(c => c.id !== id);
      renderClasesSeleccionadas();
      recalculate();
    });
  });
}

function toggleClase(id) {
  const clase = NIZA_CLASSES.find(c => c.id === id);
  if (!clase) return;
  
  const idx = appState.clasesSeleccionadas.findIndex(c => c.id === id);
  if (idx >= 0) {
    appState.clasesSeleccionadas.splice(idx, 1);
  } else {
    appState.clasesSeleccionadas.push(clase);
  }
  
  renderClasesSeleccionadas();
  renderClasesBuscador(document.getElementById('input-busqueda-clase')?.value || '');
  recalculate();
}

// ============================================
// REQUISITOS
// ============================================
function updateRequisitos() {
  const container = document.getElementById('lista-requisitos');
  if (!container) return;
  
  const requisitos = appState.clientType === 'Natural Person'
    ? ['Cédula de Identidad', 'RIF']
    : ['RIF de la Empresa', 'Acta Constitutiva', 'Cédula del Representante'];
  
  container.innerHTML = requisitos.map(req => `
    <li class="flex items-center gap-4 text-xs text-gray-300 font-medium">
      <div class="check-circle active"></div>
      ${req}
    </li>
  `).join('');
}

// ============================================
// CONFIG A UI
// ============================================
function loadConfigToUI() {
  const cfg = appState.configuracion;
  document.getElementById('config-fonetica').value = cfg.precioFonetica;
  document.getElementById('config-grafica').value = cfg.precioGrafica;
  document.getElementById('config-mixta').value = cfg.precioMixta;
  document.getElementById('config-honorarios').value = cfg.honorarioUnitario;
  document.getElementById('config-tasa').value = cfg.tasaClase;
}

// ============================================
// GENERAR PDF (FONDO BLANCO para impresión)
// ============================================
function generatePDF(data) {
  const { brandName, clienteNombre, clientType, clasesSeleccionadas, pricing } = data;
  const fecha = new Date().toLocaleDateString('es-VE');
  const id = document.getElementById('id-solicitud').textContent;
  
  // HTML con FONDO BLANCO para PDF
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Presupuesto ${brandName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', Arial, sans-serif; 
      padding: 40px; 
      color: #333; 
      background: white;
      max-width: 800px;
      margin: 0 auto;
    }
    .header { 
      text-align: center; 
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #00FFFF;
    }
    .header h1 { 
      color: #0a192f; 
      font-size: 28px; 
      font-weight: 700;
    }
    .header p { color: #666; margin-top: 5px; }
    .info-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 25px;
    }
    .info-table td { 
      padding: 12px; 
      border-bottom: 1px solid #e5e7eb;
    }
    .info-table td:first-child { font-weight: 600; width: 140px; }
    h3 { 
      color: #0a192f; 
      font-size: 16px; 
      font-weight: 700;
      border-bottom: 2px solid #00FFFF;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
    .price-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 20px;
    }
    .price-table tr { border-bottom: 1px solid #e5e7eb; }
    .price-table td { padding: 12px; }
    .price-table td:last-child { text-align: right; font-weight: 600; }
    .subtotal-row { background: #f3f4f6; font-weight: 700; }
    .total-row { 
      background: #0a192f; 
      color: white; 
      font-weight: 700;
      font-size: 18px;
    }
    .total-row td { padding: 15px !important; }
    .discount { color: #dc2626; }
    .clases-box { 
      background: #f3f4f6; 
      padding: 20px; 
      border-radius: 8px;
      margin-top: 25px;
    }
    .clases-box h4 { color: #0a192f; margin-bottom: 10px; }
    .clases-list { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 8px;
    }
    .clase-tag { 
      background: #00FFFF; 
      color: #0a192f;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .footer { 
      margin-top: 40px; 
      text-align: center; 
      font-size: 11px; 
      color: #999;
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>MERCADATO</h1>
    <p>Presupuesto de Registro de Marca</p>
  </div>
  
  <table class="info-table">
    <tr>
      <td><strong>Fecha:</strong></td>
      <td>${fecha}</td>
    </tr>
    <tr>
      <td><strong>ID:</strong></td>
      <td>${id}</td>
    </tr>
    <tr>
      <td><strong>Cliente:</strong></td>
      <td>${clienteNombre || 'N/A'}</td>
    </tr>
    <tr>
      <td><strong>Tipo:</strong></td>
      <td>${clientType === 'Natural Person' ? 'Persona Natural' : 'Persona Jurídica'}</td>
    </tr>
    <tr>
      <td><strong>Marca:</strong></td>
      <td><strong>${brandName || 'N/A'}</strong></td>
    </tr>
  </table>
  
  <h3>Detalle de Cargos</h3>
  
  <table class="price-table">
    <tr>
      <td>Tasa de Búsqueda</td>
      <td>${formatCurrency(pricing.tasaBusqueda)}</td>
    </tr>
    <tr>
      <td>Tasa de Solicitud (${clasesSeleccionadas.length} clases)</td>
      <td>${formatCurrency(pricing.tasaSolicitud)}</td>
    </tr>
    <tr>
      <td>Honorarios Profesionales</td>
      <td>${formatCurrency(pricing.honorarios)}</td>
    </tr>
    <tr class="subtotal-row">
      <td><strong>Subtotal Bruto</strong></td>
      <td><strong>${formatCurrency(pricing.subtotalBruto)}</strong></td>
    </tr>
    <tr>
      <td class="discount">Descuento (sobre honorarios)</td>
      <td class="discount">-${formatCurrency(pricing.montoDescuento)}</td>
    </tr>
    <tr>
      <td>IVA</td>
      <td>${formatCurrency(pricing.montoIva)}</td>
    </tr>
    <tr class="total-row">
      <td><strong>TOTAL INVERSIÓN</strong></td>
      <td><strong>${formatCurrency(pricing.total)}</strong></td>
    </tr>
  </table>
  
  <div class="clases-box">
    <h4>Clases NIZA Seleccionadas:</h4>
    <div class="clases-list">
      ${clasesSeleccionadas.map(c => `<span class="clase-tag">Clase ${String(c.id).padStart(2, '0')}</span>`).join('')}
    </div>
  </div>
  
  <div class="footer">
    <p>*No incluye Tasa de Derecho a Marca (SENIAT). Vigencia del trámite: 2 días hábiles.</p>
    <p>Generado por Mercadato - ${fecha}</p>
  </div>
</body>
</html>`;
  
  return html;
}

// ============================================
// MOSTRAR PREVIEW EN MODAL
// ============================================
function showPreview(data) {
  const modal = document.getElementById('preview-modal');
  const content = document.getElementById('preview-content');
  const { brandName, clienteNombre, clientType, clasesSeleccionadas, pricing } = data;
  
  content.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #00FFFF; padding-bottom: 15px; margin-bottom: 20px;">
      <h1 style="color: #0a192f; font-size: 24px;">MERCADATO</h1>
      <p style="color: #666;">Presupuesto de Registro de Marca</p>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
      <div><strong>ID:</strong> ${document.getElementById('id-solicitud').textContent}</div>
      <div><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-VE')}</div>
      <div><strong>Cliente:</strong> ${clienteNombre || 'N/A'}</div>
      <div><strong>Tipo:</strong> ${clientType === 'Natural Person' ? 'Persona Natural' : 'Persona Jurídica'}</div>
      <div style="grid-column: span 2;"><strong>Marca:</strong> ${brandName}</div>
    </div>
    
    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #0a192f; margin-bottom: 10px;">Detalle de Cargos</h3>
      <div style="display: flex; justify-content: space-between; padding: 5px 0;">
        <span>Tasa de Búsqueda</span>
        <span>${formatCurrency(pricing.tasaBusqueda)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0;">
        <span>Tasa Solicitud</span>
        <span>${formatCurrency(pricing.tasaSolicitud)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0;">
        <span>Honorarios</span>
        <span>${formatCurrency(pricing.honorarios)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0; border-top: 1px solid #ddd;">
        <span><strong>Subtotal Bruto</strong></span>
        <span><strong>${formatCurrency(pricing.subtotalBruto)}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0; color: #dc2626;">
        <span>Descuento</span>
        <span>-${formatCurrency(pricing.montoDescuento)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0;">
        <span>IVA</span>
        <span>${formatCurrency(pricing.montoIva)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 2px solid #0a192f; color: #0a192f; font-weight: 700; font-size: 18px;">
        <span>TOTAL</span>
        <span>${formatCurrency(pricing.total)} USD</span>
      </div>
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong>Clases NIZA:</strong> ${clasesSeleccionadas.map(c => `Clase ${String(c.id).padStart(2, '0')}`).join(', ')}
    </div>
  `;
  
  modal.style.display = 'flex';
}

// ============================================
// DESCARGAR PDF
// ============================================
function downloadPDF(htmlContent, filename) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Mercadato inicializado');
  GoogleSheetsAPI.init();
  
  renderClasesBuscador();
  renderClasesSeleccionadas();
  updateRequisitos();
  recalculate();
  
  // === EVENTOS ===
  
  // Tipos de búsqueda
  document.querySelectorAll('.btn-tipo-busqueda').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.tipo;
      appState.tiposBusqueda[tipo] = !appState.tiposBusqueda[tipo];
      btn.classList.toggle('active', appState.tiposBusqueda[tipo]);
      recalculate();
    });
  });
  
  // Toggle buscador de clases
  document.getElementById('btn-toggle-busqueda').addEventListener('click', () => {
    const buscador = document.getElementById('buscador-clases');
    buscador.style.display = buscador.style.display === 'none' ? 'block' : 'none';
  });
  
  // Input búsqueda clase
  document.getElementById('input-busqueda-clase').addEventListener('input', (e) => {
    renderClasesBuscador(e.target.value);
  });
  
  // Identity cards
  document.getElementById('btn-natural').addEventListener('click', () => {
    appState.clientType = 'Natural Person';
    document.getElementById('btn-natural').classList.add('active');
    document.getElementById('btn-juridica').classList.remove('active');
    document.getElementById('tipo-cliente').value = 'Natural Person';
    updateRequisitos();
  });
  
  document.getElementById('btn-juridica').addEventListener('click', () => {
    appState.clientType = 'Juridical Person';
    document.getElementById('btn-juridica').classList.add('active');
    document.getElementById('btn-natural').classList.remove('active');
    document.getElementById('tipo-cliente').value = 'Juridical Person';
    updateRequisitos();
  });
  
  // Select tipo cliente
  document.getElementById('tipo-cliente').addEventListener('change', (e) => {
    appState.clientType = e.target.value;
    if (e.target.value === 'Natural Person') {
      document.getElementById('btn-natural').click();
    } else {
      document.getElementById('btn-juridica').click();
    }
  });
  
  // Inputs descuento e IVA
  document.getElementById('input-descuento').addEventListener('input', recalculate);
  document.getElementById('input-iva').addEventListener('input', recalculate);
  
  // Modal configuración
  document.getElementById('btn-config').addEventListener('click', () => {
    document.getElementById('config-modal').style.display = 'flex';
  });
  
  document.getElementById('btn-cerrar-config').addEventListener('click', () => {
    document.getElementById('config-modal').style.display = 'none';
  });
  
  document.getElementById('config-modal').addEventListener('click', (e) => {
    if (e.target.id === 'config-modal') {
      document.getElementById('config-modal').style.display = 'none';
    }
  });
  
  // Guardar configuración
  document.getElementById('btn-guardar-config').addEventListener('click', () => {
    appState.configuracion = {
      precioFonetica: Number(document.getElementById('config-fonetica').value) || 60,
      precioGrafica: Number(document.getElementById('config-grafica').value) || 60,
      precioMixta: Number(document.getElementById('config-mixta').value) || 120,
      honorarioUnitario: Number(document.getElementById('config-honorarios').value) || 700,
      tasaClase: Number(document.getElementById('config-tasa').value) || 120,
      planilla: 0,
      descuento: 0,
      iva: 16
    };
    
    localStorage.setItem('mercadato_config', JSON.stringify(appState.configuracion));
    recalculate();
    showToast('success', '✅ Configuración guardada');
    document.getElementById('config-modal').style.display = 'none';
  });
  
  // Cargar config guardada
  const savedConfig = localStorage.getItem('mercadato_config');
  if (savedConfig) {
    appState.configuracion = { ...DEFAULT_PRICES, ...JSON.parse(savedConfig) };
    loadConfigToUI();
  }
  
  // Preview modal events
  document.getElementById('btn-cerrar-preview').addEventListener('click', () => {
    document.getElementById('preview-modal').style.display = 'none';
  });
  
  document.getElementById('btn-cancelar').addEventListener('click', () => {
    document.getElementById('preview-modal').style.display = 'none';
  });
  
  // Botón generar - MUESTRA PREVIEW
  document.getElementById('btn-generar').addEventListener('click', async () => {
    const brandName = document.getElementById('nombre-marca').value;
    const clienteNombre = document.getElementById('cliente-nombre').value;
    
    if (!brandName || appState.clasesSeleccionadas.length === 0) {
      showToast('error', '⚠️ Ingrese nombre de marca y seleccione al menos una clase');
      return;
    }
    
    const pricing = recalculate();
    
    // Mostrar preview
    showPreview({
      brandName,
      clienteNombre,
      clientType: appState.clientType,
      clasesSeleccionadas: appState.clasesSeleccionadas,
      pricing
    });
  });
  
  // Botón confirmar - GUARDA Y DESCARGA
  document.getElementById('btn-confirmar').addEventListener('click', async () => {
    const brandName = document.getElementById('nombre-marca').value;
    const clienteNombre = document.getElementById('cliente-nombre').value;
    const pricing = recalculate();
    
    // Generar HTML del PDF
    const pdfHtml = generatePDF({
      brandName,
      clienteNombre,
      clientType: appState.clientType,
      clasesSeleccionadas: appState.clasesSeleccionadas,
      pricing
    });
    
    // Descargar PDF
    downloadPDF(pdfHtml, `Presupuesto_${brandName}_${new Date().toISOString().split('T')[0]}.html`);
    
    // Cerrar modal
    document.getElementById('preview-modal').style.display = 'none';
    
    // Guardar en Google Sheets
    const result = await GoogleSheetsAPI.saveBudget({
      nombreCliente: clienteNombre,
      tipoCliente: appState.clientType,
      marca: brandName,
      clasesSeleccionadas: appState.clasesSeleccionadas.map(c => c.name).join(', '),
      cantidadClases: appState.clasesSeleccionadas.length,
      ...pricing
    });
    
    if (result.success) {
      showToast('success', `✅ Presupuesto guardado (ID: ${result.id})`);
    } else {
      showToast('error', '⚠️ Error al guardar');
    }
  });
  
  // Inicializar identity card activo
  document.getElementById('btn-natural').classList.add('active');
});

window.Mercadato = { recalculate, showToast, appState };