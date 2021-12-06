const path = require('path');
const fs = require('fs-extra');

const BannerService = require('./banner.service');

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await BannerService.findAll(body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data banner',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await BannerService.findOne(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail banner',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    const file = req.files ? req.files['image'] : null

    try {

      if (!file) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'image', msg: 'Tidak boleh kosong' }
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
            { path: 'image', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
          ]
        });
      }

      await file.mv('./assets/banner/' + Date.now() + ext);

      req.body.image = process.env.SITE_URL + '/assets/banner/' + (file ? file.name : 'default.png');
      const data = await BannerService.create(req.body);

      return res.status(200).send({
        status: true,
        code: 201,
        message: 'Berhasil membuat banner',
        data: data,
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/banner/' + file.name)) {
        fs.removeSync('./assets/banner/' + file.name)
      }
      next(err);
    }
  },

  async update(req, res, next) {
    const file = req.files ? req.files['image'] : null

    try {
      let ext;
      if (file) {
        ext = (path.extname(file.name)).toLowerCase();

        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
          return res.status(412).send({
            status: false,
            code: 412,
            message: 'Ada yang salah dengan inputanmu',
            errors: [
              { path: 'image', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
            ]
          });
        }
      }

      const check = await BannerService.findOne(req.params.id);

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

      if (file) await file.mv('./assets/banner/' + Date.now() + ext);

      req.body.image = process.env.SITE_URL + '/assets/banner/' + (file ? file.name : 'default.png');
      const data = await BannerService.update(req.params.id, req.body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah banner',
        data: data[1][0],
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/banner/' + file.name)) {
        fs.removeSync('./assets/banner/' + file.name)
      }
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await BannerService.findOne(req.params.id);

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

      const data = await BannerService.destroy(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus banner',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  }

}