const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
