app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
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

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
