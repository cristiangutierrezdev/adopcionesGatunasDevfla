const { User, Cat } = require('./models')

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
  app.get('/api/v1/user/:userid', (req, res) => {
    const { userid } = req.params
    User.findById(userid)
      .then((user) => {
        res.send(user)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.get('/api/v1/users', (req, res) => {
    User.find({ is_active: true }).exec()
      .then((users) => {
        res.send(users)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.delete('/api/v1/delete/user/:userid', (req, res) => {
    const { userid } = req.params
    const { is_active } = req.body // eslint-disable-line
    User.findByIdAndUpdate(userid, { $set: { is_active: is_active } }, { new: true }).exec()
      .then((user) => {
        res.send(`User ${userid} was deleted`)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.put('/api/v1/update/user/:userid', (req, res) => {
    const { userid } = req.params
    User.findByIdAndUpdate(userid, { $set: req.body }, { new: true }).exec()
      .then((user) => {
        res.send(user)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  // CRUD LOGIN
  app.post('/api/v1/login/user', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, function (err, user) {
      if (err) throw err
      user.comparePassword(password, function (err, isMatch) {
        !err
          ? res.send(isMatch)
          : res.status(404).send(err)
      })
    })
  })
  // CRUD CATS
  app.post('/api/v1/create/cat', (req, res) => {
    const { picture, age, gender, first_owner } = req.body // eslint-disable-line
    const { name, last_name, celphone, email } = first_owner // eslint-disable-line
    const newCat = Cat({
      picture,
      age,
      gender,
      first_owner: {
        name,
        last_name,
        celphone,
        email
      }
    })
    newCat.save((err, cat) => {
      !err
        ? res.status(201).send(cat)
        : res.status(400).send(err)
    })
  })
  app.get('/api/v1/cat/:catid', (req, res) => {
    const { catid } = req.params
    Cat.findById(catid).exec()
      .then((cat) => {
        res.send(cat)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.get('/api/v1/cats', (req, res) => {
    Cat.find({ is_adopted: false }).exec()
      .then((cats) => {
        res.send(cats)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.delete('/api/v1/delete/cat/:catid', (req, res) => {
    const { catid } = req.params
    const { is_adopted } = req.body // eslint-disable-line
    User.findByIdAndUpdate(catid, { $set: { is_adopted: is_adopted } }, { new: true }).exec()
      .then((cat) => {
        res.send(`User ${catid} was adopted`)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
  app.put('/api/v1/update/cat/:catid', (req, res) => {
    const { catid } = req.params
    User.findByIdAndUpdate(catid, { $set: req.body }, { new: true }).exec()
      .then((cat) => {
        res.send(cat)
      }).catch((err) => {
        res.status(404).send(err)
      })
  })
}
