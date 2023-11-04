const allowedCors = [
  'http://movies.msrdnv.nomoredomainsrocks.ru',
  'https://movies.msrdnv.nomoredomainsrocks.ru',
  'http://localhost:3001',
];

module.exports.handleCorsOrigin = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};
