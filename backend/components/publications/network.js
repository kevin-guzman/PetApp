const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')
const multer = require('multer')
const AuthMiddleware = require('../../middlewares/Authentication')
const upload = multer({dest:'public/files/'})

router.use('*',  AuthMiddleware('customer:read'))

router.get('/', (req, res)=>{
    const {productOrServiceType, price, petType, sales} = req.query
    let filters = {}
    if(productOrServiceType || price || petType || sales){
        filters={productOrServiceType, price, petType, sales}
    }
    controller.getPublications(filters)
    .then(resp => response.success(req, res,resp))
    .catch(err => response.error(req, res, 'Hubo un error al obtener las publicaciones', 500, err))
})

router.post('/', upload.single('file'), (req, res)=>{
    console.log(req.body);
    controller.addPublication(req.body.publication, req.id, req.file)
    .then(resp => {response.success(req, res, resp)})
    .catch(err => {response.error(req, res, err, 503, err)})
})

router.patch('/:id', AuthMiddleware('customer:read') ,(req, res)=>{
    controller.updatePublication(req.params.id, req.body.publication)
    .then(resp => {response.success(req, res,resp)})
    .catch(err => {response.error(req, res, err, 503, err)})
})

router.delete('/:id', (req, res)=>{
    controller.deletePublication(req.params.id)
    .then(resp => {response.success(req, res,`La publicación con id: ${req.params.id} ha sido eliminada`)})
    .catch(err => {response.error(req, res, err, 503, err)})
})

module.exports = router;
