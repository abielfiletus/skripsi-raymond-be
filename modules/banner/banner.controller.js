const path = require('path');
const fs = require('fs-extra');

const BeritaService = require('./banner.service');

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await BeritaService.findAll(body);

      return res.code(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data berita',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await BeritaService.findAll({ id: req.params.id, join_user: req.query.join_user });

      return res.code(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail berita',
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
        return res.code(412).send({
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
        return res.code(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'image', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
          ]
        });
      }

      await file.mv('./assets/news/' + file.name)

      req.body.image = process.env.SITE_URL + '/assets/news/' + (file ? file.name : 'default.png');
      const data = await BeritaService.create(req.body);

      return res.code(200).send({
        status: true,
        code: 201,
        message: 'Berhasil membuat berita',
        data: data,
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/news/' + file.name)) {
        fs.removeSync('./assets/news/' + file.name)
      }
      next(err);
    }
  },

  async update(req, res, next) {
    const file = req.files ? req.files['image'] : null

    try {
      if (file) {
        const ext = (path.extname(file.name)).toLowerCase();

        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
          return res.code(412).send({
            status: false,
            code: 412,
            message: 'Ada yang salah dengan inputanmu',
            errors: [
              { path: 'image', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
            ]
          });
        }
      }

      const check = await BeritaService.findOne(req.params.id);

      if (!check) {
        return res.code(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      if (file) await file.mv('./assets/news/' + file.name);

      req.body.image = process.env.SITE_URL + '/assets/news/' + (file ? file.name : 'default.png');
      const data = await BeritaService.update(req.params.id, req.body);

      return res.code(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah berita',
        data: data,
      })
    } catch (err) {
      if (file && fs.existsSync('./assets/news/' + file.name)) {
        fs.removeSync('./assets/news/' + file.name)
      }
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await BeritaService.findOne(req.params.id);

      if (!check) {
        return res.code(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'id', msg: 'Data tidak ditemukan' }
          ]
        });
      }

      const data = await BeritaService.destroy(req.params.id);

      return res.code(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus berita',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  }

}