const router=require('express').Router();
const user=require('../controllers/user')
const checkAuth=require('../midllware./checkAuth')
router.get('/getPicture/:userId',checkAuth,user.getPicture)
router.get('/getAllPictures/:userId',checkAuth,user.getAllPictures)
router.post('/signUp',user.signUp)
router.get('/login',user.login)
router.get('/forgotPassword',user.forgotPassword)
router.post('/savePicture/:userId',user.savePicture)
router.delete('/deletPicture/:pictureId',user.deletPicture)

module.exports=router;