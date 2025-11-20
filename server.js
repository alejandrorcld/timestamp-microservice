app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

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
