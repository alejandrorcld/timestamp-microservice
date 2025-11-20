const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// ÚNICA ruta: path param opcional y también query param
app.get('/api/:date?', (req, res) => {
  const pathDate = req.params.date;           // /api/:date?
  const queryDate = req.query.date;           // /api?date=

  // Si no hay parámetro (path o query) o está vacío → hora actual
  const emptyPath = !pathDate || pathDate.trim() === '';
  const emptyQuery = typeof queryDate !== 'undefined' && String(queryDate).trim() === '';
  if (emptyPath && (typeof queryDate === 'undefined' || emptyQuery)) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Seleccionar fuente de fecha: prioridad al path; si no hay, usar query
  const dateInput = emptyPath ? queryDate : pathDate;

  // Parse: si solo dígitos → UNIX ms; si no, Date(string)
  let parsed;
  if (/^\d+$/.test(String(dateInput))) {
    parsed = new Date(Number(dateInput));
  } else {
    parsed = new Date(String(dateInput));
  }

  if (parsed.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
