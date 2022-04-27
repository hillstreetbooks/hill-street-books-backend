export const notFoundHandler = function (_req, res) {
  res.status(404).send({
    message: 'Not Found'
  });
};

export const errorHandler = function (err, req, res, next) {
  if (err) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }

  next();
};
