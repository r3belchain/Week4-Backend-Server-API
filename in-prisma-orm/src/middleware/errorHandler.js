const AppError = require("@utils/AppError");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Kalau bukan AppError, kasih status 500
  if (!statusCode) statusCode = 500;

  res.status(statusCode).json({
    error: message || "Internal Server Error",
  });
};

module.exports = errorHandler;
