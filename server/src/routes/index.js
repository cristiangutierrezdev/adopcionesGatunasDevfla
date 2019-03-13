const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const catController = require('../controllers/catController')
const { createUserValidator, validateToken } = require('../midlewares/validations')

// REGISTER
router.post('/create/user', [createUserValidator], userController.createUser)
// LOGIN
router.post('/login/user', userController.loginUser)
router.use(validateToken)
router.get('/me', userController.me)
// USER CRUD
router.get('/user/:userid', userController.getThisUser)
router.get('/users', userController.getAllUsers)
router.delete('/delete/user/:userid', userController.deleteThisUser)
router.put('/update/user/:userid', userController.updateThisUser)
// CAT CRUD
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

module.exports = router
