const { validationResult } = require('express-validator')

const _errorFormatter = ({ msg }) => {
  return msg
}

module.exports = async (validations, req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  const errors = validationResult(req).formatWith(_errorFormatter);
  if (errors.isEmpty()) {
    return next();
  }

  const mapError = errors.mapped();

  const validation = [];

  Object.keys(mapError).map((key) => {
    validation.push({ path: key, msg: mapError[key] });
  });

  res.status(412).json({
    status: false,
    code: 412,
    message: 'Ada yang salah dengan inputanmu',
    error: validation.length ? validation : [],
  })
}