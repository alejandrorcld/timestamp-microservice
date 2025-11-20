// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Configuración básica
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta para fecha actual (sin parámetro)
app.get('/api', (req, res) => {
  const now = Date.now();            // calcula en el instante del request
  const date = new Date(now);
  res.json({
    unix: now,
    utc: date.toUTCString()
  });
});

// Ruta para fecha con parámetro
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Si es número → timestamp
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    // Si es string → parsear
    date = new Date(dateParam);
  }

  // Validación
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
