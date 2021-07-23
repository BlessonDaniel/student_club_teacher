const Staff = require('../models/staff')
const Club=require('../models/club')
const Bookshelf=require('../utils/db')
Promise=require('bluebird')
class Staffclass{
    create=async(req,res)=>{
        try{
        let{id,name}=req.body
        let staff=await new Staff({id:id,name:name})
        staff.save()
        //console.log(club)
        res.json({
            message: "Staff created successfully",
            staff
        })
        }
        catch(err){
            console.log(err)
            res.json({
                err
            })
        }
    }
    club(req,res){
        let id=req.query.id
        Staff.where({id:id})
        .fetch({withRelated: ['club']})
        .then(function(staff) {
            res.json({
                message: "Staff details with its club details",
                staff
            })
        })
        .catch(err=>{
        res.json({
                err
        })
        })
    }

    transact(req,res){
        let s_name=req.query.name
        let {c1,c2,c3}=req.body
        Bookshelf.transaction((t) => {
        return new Staff({name: s_name})
        .save(null, {transacting: t})
        .tap(function(model) {
          return Promise.map([
            {name: c1},
            {name: c2},
            {name: c3}
          ], (info) => {
            return new Club(info).save({'staff_id': model.id}, {transacting: t})
          })
        })
    }).then((staff) => {
        let resp=staff.related('club')
      console.log(resp)
      res.json({
            message:"Transaction created successfully"
      })
    }).catch((err) => {
      console.error(err)
    })
    }
    
}
module.exports=new Staffclass()