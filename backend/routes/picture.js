const { Router } = require('express')

const router=require('express').Router()
const picture=require('../controllers/picture')
//const upload=require('..///lware/upload')
router.delete('/deletPicture/:pictureId',picture.deletPicture)
router.post('/saveMyPicture/:userId',picture.saveMyPicture)
module.exports=router