const {
  newUser, getUser, getUsers,
  deleteUser, updateUser, generateTokenByUser,
  findUserByEmail, validatePasswordByUser } = require('./resolver/userResolver.js')

module.exports = {
  me: (req, res) => {
    res.send(req.decode)
  },
  createUser: async (req, res) => {
    const user = await newUser(req.body)
    user
      ? res.status(201).send(user)
      : res.status(400).send({ message: 'Error' })
  },
  getThisUser: async (req, res) => {
    const user = await getUser(req.params.userid)
    user
      ? res.status(200).send(user)
      : res.status(404).send({ message: 'User was not found' })
  },
  getAllUsers: async (req, res) => {
    const users = await getUsers()
    users
      ? res.status(200).send(users)
      : res.status(404).send({ message: 'Users was not found' })
  },
  deleteThisUser: async (req, res) => {
    const user = await deleteUser(req.params.userid)
    user
      ? res.status(200).send({ message: `User ${req.params.userid} was deleted` })
      : res.ststus(409).send({ message: 'Error' })
  },
  updateThisUser: async (req, res) => {
    const newUser = await updateUser(req.params.userid, req.body)
    newUser
      ? res.status(200).send(newUser)
      : res.status(409).send({ message: `Error` })
  },
  loginUser: async (req, res) => {
    const user = await findUserByEmail(req.body.email)
    if (user) {
      const isMatchPassword = await validatePasswordByUser(user, req.body.password)
      if (isMatchPassword) {
        const token = generateTokenByUser(user)
        res.send({ token })
      } else {
        res.status(400).send({ message: 'Incorrect password' })
      }
    } else {
      res.status(400).send({ message: 'User does not exist' })
    }
  }
}
