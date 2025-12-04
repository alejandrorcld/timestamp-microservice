const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// /api sin parámetro → fecha actual
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// /api/:date → fecha proporcionada
app.get('/api/:date', (req, res) => {
  const input = req.params.date;

  let date;

  // Si es número (UNIX en ms)
  if (/^\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  // Validación
  if (date.toString() === "Invalid Date") {
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
  console.log(`Listening on http://localhost:${PORT}`);
});
