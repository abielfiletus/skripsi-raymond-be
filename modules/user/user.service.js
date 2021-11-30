const { Op } = require('sequelize');

const { user } = require('../../config/db.config');

module.exports = {

  async findAll(params) {
    const where = {};

    if (params.hasOwnProperty('first_name') && params.first_name) {
      where['first_name'] = { [Op.iLike]: `%${params.first_name}%` };
    }
    if (params.hasOwnProperty('last_name') && params.last_name) {
      where['last_name'] = { [Op.iLike]: `%${params.last_name}%` };
    }
    if (params.hasOwnProperty('gender') && params.gender) {
      where['gender'] = params.gender;
    }
    if (params.hasOwnProperty('email') && params.email) {
      where['email'] = { [Op.iLike]: `%${params.email}%` };
    }
    if (params.hasOwnProperty('username') && params.username) {
      where['username'] = { [Op.iLike]: `%${params.username}%` };
    }

    return await user.findAll({ where });
  },

  async findOne(id) {
    return await user.findOne({ where: { id } });
  },

  async findByEmail(email) {
    return await user.findOne({ where: { email }, raw: true });
  },

  async create(body) {
    return user.create(body);
  },

  async update(id, body) {
    const fields = {};

    Object.keys(body).map((key) => {
      if (body[key]) fields[key] = body[key];
    });

    return await user.update(fields, { where: { id }, returning: true });
  },

  async destroy(id) {
    return await user.destroy({ where: { id } });
  }
  
}