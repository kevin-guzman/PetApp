const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')
const multer = require('multer')
const upload = multer({dest:'public/files/'})
const AuthMiddleware = require('../../middlewares/Authentication')

router.post('/auth/singin', (req, res)=>{
    const {email, password} = req.body
    controller.singIn(email, password)
    .then(resp => response.success(req, res, resp, 200))
    .catch(err => response.error(req, res, err, 401, err))
})

router.get('/', (req, res)=>{
    controller.getUsers()
    .then(resp => response.success(req, res, resp, 200))
    .catch(err => response.error(req, res, err, 500, err))
})

router.get('/:id', AuthMiddleware('customer:read'),(req, res)=>{
    const {id} = req.params
    controller.getUserInfo(id)
    .then(resp => response.success(req, res, resp, 200))
    .catch(err => response.error(req, res, err, 500, err))
})

router.post('/auth/singup', upload.single('file'),(req, res)=>{
    const {name, password, password2, email, photo} = req.body
    controller.singUp(name, password, password2, email, photo)
    .then(({data, status})=> response.success(req, res, data, status))
    .catch(err => response.error(req, res, err, 500, err))
})


module.exports = router;