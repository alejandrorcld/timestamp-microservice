const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Root info
app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Try /api or /api/:date');
});

// Current time
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Parse date param
app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  let parsed;

  if (/^\d+$/.test(date)) {
    parsed = new Date(Number(date));
  } else {
    parsed = new Date(date);
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
  console.log(`Server running on http://localhost:${PORT}`);
});
