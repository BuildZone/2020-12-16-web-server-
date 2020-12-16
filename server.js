const path = require('path');
require('dotenv').config();
const profilesRoutes = require('./routes/profiles');
const uploadRoutes= require('./routes/upload')


const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const paperRoutes =require('./routes/pastpapers')
const PORT = 3000   //port number to run express
const PORTS =3000
const api = require('./routes/api')
const app = express()   //instance of express
var Admin =require('./models/Admin')
var Admin1 =require('./models/videolink')
var video07 =require('./models/videoLink7')
var video08 =require('./models/videoLink8')
var video09 =require('./models/videoLink9')
var video10 =require('./models/videoLink10')
var video11 =require('./models/videoLink11')
var mongoose =require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router()
const uploads =require('./models/VideoDetailsSchema')
app.use(cors())

app.use(bodyParser.json())    //to handle json data

app.use('/api', api)

app.get('/', function(req, res){
    res.send('Server Works')    //checking statement
})



mongoose
  .connect(
    'mongodb+srv://sachithdb:1996sachith@cluster0.pv6dl.mongodb.net/eventsdb?retryWrites=true&w=majority'
 
  )
  .then(() => {
    app.listen(PORTS, console.log(`Server is running on port ${PORTS}`));
  })
  .catch((err) => console.log(`Could not connect to database server`, err));

app.use(bodyParser.json());
app.use(cors());




app.post('/register',(req,res)=>{
    console.log(req.body) 


var AdminData=req.body
var admin=new Admin(AdminData)
admin.save((error,result)=>{
    if(error)
    console.log("AdminData",AdminData)
    console.log('save data sucess')
    res.sendStatus(200);
})

})
/************************************************* */
app.post('/uploadlink',(req,res)=>{
  console.log(req.body) 


var uploadLink=req.body
var link=new Admin1(uploadLink)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink",uploadLink)
  console.log('save link sucess')
  res.sendStatus(200);
})

})

app.post('/uploadlink07',(req,res)=>{
  console.log(req.body) 


var uploadLink07=req.body
var link=new video07(uploadLink07)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink07",uploadLink07)
  console.log('save link sucess')
  res.sendStatus(200);
})

})
app.post('/uploadlink8',(req,res)=>{
  console.log(req.body) 


var uploadLink8=req.body
var link=new video08(uploadLink8)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink8",uploadLink8)
  console.log('save link sucess')
  res.sendStatus(200);
})

})
app.post('/uploadlink9',(req,res)=>{
  console.log(req.body) 


var uploadLink9=req.body
var link=new video09(uploadLink9)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink9",uploadLink9)
  console.log('save link sucess')
  res.sendStatus(200);
})

})
app.post('/uploadlink10',(req,res)=>{
  console.log(req.body) 


var uploadLink10=req.body
var link=new video10(uploadLink10)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink10",uploadLink10)
  console.log('save link sucess')
  res.sendStatus(200);
})

})
app.post('/uploadlink11',(req,res)=>{
  console.log(req.body) 


var uploadLink11=req.body
var link=new video11(uploadLink11)
link.save((error,result)=>{
  if(error)
  console.log("uploadLink11",uploadLink11)
  console.log('save link sucess')
  res.sendStatus(200);
})

})
/*********************************************************************** */
app.post('/login', (req,res)=> {
    var AdminData=req.body;

    Admin.findOne({email : AdminData.email}, (error, Admin) => {
        if(error){
            console.log(error)
        } else if(!Admin) {
            res.status(401).send('Invalid email')
        }  else if( Admin.password !== AdminData.password){
                res.status(401).send('Invalid password')
        } else {
            let payload = { subject: Admin._id}
            let token = jwt.sign(payload, 'secretKey')
             res.status(200).send({token})
        }

        })

    })






app.use('/images', express.static(path.join('images')));

app.use('/api/profiles', profilesRoutes);



app.use('/pastpapers', express.static(path.join('pastpapers')));

  app.use('/api/pastpapers', paperRoutes);

  

app.use('/videos', express.static(path.join('videos')));

app.use('/api/upload', uploadRoutes);


//const ports = process.env.PORT || 3000;





