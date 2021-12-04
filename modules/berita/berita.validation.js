const { check } = require('express-validator');

const validate = require('../../util/validate.util');

module.exports = {

  async findAll(req, res, next) {
    const validation = [
      check('title')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('created_by')
        .optional()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
    ];

    return validate(validation, req, res, next);
  },

  async create(req, res, next) {
    const validation = [
      check('title')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('link')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
    ];

    return validate(validation, req, res, next);
  },

  async update(req, res, next) {
    const validation = [
      check('title')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('link')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
    ];

    return validate(validation, req, res, next);
  }

}