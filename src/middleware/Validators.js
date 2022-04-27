/**
 * Validate the request parameters based on the specified schema
 * @param {*} schema
 * @param {*} callback
 * @returns Message or executes callback method
 */

const validateParams = (schema, callback) => {
  return (req, res, next) => {
    var params = {};
    switch (req.method) {
      case 'GET':
        params = req.query;
        break;
      case 'POST':
        params = req.body;
        break;
    }
    const { error } = schema.validate(params, { abortEarly: false });
    const valid = error == null;
    if (valid) {
      callback(req, res);
    } else {
      const { details } = error;
      const message = details.map((i) => i.message);

      console.log('error', details);
      res.status(422).json({ error: message });
    }
  };
};

export { validateParams };
