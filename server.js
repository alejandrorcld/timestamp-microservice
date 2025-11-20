const express = require('express');
const cors = require('cors');

const app = express();

// Desactiva ETag y fuerza no-cache para evitar respuestas antiguas
app.set('etag', false);
app.use(cors({ optionsSuccessStatus: 200 }));
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // Calcula SIEMPRE en el momento del request
    date = new Date(Date.now());
  } else if (!isNaN(dateParam)) {
    // Numérico (timestamp en ms)
    date = new Date(parseInt(dateParam, 10));
  } else {
    // String (fecha ISO)
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
