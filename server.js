const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Try /api or /api/:date');
});

// /api y /api/ → hora actual
function sendNow(res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
}

app.get('/api', (req, res) => sendNow(res));
app.get('/api/', (req, res) => sendNow(res));

// /api/:date → maneja parámetros
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;

  if (!dateParam || dateParam.trim() === "") {
    return sendNow(res);
  }

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
app.listen(PORT, () => {
  console.log(`Timestamp Microservice running on http://localhost:${PORT}`);
});
