const {Op} = require('sequelize');

const { banner } = require('../../config/db.config');

module.exports = {

  async findAll(params) {
    const options = { where: {} };

    if (params.hasOwnProperty('title') && params.title) {
      options['title'] = { [Op.iLike]: `%${params.title}%` };
    }
    if (params.hasOwnProperty('created_by') && params.created_by) {
      options['created_by'] = params.created_by;
    }

    return await banner.findAll(options);
  },

  async findOne(id) {
    return await banner.findOne({ where: { id } });
  },

  async create(body) {
    return banner.create(body);
  },

  async update(id, body) {
    const fields = {};

    Object.keys(body).map((key) => {
      if (body[key]) fields[key] = body[key];
    });

    return await banner.update(fields, { where: { id }, returning: true });
  },

  async destroy(id) {
    return await banner.destroy({ where: { id } });
  }

}