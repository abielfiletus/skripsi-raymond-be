require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserService = require('../user/user.service');

module.exports = {

  async login(req, res, next) {
    try {
      let check = await UserService.findByEmail(req.body.email);

      if (!check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'email', message: 'Email tidak ditemukan' }
          ],
        });
      }

      if (!await bcrypt.compareSync(req.body.password, check.password)) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'password', message: 'Tidak sesuai / salah' }
          ]
        });
      }

      check = JSON.parse(JSON.stringify(check));
      delete check.password;

      const data = { ...check };
      data.token = await jwt.sign({ id: check.id }, process.env.JWT_SECRET, { algorithm: 'HS256' });

      return res.status(200).send({
        status: true,
        code: 200,
        message: 'Berhasil masuk',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    try {
      const check = await UserService.findByEmail(req.body.email);

      if (check) {
        return res.status(412).send({
          status: false,
          code: 412,
          message: 'Ada yang salah dengan inputanmu',
          errors: [
            { path: 'email', message: 'Sudah terdaftar' }
          ]
        });
      }

      const mock = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        no_telp: req.body.no_telp,
        username: req.body.username,
        password: req.body.password,
      };

      const salt = bcrypt.genSaltSync(process.env.SALT_ROUND);
      mock.password = bcrypt.hashSync(mock.password, salt);

      const data = await UserService.create(mock);

      return res.status(201).send({
        status: true,
        code: 201,
        message: 'Berhasil mendaftar ke aplikasi',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

}