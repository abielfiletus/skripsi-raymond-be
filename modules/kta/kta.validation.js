const { check } = require('express-validator');

const validate = require('../../util/validate.util');

module.exports = {

  async findAll(req, res, next) {
    const validation = [
      check('bank_name')
        .optional()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .escape()
        .trim(),
      check('tenor')
        .optional()
        .isFloat()
        .withMessage('Harus berupa angka')
        .bail()
        .toFloat(),
      check('pinjaman')
        .optional()
        .isFloat()
        .withMessage('Harus berupa angka')
        .bail()
        .toFloat(),
      check('bunga')
        .optional()
        .isFloat()
        .withMessage('Harus berupa angka')
        .bail()
        .toFloat(),
    ];

    return validate(validation, req, res, next);
  },

  async create(req, res, next) {
    const validation = [
      check('bank_id')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('pengenalan')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('proses_aplikasi')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('biaya')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('syarat_pengajuan')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('dokumen_diperlukan')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('note')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('bunga')
        .isArray({ min: 1 })
        .withMessage('Bunga minimal 1 data')
        .bail(),
      check('bunga.*.pinjaman_min')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.pinjaman_max')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.tenor_min')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.tenor_max')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.suku_bunga')
        .notEmpty()
        .withMessage('Tidak boleh kosong')
        .bail()
        .isFloat()
        .withMessage('Harus berupa angka')
        .bail()
        .toFloat(),
    ];

    return validate(validation, req, res, next);
  },

  async update(req, res, next) {
    const validation = [
      check('bank_id')
        .optional()
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('pengenalan')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('proses_aplikasi')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('biaya')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('syarat_pengajuan')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('dokumen_diperlukan')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('note')
        .optional()
        .bail()
        .isString()
        .withMessage('Harus berupa text')
        .bail()
        .trim(),
      check('bunga')
        .isArray({ min: 1 })
        .withMessage('Bunga minimal 1 data')
        .bail(),
      check('bunga.*.pinjaman_min')
        .optional()
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.pinjaman_max')
        .optional()
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.tenor_min')
        .optional()
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.tenor_max')
        .optional()
        .bail()
        .isInt()
        .withMessage('Harus berupa angka')
        .bail()
        .toInt(),
      check('bunga.*.suku_bunga')
        .optional()
        .bail()
        .isFloat()
        .withMessage('Harus berupa angka')
        .bail()
        .toFloat(),
    ];

    return validate(validation, req, res, next);
  },

}