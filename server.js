const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Try /api or /api/:date');
});

// Ruta principal con parámetro opcional
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // Si no hay parámetro → devolver hora actual
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si es número → interpretar como UNIX ms
  let parsed;
  if (/^\d+$/.test(dateParam)) {
    parsed = new Date(Number(dateParam));
  } else {
    parsed = new Date(dateParam);
  }

  // Validar fecha
  if (parsed.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta válida
  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString()
  });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice running on http://localhost:${PORT}`);
});
