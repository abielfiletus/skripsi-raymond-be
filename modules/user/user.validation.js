const { check } = require('express-validator');

const validate = require('../../util/validate.util');

module.exports = {

  async findAll(req, res, next) {
    const validation = [
      check('first_name')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('last_name')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('gender')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('email')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('username')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
    ];

    return validate(validation, req, res, next);
  },

  async create(req, res, next) {
    const validation = [
      check('first_name')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('last_name')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('gender')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('email')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('username')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('no_Telp')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Minimal 6 karakter')
        .bail()
        .matches(/[a-z]/)
        .withMessage('Minimal 1 huruf kecil')
        .bail()
        .matches(/[A-Z]/)
        .withMessage('Minimal 1 huruf besar')
        .bail()
        .matches(/[0-9]/)
        .withMessage('Minimal 1 angka')
        .bail()
        .escape()
        .trim(),
      check('confirmation_password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .custom((val, { req }) => {
          if (val !== req.body.password) throw 'Harus sama dengan password';
          return true;
        })
        .bail()
        .escape()
        .trim(),
    ];

    return validate(validation, req, res, next);
  },

  async update(req, res, next) {
    const validation = [
      check('first_name')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('last_name')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('gender')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('email')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('username')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('no_Telp')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Minimal 6 karakter')
        .bail()
        .isStrongPassword({ minLowercase: 1 })
        .withMessage('Minimal 1 huruf kecil')
        .bail()
        .isStrongPassword({ minUppercase: 1 })
        .withMessage('Minimal 1 huruf besar')
        .bail()
        .isStrongPassword({ minNumbers: 1 })
        .withMessage('Minimal 1 angka')
        .bail()
        .escape()
        .trim(),
      check('confirmation_password')
        .custom((val, { req }) => {
          if (req.body.password) {
            if (!val) throw 'Tidak boleh kosong';
            if (val !== req.body.password) throw 'Harus sama dengan password';
            return true;
          }
          return true;
        })
        .bail()
        .escape()
        .trim(),
    ];

    return validate(validation, req, res, next);
  },

  async changePassword(req, res, next) {
    const validation = [
      check('old_password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .escape()
        .trim(),
      check('password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Minimal 6 karakter')
        .bail()
        .isStrongPassword({ minLowercase: 1 })
        .withMessage('Minimal 1 huruf kecil')
        .bail()
        .isStrongPassword({ minUppercase: 1 })
        .withMessage('Minimal 1 huruf besar')
        .bail()
        .isStrongPassword({ minNumbers: 1 })
        .withMessage('Minimal 1 angka')
        .bail()
        .escape()
        .trim(),
      check('confirmation_password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .custom((val, { req }) => {
          if (val !== req.body.password) throw 'Harus sama dengan password';
          return true;
        })
        .bail()
        .escape()
        .trim(),
    ];

    return validate(validation, req, res, next);
  }

}