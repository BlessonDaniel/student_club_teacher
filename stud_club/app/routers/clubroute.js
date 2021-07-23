const express=require('express')
const ClubObj = require('../services/clubservice')
const router=express.Router()
var { Validator, ValidationError } = require('express-json-validator-middleware');
 
 
var validator = new Validator({allErrors: true});
 
var validate = validator.validate;
 
var Club = {
    type: 'object',
    required: ['name'],
    properties: {
        name: {
            type: 'string'
        }
    }
}
router.post('/create',validate({body:Club}),ClubObj.create)

router.get('/students',ClubObj.students)
router.get('/read',ClubObj.read)
router.get('/readall',ClubObj.readall)

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).send('invalid');
        next();
    }
    else next(err); 
});

module.exports=router