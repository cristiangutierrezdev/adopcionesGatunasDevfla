const express = require('express')
const router = express.Router()
// const { User, Cat } = require('../models')
const userController = require('../controllers/userController')
const catController = require('../controllers/catController')

router.post('/create/user', userController.createUser)
router.get('/user/:userid', userController.getThisUser)
router.get('/users', userController.getAllUsers)
router.delete('/delete/user/:userid', userController.deleteThisUser)
router.put('/update/user/:userid', userController.updateThisUser)

router.post('/create/cat', catController.createCat)
router.get('/cat/:catid', catController.getThisCat)
router.get('/active/cats', catController.getAllActiveCats)
router.get('/all/cats', catController.getAllCats)
router.delete('/delete/cat/:catid', catController.deleteThisCat)
router.put('/update/cat/:catid', catController.updateThisCat)
router.post('/adopt/cat/:catid', catController.adoptThisCat)
router.post('/like/cat/:catid', catController.likeThisCat)
router.post('/unlike/cat/:catid', catController.unlikeThisCat)
router.post('/comment/cat/:catid', catController.commentThisCat)
router.get('/getcat/users', catController.getAllCatsCommentsUsers)

// module.exports = (app) => {
// CRUD USERS

// app.post('/api/v1/create/user', (req, res) => {
//   const { name, last_name, email, password } = req.body // eslint-disable-line
//   const newUser = User({
//     name,
//     last_name,
//     email,
//     password
//   })
//   newUser.save((err, user) => {
//     !err
//       ? res.status(201).send(user)
//       : res.status(400).send(err)
//   })
// })
// app.get('/api/v1/user/:userid', (req, res) => {
//   const { userid } = req.params
//   User.findById(userid)
//     .then((user) => {
//       res.send(user)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.get('/api/v1/users', (req, res) => {
//   User.find({ is_active: true }).exec()
//     .then((users) => {
//       res.send(users)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.delete('/api/v1/delete/user/:userid', (req, res) => {
//   const { userid } = req.params
//   const { is_active } = req.body // eslint-disable-line
//   User.findByIdAndUpdate(userid, { $set: { is_active: is_active } }, { new: true }).exec()
//     .then((user) => {
//       res.send(`User ${userid} was deleted`)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.put('/api/v1/update/user/:userid', (req, res) => {
//   const { userid } = req.params
//   User.findByIdAndUpdate(userid, { $set: req.body }, { new: true }).exec()
//     .then((user) => {
//       res.send(user)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
//   // CRUD LOGIN
//   app.post('/api/v1/login/user', (req, res) => {
//     const { email, password } = req.body
//     User.findOne({ email }, function (err, user) {
//       if (err) throw err
//       user.comparePassword(password, function (err, isMatch) {
//         !err
//           ? res.send(isMatch)
//           : res.status(404).send(err)
//       })
//     })
//   })
// CRUD CATS
// app.post('/api/v1/create/cat', (req, res) => {
//   const { picture, age, gender, first_owner } = req.body // eslint-disable-line
//   const { name, last_name, celphone, email } = first_owner // eslint-disable-line
//   const newCat = Cat({
//     picture,
//     age,
//     gender,
//     first_owner: {
//       name,
//       last_name,
//       celphone,
//       email
//     }
//   })
//   newCat.save((err, cat) => {
//     !err
//       ? res.status(201).send(cat)
//       : res.status(400).send(err)
//   })
// })
// app.get('/api/v1/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   Cat.findById(catid).exec()
//     .then((cat) => {
//       res.send(cat)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.get('/api/v1/active/cats', (req, res) => {
//   Cat.find({ is_adopted: false, is_active: true }).exec()
//     .then((cats) => {
//       res.send(cats)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.get('/api/v1/all/cats', (req, res) => {
//   Cat.find().exec()
//     .then((cats) => {
//       res.send(cats)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.delete('/api/v1/delete/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   Cat.findByIdAndUpdate(catid,
//     { $set: { is_active: false } },
//     { new: true }).exec()
//     .then((cat) => {
//       res.send(`Cat ${catid} was delete`)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.put('/api/v1/update/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   Cat.findByIdAndUpdate(catid, { $set: req.body }, { new: true }).exec()
//     .then((cat) => {
//       res.send(cat)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.post('/api/v1/adopt/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   const { current_owner } = req.body //eslint-disable-line
//   Cat.findByIdAndUpdate(catid,
//     {
//       $set: { is_adopted: true },
//       $push: { current_owner: current_owner }
//     },
//     { new: true }).exec()
//     .then((catAdopted) => {
//       res.status(202).send(catAdopted)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.post('/api/v1/like/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   Cat.findByIdAndUpdate(catid, { $inc: { likes: 1 } }, { new: true }).exec()
//     .then((cat) => {
//       res.send(cat)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.post('/api/v1/unlike/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   Cat.findByIdAndUpdate(catid, { $inc: { likes: -1 } }, { new: true }).exec()
//     .then((cat) => {
//       res.send(cat)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.post('/api/v1/comment/cat/:catid', (req, res) => {
//   const { catid } = req.params
//   const { comments } = req.body
//   Cat.findByIdAndUpdate(catid,
//     { $push: { comments: comments } },
//     { new: true }).exec()
//     .then((cat) => {
//       res.status(201).send(cat)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
// app.get('/api/v1/getcat/users', (req, res) => {
//   Cat.find({ is_adopted: false, is_active: true })
//     .populate('comments.user').exec()
//     .then((users) => {
//       res.send(users)
//     }).catch((err) => {
//       res.status(404).send(err)
//     })
// })
//   // IF I WOULD NEED
//   app.post('/api/v1/user_comment/user/:postId', (req, res) => {
//     const { postId } = req.params
//     const { commentary, userId } = req.body
//     User.findOneAndUpdate({ _id: userId, 'post._id': postId }, { $push: { 'post.$.commentary': commentary } }, { new: true }).exec()
//       .then((comment) => {
//         res.status(201).send(comment)
//       }).catch((err) => {
//         res.status(409).send(err)
//       })
//   })
// }
module.exports = router
