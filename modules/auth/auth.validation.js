const { check } = require('express-validator');

const validate = require('../../util/validate.util');

module.exports = {

  async login(req, res, next) {
    const validation = [
      check('email')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isEmail()
        .withMessage('Email tidak valid')
        .bail()
        .normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }),
      check('password')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .escape()
        .trim()
    ];

    return validate(validation, req, res, next);
  },

  async register(req, res, next) {
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
      check('no_telp')
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
  }

}