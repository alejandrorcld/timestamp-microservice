const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

// Caso vacío: /api y /api/
app.get(['/api', '/api/'], (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Caso con parámetro: /api/:date
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;

  let parsed;
  if (/^\d+$/.test(dateParam)) {
    parsed = new Date(Number(dateParam));
  } else {
    parsed = new Date(dateParam);
  }

  if (parsed.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
