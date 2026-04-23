# Mercadato - Guía Rápida

## Estructura de Archivos

```
/root
├── index.html      → Aplicación principal
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    └── favicon.svg
```

## Uso

1. **Abre** `index.html` en tu navegador
2. **Ingresa** el nombre del cliente
3. **Selecciona** Persona Natural o Jurídica
4. **Ingresa** el nombre de la marca
5. **Selecciona** tipo de búsqueda (Fonética/Gráfica/Mixta)
6. **Añade** las классы NIZA necesarias
7. **Ajusta** descuento/IVA si es necesario
8. **Clic** en "GENERAR PRESUPUESTO"
9. **Confirma** en el modal para guardar en Google Sheets

## Fórmula Financiera

```
Subtotal Bruto = Tasa Búsqueda + Tasa Solicitud + Honorarios + Planilla
Descuento = Honorarios × % / 100         (SOLO sobre honorarios)
Subtotal Neto = Subtotal Bruto - Descuento
IVA = Subtotal Neto × % IVA
Total = Subtotal Neto + IVA
```

## Conexión Google Sheets

La app intentará conectar automáticamente a tu Google Apps Script.
- **Verde**: Conectado
- **Amarillo**: Modo local (sin conexión)

## Configurar Precios

Clic en el ícono de engranaje ⚙️ para modificar los precios por defecto.

## Notas

- No incluye tasa de SENIAT
- Vigencia: 2 días hábiles