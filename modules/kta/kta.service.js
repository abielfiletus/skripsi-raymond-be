const { Op } = require('sequelize');

const { kta, kta_interest, bank } = require('../../config/db.config');

module.exports = {

  async findAll(params) {
    const options = { where: {}, include: [{ model: kta_interest, as: 'kta_interest' }, { model: bank, as: 'bank' }] };

    if (params.hasOwnProperty('bank_name') && params.bank_name) {
      options.where['$bank.name$'] = { [Op.iLike]: `%${params.bank_name}%` };
    }
    if (params.hasOwnProperty('tenor') && params.tenor) {
      options.where['$kta_interest.tenor_min$'] = { [Op.lte]: Number(params.tenor) };
      options.where['$kta_interest.tenor_max$'] = { [Op.gte]: Number(params.tenor) };
    }
    if (params.hasOwnProperty('pinjaman') && params.pinjaman) {
      options.where['$kta_interest.pinjaman_min$'] = { [Op.lte]: Number(params.pinjaman) };
      options.where['$kta_interest.pinjaman_max$'] = { [Op.gte]: Number(params.pinjaman) };
    }
    if (params.hasOwnProperty('bunga') && params.bunga) {
      // options.where['$kta_interest.suku_bunga$'] = { [Op.lte]: Number(params.bunga) };
      options.where['$kta_interest.suku_bunga$'] = { [Op.gte]: Number(params.bunga) };
    }

    return await kta.findAll(options);
  },

  async findOne(id) {
    return await kta.findOne({ where: { id } });
  },

  async findByEmail(email) {
    return await kta.findOne({ where: { email }, raw: true });
  },

  async create(body) {
    const trx = await kta.sequelize.transaction();
    try {
      const interest = body.bunga;
      delete body.bunga;

      const data = await kta.create(body);

      interest.forEach((item, key) => {
        interest[key]['kta_id'] = data.id;
      })

      await kta_interest.bulkCreate(interest);

      await trx.commit();
      return data;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },

  async update(id, body) {
    const fields = {};

    Object.keys(body).map((key) => {
      if (body[key]) fields[key] = body[key];
    });

    return await kta.update(fields, { where: { id }, returning: true });
  },

  async destroy(id) {
    return await kta.destroy({ where: { id } });
  }
  
}