export const errorHandlingMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  // Handle MongoDB buffering timeout errors globally
  if (err.message && err.message.includes('buffering timed out')) {
    statusCode = 503; // Service Unavailable
    message = 'Database operation timed out. Please try again later.';
  }

  // Handle other MongoDB connection errors
  if (err.name === 'MongoNetworkError' || err.name === 'MongooseTimeoutError') {
    statusCode = 503;
    message = 'Database connection error. Please try again later.';
  }

  res.status(statusCode).json({ status: "error", message });
};
