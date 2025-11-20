const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // Si no hay parámetro o está vacío → hora actual
  if (!dateParam || dateParam.trim() === "") {
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

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
