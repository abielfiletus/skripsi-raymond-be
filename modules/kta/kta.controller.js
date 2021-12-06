require('dotenv').config();
const bcrypt = require('bcryptjs');

const KtaService = require('./kta.service');
const BankService = require('../bank/bank.service');

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await KtaService.findAll(body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data KTA',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async recommendation(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await KtaService.findAll(body);

      const pinjaman = Number(body.pinjaman);
      const tenor = Number(body.tenor);
      const interest = Number(body.bunga);
      const cicilan = Math.round((pinjaman * tenor * interest) / (tenor));

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data rekomendasi',
        data: {
          pinjaman: pinjaman,
          tenor: tenor,
          interest: interest,
          cicilan: cicilan,
          bank: data,
        }
      })
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await KtaService.findOne(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail KTA',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const check = await BankService.findOne({ id: req.body.bank_id });

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'bank_id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      let data = await KtaService.create(req.body);

      return res.status(201).send({
        status: true,
        code: 201,
        message: 'Berhasil menambahkan data KTA',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      let check = await KtaService.findOne(req.params.id);

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukab' },
          ],
        });
      }

      check = await BankService.findOne({ id: req.body.bank_id });

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'bank_id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      if (req.body.password) {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }

      let data = await KtaService.update(req.params.id, req.body);
      data = JSON.parse(JSON.stringify(data[1][0]));
      delete data.password;

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah data KTA',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await KtaService.findOne(req.params.id);

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukab' },
          ],
        });
      }

      const data = await KtaService.destroy(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus data KTA',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req, res, next) {
    try {
      const check = await KtaService.findOne(req.params.id);

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukab' },
          ],
        });
      }

      if (!await bcrypt.compareSync(req.body.old_password, check.password)) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'old_password', msg: 'Tidak sesuai / salah' }
          ]
        });
      }

      const salt = bcrypt.genSaltSync(process.env.SALT_ROUND);
      const password = bcrypt.hashSync(req.body.password, salt);

      const data = await KtaService.update(req.params.id, { password });

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengganti password',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  }

}