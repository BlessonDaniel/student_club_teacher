const express = require('express')
const app=express()
const studentroute=require('./app/routers/studentroute')
const clubroute=require('./app/routers/clubroute')
const staffroute=require('./app/routers/staffroute')
const logger=require('./app/config/logger')

app.use(express.urlencoded({ extended: false }))
     
app.use(express.json())
app.use((req,res,next)=>{
  logger.info(req.body||req.headers)
  //console.log(req.body)
  let oldSend=res.send
  res.send=function (data){
    logger.info(data)
    //console.log(data)
    oldSend.apply(res,arguments)
  }
  next()
})
app.listen(3000, function() {
  console.log('Server started at port 3000');
});
app.use('/student',studentroute);
app.use('/club',clubroute);
app.use('/staff',staffroute);