<<<<<<< HEAD
=======
// server.js
>>>>>>> a299d1c889389628cabf5a982a7b3ceb451838be
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

<<<<<<< HEAD
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
=======
// Ruta para fecha actual
app.get('/api', (req, res) => {
  const now = Date.now();
  res.json({
    unix: now,
    utc: new Date(now).toUTCString()
  });
});

// Ruta para fecha con parámetro
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
>>>>>>> a299d1c889389628cabf5a982a7b3ceb451838be
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

<<<<<<< HEAD
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice listening on http://localhost:${PORT}`);
});
=======
// Exporta el handler para Vercel
module.exports = app;
>>>>>>> a299d1c889389628cabf5a982a7b3ceb451838be
