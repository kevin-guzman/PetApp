exports.success = (req, res, message, status) => {
  res.status(status || 200).send(message)
}

exports.error = (req, res, message, status, details) => {
  console.error('[Error]: -->', details, 'message', message);
  if(typeof(status) !== "number" ) console.error('[Error]: --> El status debe ser un número');
  res.status(status || 500).send(message)
}