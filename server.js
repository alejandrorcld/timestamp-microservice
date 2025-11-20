// api/index.js
module.exports = (req, res) => {
  const { date } = req.query; // Vercel usa query en lugar de params

  let d;
  if (!date) {
    d = new Date(Date.now()); // calcula en el instante exacto
  } else if (!isNaN(date)) {
    d = new Date(parseInt(date, 10));
  } else {
    d = new Date(date);
  }

  if (d.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
};
