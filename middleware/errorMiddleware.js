export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404).send({ msg: 'Page not Found' });
  next(error);
};

export const errorHandler = (err, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
