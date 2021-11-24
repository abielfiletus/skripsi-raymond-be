const jwtConfig = require("express-jwt")
require("dotenv").config({path: __dirname+'/./../.env'})

module.exports = jwtConfig({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
})