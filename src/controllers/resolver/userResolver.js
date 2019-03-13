const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const kEY = 'QWERTY123'

module.exports = {

  newUser: (user) => {
    return new Promise((resolve, reject) => {
      const { name, last_name, email, password } = user // eslint-disable-line
      const newUser = User({
        name,
        last_name,
        email,
        password
      })
      newUser.save((err, user) => {
        err
          ? reject(err)
          : resolve(user)
      })
    })
  },
  getUser: (userid) => {
    return User.findById(userid).exec()
      .then((user) => {
        return user
      }).catch(() => {
        return false
      })
  },
  getUsers: () => {
    return User.find({ is_active: true }).exec()
      .then((users) => {
        return users
      }).catch(() => {
        return false
      })
  },
  deleteUser: (userid) => {
    return User.findByIdAndUpdate(userid, { $set: { is_active: false } }, { new: true }).exec()
      .then((user) => {
        return user
      }).catch(() => {
        return false
      })
  },
  updateUser: (userid, body) => {
    return User.findByIdAndUpdate(userid, { $set: body }, { new: true }).exec()
      .then((newUser) => {
        return newUser
      }).catch(() => {
        return false
      })
  },
  findUserByEmail: (email) => {
    return User.findOne({ email }).exec()
      .then((user) => {
        return user
      }).catch(() => {
        return false
      })
  },
  validatePasswordByUser: (user, password) => {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) reject(new Error(false))
        resolve(isMatch)
      })
    })
  },
  generateTokenByUser: (user) => {
    const userPayload = {
      id: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }
    return jwt.sign(userPayload, kEY)
  }
}
