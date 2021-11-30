const {Op} = require('sequelize');

const { bank, user } = require('../../config/db.config');

module.exports = {

  async findAll(params) {
    const options = { where: {} };

    if (params.hasOwnProperty('name') && params.name) {
      options['name'] = { [Op.iLike]: `%${params.name}%` };
    }
    if (params.hasOwnProperty('created_by') && params.created_by) {
      options['created_by'] = params.created_by;
    }
    if (params.hasOwnProperty('join_user') && params.join_user) {
      options.include = { model: user, as: 'user' };
    }

    return await bank.findAll(options);
  },

  async findOne(params) {
    const options = { where: { id: params.id } };

    if (params.hasOwnProperty('join_user') && params.join_user) {
      options.include = { model: user, as: 'user' };
    }

    return await bank.findOne(options);
  },

  async create(body) {
    return bank.create(body);
  },

  async update(id, body) {
    const fields = {};

    Object.keys(body).map((key) => {
      if (body[key]) fields[key] = body[key];
    });

    return await bank.update(fields, { where: { id }, returning: true });
  },

  async destroy(id) {
    return await bank.destroy({ where: { id } });
  }

}