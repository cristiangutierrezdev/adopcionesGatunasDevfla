const { celebrate, Joi } = require('celebrate')
const jwt = require('jsonwebtoken')
const kEY = 'QWERTY123'

module.exports = {
  createUserValidator: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  }),
  validateToken: (req, res, next) => {
    const isToken = req.headers.authorization
    if (isToken) {
      if (isToken.startsWith('tk ')) {
        const token = isToken.slice(3, isToken.length)
        jwt.verify(token, kEY, (err, decode) => {
          if (err) {
            res.status(403).send({ message: 'Your token is not work' })
          } else {
            req.decode = decode
            next()
          }
        })
      } else {
        res.status(403).send({ message: 'Incorrect suffix' })
      }
    } else {
      res.status(403).send({ message: 'You need a token to pass' })
    }
  }
}
