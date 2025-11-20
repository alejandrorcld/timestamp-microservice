const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (dateParam === undefined || dateParam.trim() === "") {
    // Caso vacío → fecha actual
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Caso numérico → timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Caso string → parsear
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
