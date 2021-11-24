const {Op} = require('sequelize');

const { Berita, User } = require('../../config/db.config');

module.exports = {

  async findAll(params) {
    const options = { where: {} };

    if (params.hasOwnProperty('title') && params.title) {
      options['title'] = { [Op.iLike]: `%${params.title}%` };
    }
    if (params.hasOwnProperty('created_by') && params.created_by) {
      options['created_by'] = params.created_by;
    }
    if (params.hasOwnProperty('join_user') && params.join_user) {
      options.include = { model: User, as: 'user' };
    }

    return await Berita.findAll(options);
  },

  async findOne(params) {
    const options = { where: { id: params.id } };

    if (params.hasOwnProperty('join_user') && params.join_user) {
      options.include = { model: User, as: 'user' };
    }

    return await Berita.findOne(options);
  },

  async create(body) {
    return Berita.create(body);
  },

  async update(id, body) {
    const fields = {};

    Object.keys(body).map((key) => {
      if (body[key]) fields[key] = body[key];
    });

    return await Berita.update(fields, { where: { id }, returning: true });
  },

  async destroy(id) {
    return await Berita.destroy({ where: { id } });
  }

}