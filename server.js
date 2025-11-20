const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

// Ruta para fecha actual
app.get('/api', (req, res) => {
  // Calcula SIEMPRE en el momento del request
  const now = Date.now();
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

  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
