require('dotenv').config();
const bcrypt = require('bcryptjs');

const KprService = require('./kpr.service');
const BankService = require('../bank/bank.service');
const KprFunc = require('../../util/kpr.function.util');

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await KprService.findAll(body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data KPR',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async recommendation(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await KprService.findAll(body);

      const hargaRumah = Number(body.harga_rumah);
      const tenor = Number(body.tenor);
      const interest = Number(body.bunga);
      const dp = Number(body.dp);
      const totalPinjaman = hargaRumah - (hargaRumah * dp);

      let pokok = 0;
      let bunga = 0;
      let cicilan = 0;
      let totalBayar = 0;
      for (let i = 0; i < tenor * 12; i++) {
        const pmt = await KprFunc.pmt(interest / 12, i + 1, totalPinjaman, 0);
        const ipmtForPpmt = await KprFunc.ipmt(totalPinjaman, pmt, interest + 1, i - 1);
        const ppmt = await KprFunc.ppmt(pmt, ipmtForPpmt);
        const ipmt = await KprFunc.ipmt(totalPinjaman, pmt, interest * 12, i + 1);
        pokok += ppmt;
        bunga += ipmt;
        cicilan = ppmt + ipmt;
        totalBayar += cicilan;
      }

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data rekomendasi',
        data: {
          harga_rumah: hargaRumah,
          tenor: tenor,
          interest: interest,
          cicilan: cicilan,
          dp: dp,
          bank: data,
        }
      })
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await KprService.findOne(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail KPR',
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

      let data = await KprService.create(req.body);

      return res.status(201).send({
        status: true,
        code: 201,
        message: 'Berhasil menambahkan data KPR',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      let check = await KprService.findOne(req.params.id);

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

      let data = await KprService.update(req.params.id, req.body);
      data = JSON.parse(JSON.stringify(data[1][0]));
      delete data.password;

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah data KPR',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await KprService.findOne(req.params.id);

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

      const data = await KprService.destroy(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus data KPR',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req, res, next) {
    try {
      const check = await KprService.findOne(req.params.id);

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

      const data = await KprService.update(req.params.id, { password });

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