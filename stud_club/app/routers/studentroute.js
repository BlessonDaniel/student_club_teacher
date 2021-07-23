const express = require('express')
const router = express.Router()
const StudentObj=require('../services/studentservice')
var { Validator, ValidationError } = require('express-json-validator-middleware');
 
 
var validator = new Validator({allErrors: true});
 
var validate = validator.validate;
 
var Student = {
    type: 'object',
    required: ['regno','name','dob','department','cgpa'],
    properties: {
        regno: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        dob: {
            type: 'string',
            format: 'date'
        },
        department: {
            type: 'string'
        },
        cgpa: {
            type: 'string'
        }
    }
}
var StudentUpdate = {
    type: 'object',
    properties: {
        regno: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        dob: {
            type: 'string',
            format: 'date'
        },
        department: {
            type: 'string'
        },
        cgpa: {
            type: 'string'
        }
    }
}
router.post('/create',validate({body:Student}),StudentObj.create)

router.get('/read',StudentObj.read)
router.get('/details',StudentObj.details)
router.get('/club',StudentObj.club)
router.get('/readall',StudentObj.readall)

router.put('/update',validate({body:StudentUpdate,params:StudentUpdate}),StudentObj.update)

router.delete('/remove',StudentObj.remove)

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).send('invalid');
        next();
    }
    else next(err); 
});

module.exports=router