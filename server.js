const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

// Página raíz opcional
app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Use /api/:date?');
});

// /api sin parámetro: devuelve fecha actual
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// /api/:date — acepta UNIX en ms o fecha ISO/YYYY-MM-DD
app.get('/api/:date', (req, res) => {
  const input = req.params.date;

  // Caso: número (posible UNIX). Aceptamos solo dígitos para evitar parseo ambiguo.
  const isNumeric = /^[+-]?\d+$/.test(input);

  let date;
  if (isNumeric) {
    // Interpretar como milisegundos UNIX
    const ms = Number(input);
    date = new Date(ms);
  } else {
    // Interpretar cadena como fecha
    date = new Date(input);
  }

  // Validación
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice listening on http://localhost:${PORT}`);
});
