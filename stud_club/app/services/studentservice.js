const Student = require('../models/student')
class Studentclass{
create(req,res){
    let {regno,name,dob,department,cgpa,club_id}=req.body
    new Student({regno:regno,name:name,dob:dob,department:department,cgpa:cgpa,club_id:club_id})
    .save()
    .then(function(response){
        console.log(response)
        res.json({
            message:"Student Object Created Sucessfully",
            response
        })
    })
    .catch(err=>{
        console.error(err)
        res.json({
            err
        })
    })
}
read(req,res){
    let regno=req.query.regno
    new Student({regno:regno})
    .fetch()
    .then(function(response){
        res.json({
            response
        })
    })
    .catch(err=>({
        err
    }))
}
update(req,res){
    let regno=req.query.regno
    let {name,dob,department,cgpa,club_id}=req.body
    new Student({regno:regno})
    .fetch()
    .then(function(response){
    return new Student({id:response.id,name:name,dob:dob,department:department,cgpa:cgpa,club_id:club_id})
    .save()
    .then(function(resp){
        res.json({
            message: "Updated Successfully",
            resp
        })
    })
    })
    .catch(err=>{
        res.json({
            message: "Invalid Input",
            err
        })
    })
}
remove(req,res){
    let regno=req.query.regno
    new Student({regno:regno})
    .fetch()
    .then(function(response){
    return new Student({id:response.id})
    .destroy()
    .then(function(resp){
        res.json({
            message: "Specified record is deleted"
        })
    })
    })
    .catch(err=>{
        res.json({
            err
        })
    })
}
details(req,res){
    let name=req.query.name
    new Student({name:name})
    .fetch()
    .then(function(response){
        res.json({
            message: "Details",
            response
        })
    })
    .catch(err=>({
        err
    }))
}
club(req,res){
    let regno=req.query.regno
    Student.where({regno:regno}).fetch({withRelated: ['club']}).then((model)=> {
        res.json({
            message: "Student data with its Club details",
            model
        })
    })
    .catch(err=>{
    res.json({
            err
    })
    })
}
readall(req,res){
    Student.fetchAll().then(resp=>{
        res.json({
            resp
        })
    })
    .catch(err=>{
        res.json({
            err
        })
    })
}
}
module.exports=new Studentclass()