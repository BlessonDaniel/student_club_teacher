const Club=require('../models/club')
//const Student=require('../models/student')
class Clubclass{
/*create(req,res){
    let{id,name}=req.body
    new Club({id:id,name:name})
    .save()
    .then(function(Club){
        console.log(Club)
        res.json({
            message: "Club created successfully",
            Club
        })
    })
    .catch(err=>{
        console.log(err)
        res.json({
            err
        })
    })
}*/

create=async(req,res)=>{
    try{
    let{id,name}=req.body
    let club=await new Club({id:id,name:name})
    club.save()
    //console.log(club)
    res.json({
        message: "Club created successfully",
        club
    })
    }
    catch(err){
        console.log(err)
        res.json({
            err
        })
    }
}

read=async(req,res)=>{
    try{
    let id=req.query.id
    let club=await new Club({id:id}).fetch()
    res.json({
        message:"Club Details",
        club
    })
    }
    catch(err){
        res.json({
            err
        })
    }
}


/*read(req,res){
    let id=req.query.id
    new Club({id:id})
    .fetch()
    .then(function(resp){
        res.json({
            resp
        })
    })
    .catch(err=>{
        res.json({
            err
        })
    })
}*/

students(req,res){
    let id=req.query.id
    Club.where({id:id})
    .fetch({withRelated: ['students']})
    .then(function(club) {
        res.json({
            message: "Club details with its students details",
            club
        })
    })
    .catch(err=>{
    res.json({
            err
    })
    })
}
readall(req,res){
    Club.fetchAll().then(resp=>{
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

module.exports=new Clubclass()