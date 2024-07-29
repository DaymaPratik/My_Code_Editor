const express=require('express');
const userController=require('../Controller/userController')
const router = express.Router();
router.post('/api/user/register',userController.registerUserFunction);
router.post('/api/user/login',userController.handleLoginFunction);
module.exports=router;