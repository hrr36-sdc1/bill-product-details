const Sequelize = require('sequelize');
const dbUser = process.env.DB_USER || require('../config.js').user;
const dbPw = process.env.DB_PW || require('../config.js').pw;

const db = new Sequelize('adidas', dbUser, dbPw, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  pool: {
    max: 10,
    min: 2,
    idle: 10000
  }
});


const Looks = db.define('looks', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  pant_name: Sequelize.STRING,
  pant_url: Sequelize.STRING,
  pant_price: Sequelize.INTEGER,
  shirt_name: Sequelize.STRING,
  shirt_url: Sequelize.STRING,
  shirt_price: Sequelize.INTEGER,
  jacket_name: Sequelize.STRING,
  jacket_url: Sequelize.STRING,
  jacket_price: Sequelize.INTEGER,
});


module.exports.db = db;
module.exports.Looks = Looks;
