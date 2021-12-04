require('dotenv').config();
const bcrypt = require('bcryptjs');

const UserService = require('./user.service');
const path = require("path");

module.exports = {

  async findAll(req, res, next) {
    try {
      const body = JSON.stringify(req.body) !== '{}' ? req.body : req.query;

      const data = await UserService.findAll(body);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data pengguna',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async findOne(req, res, next) {
    try {
      const data = await UserService.findOne(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengambil data detail pengguna',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const mock = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        no_telp: req.body.no_telp,
        username: req.body.username,
        password: req.body.password,
      };

      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      mock.password = bcrypt.hashSync(mock.password, salt);

      let data = await UserService.create(req.body);
      data = JSON.parse(JSON.stringify(data[1][0]));
      delete data.password;

      return res.status(201).send({
        status: true,
        code: 201,
        message: 'Berhasil menambahkan data pengguna',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    const file = req.files ? req.files['avatar'] : null

    try {
      if (file) {
        const ext = (path.extname(file.name)).toLowerCase();

        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
          return res.status(412).send({
            status: false,
            code: 412,
            message: 'Ada yang salah dengan inputanmu',
            errors: [
              { path: 'avatar', msg: 'Ekstensi gambar tidak hanya boleh jpg, jpeg atau png' }
            ]
          });
        }
      }

      const check = await UserService.findOne(req.params.id);

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

      if (req.body.password) {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }

      if (file) {
        await file.mv('./assets/avatar/' + file.name);
        req.body.avatar = process.env.SITE_URL + '/assets/avatar/' + file.name;
      }

      let data = await UserService.update(req.params.id, req.body);
      data = JSON.parse(JSON.stringify(data[1][0]));
      delete data.password;

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil mengubah data pengguna',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const check = await UserService.findOne(req.params.id);

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

      const data = await UserService.destroy(req.params.id);

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil menghapus data pengguna',
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req, res, next) {
    try {
      const check = await UserService.findOne(req.params.id);

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

      const data = await UserService.update(req.params.id, { password });

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