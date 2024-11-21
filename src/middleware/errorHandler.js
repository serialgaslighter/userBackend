export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
}