const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');

const BankService = require('./bank.service');

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await BankService.findAll(body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data bank',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await BankService.findOne({ id: req.params.id, join_user: req.query.join_user });

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail bank',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    const file = req.files ? req.files['logo'] : null

    try {

      if (!file) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'logo', msg: 'Tidak boleh kosong' }
          ]
        });
      }

      const ext = (path.extname(file.name)).toLowerCase();

      if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'logo', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
          ]
        });
      }

      await file.mv('./assets/bank-logo/' + file.name)

      const header = req.headers.authorization;
      const authorization = header.split(' ')[1];
      const decoded = await jwt.decode(authorization);

      req.body.created_by = decoded.id;
      req.body.logo = process.env.SITE_URL + '/assets/bank-logo/' + (file ? file.name : 'default.png');
      const data = await BankService.create(req.body);

      return res.status(200).send({
        status: true,
        code: 201,
        message: 'Berhasil membuat bank',
        data: data,
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/bank-logo/' + file.name)) {
        fs.removeSync('./assets/bank-logo/' + file.name)
      }
      next(err);
    }
  },

  async update(req, res, next) {
    const file = req.files ? req.files['logo'] : null

    try {
      if (file) {
        const ext = (path.extname(file.name)).toLowerCase();

        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
          return res.status(412).send({
            status: false,
            code: 412,
            message: 'Ada yang salah dengan inputanmu',
            errors: [
              { path: 'logo', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
            ]
          });
        }
      }

      const check = await BankService.findOne({ id: req.params.id });

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      if (file) await file.mv('./assets/bank-logo/' + file.name);

      const header = req.headers.authorization;
      const authorization = header.split(' ')[1];
      const decoded = await jwt.decode(authorization);

      req.body.created_by = decoded.id;
      req.body.logo = process.env.SITE_URL + '/assets/bank-logo/' + (file ? file.name : 'default.png');
      const data = await BankService.update(req.params.id, req.body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah bank',
        data: data[1][0],
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/bank-logo/' + file.name)) {
        fs.removeSync('./assets/bank-logo/' + file.name)
      }
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await BankService.findOne({ id: req.params.id });

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      const data = await BankService.destroy(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus bank',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  }

}