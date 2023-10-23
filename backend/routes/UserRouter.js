const express  = require('express')
const { 
    loginUser, 
    getUser, 
    postUser, 
    updateUser, 
    deltUser, 
    getOneUser, 
    deltMultiUser, 
    getMultiUser, 
    editPassword
} = require('../controllers/UserController')
const router = express.Router()

router.route('/').get(getUser).post(postUser)

router.route('/login').post(loginUser)

router.route('/:id').put(updateUser).delete(deltUser).get(getOneUser)

router.route('/:ids').delete(deltMultiUser).get(getMultiUser)

router.route('/edit-password/:id').put(editPassword)

module.exports = router