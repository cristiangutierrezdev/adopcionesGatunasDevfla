const mongoose = require('mongoose')
const config = require('../config/config')
const { User } = require('./User')

const dbConnection = mongoose.connect(config.mongoDB, { useNewUrlParser: true }, (err) => {
  !err
    ? console.log('DB Connexion Success')
    : console.log('DB Connexion Fail')
})

module.exports = {
  dbConnection,
  User
}
