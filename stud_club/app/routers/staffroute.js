const express=require('express')
const Staff = require('../models/staff')
const Staffobj = require('../services/staffservice')
const router=express.Router()

router.post('/create',Staffobj.create)
router.get('/club',Staffobj.club)
router.post('/transact',Staffobj.transact)

module.exports=router