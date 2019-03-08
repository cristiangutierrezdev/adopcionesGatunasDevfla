const { User } = require('./models')

module.exports = (app) => {
  // CRUD USERS
  app.post('/api/v1/create/user', (req, res) => {
    const { name, last_name, email, password } = req.body // eslint-disable-line
    const newUser = User({
      name,
      last_name,
      email,
      password
    })
    newUser.save((err, user) => {
      !err
        ? res.status(201).send(user)
        : res.status(400).send(err)
    })
  })
  app.get('/api/v1/users', (req, res) => {
    User.find({ is_active: true }).exec()
      .then((users) => {
        res.send(users)
      }).catch((err) => {
        res.status(409).send(err)
      })
  })
  app.patch('/api/v1/delete/user/:userid', (req, res) => {
    const { userid } = req.params
    const { is_active } = req.body // eslint-disable-line
    User.findByIdAndUpdate(userid, { $set: { is_active: is_active } }, { new: true }).exec()
      .then((user) => {
        res.send(user)
      }).catch((err) => {
        res.status(409).send(err)
      })
  })
  app.put('/api/v1/update/user/:userid', (req, res) => {
    const { userid } = req.params
    User.findByIdAndUpdate(userid, { $set: req.body }, { new: true }).exec()
      .then((user) => {
        res.send(user)
      }).catch((err) => {
        res.status(409).send(err)
      })
  })
  // CRUD USERS
}
