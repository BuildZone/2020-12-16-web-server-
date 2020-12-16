const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Upload =require('../models/VideoDetailsSchema')
const Link =require('../models/videolink')
const Link7 =require('../models/videoLink7')
const Link8 =require('../models/videoLink8')
const Link9 =require('../models/videoLink9')
const Link10 =require('../models/videoLink10')
const Link11 =require('../models/videoLink11')
const Pastpaper=require('../models/pastpaper')
const Profile =require('../models/profile')
const mongoose = require('mongoose')

const db = "mongodb+srv://sachithdb:1996sachith@cluster0.pv6dl.mongodb.net/eventsdb?retryWrites=true&w=majority"


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true} );

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}



router.get('/' , (req, res)=>{
    res.send('From API route')
})

router.post('/register', (req , res)=>{

    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    } )

})

router.post('/login', (req,res)=> {
    let userData = req.body

    User.findOne({email : userData.email}, (error, user) => {
        if(error){
            console.log(error)
        } else if(!user) {
            res.status(401).send('Invalid email')
        }  else if( user.password !== userData.password){
                res.status(401).send('Invalid password')
        } else {
            let payload = { subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
             res.status(200).send({token})
        }

        })

    })

    router.get('/videos',function(req,res){
        console.log('all videos'
        )
        Upload.find({})
        .exec(function(err,videos){
            if(err){
                console.log("error")
            }
        })
    })

router.get('/events', (req,res)=>{
    let events = [
        {
            "_id" : "1",
            "name" : "sachith",
            "description" : "Subject : Maths",
            "area" : "Wellawaya"
        },
        {
            "_id" : "2",
            "name" : "Bhagya",
            "description" : "Subject : Science",
            "area" : "Rathnapura"
        },
        {
            "_id" : "3",
            "name" : "Dhammika",
            "description" : "Subject : English",
            "area" : "Kurunegala"
        },
        {
            "_id" : "4",
            "name" : "Hansaka",
            "description" : "Subject : Technolody",
            "area" : "Beliatta"
        },
        {
            "_id" : "5",
            "name" : "Nalinda",
            "description" : "Subject : ICT",
            "area" : "Balangoda"
        }
    ]

    res.json(events)

})

router.get('/special', verifyToken,  (req,res)=>{
    let events = [
        {
            "_id" : "1",
            "name" : "Grade 06",
            "description" : "Learn Now",
        
            
        },
        {
            "_id" : "2",
            "name" : "Grade 07",
            "description" : "Learn Now",
        
        },
        {
            "_id" : "3",
            "name" : "Grade 08",
            "description" : "Learn Now",
         
        },
        {
            "_id" : "4",
            "name" : "Grade 09",
            "description" : "Learn Now",
         
        },
        {
            "_id" : "5",
            "name" : "Grade 10",
            "description" : "Learn Now",
         
        }
    ]

    res.json(events)

})//////////////////////////////////////*/


router.get('/uploads' , function(req, res){
    console.log('Get request for all videos')
    Upload.find({})
  .exec(function(err,uploads){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(uploads)
    }
  })
  
  })


  ///////////////////////
  router.get('/tasks' , function(req, res){
    console.log('Get request for all link')
    Link.find({})
  .exec(function(err,tasks){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks)
    }
  })
  
  })

  router.get('/tasks07' , function(req, res){
    console.log('Get request for  grade 07')
    Link7.find({})
  .exec(function(err,tasks07){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks07)
    }
  })
  
  })

  router.get('/tasks8' , function(req, res){
    console.log('Get request for  grade 08')
    Link8.find({})
  .exec(function(err,tasks8){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks8)
    }
  })
  
  })

  router.get('/tasks9' , function(req, res){
    console.log('Get request for  grade 09')
    Link9.find({})
  .exec(function(err,tasks9){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks9)
    }
  })
  
  })

  router.get('/tasks10' , function(req, res){
    console.log('Get request for  grade 10')
    Link10.find({})
  .exec(function(err,tasks10){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks10)
    }
  })
  
  })

  router.get('/tasks11' , function(req, res){
    console.log('Get request for  grade 11')
    Link11.find({})
  .exec(function(err,tasks11){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(tasks11)
    }
  })
  
  })

  router.get('/uploads/:id' , function(req, res){
    console.log('Get request for single videos')
    Upload.findById(req.params.id)
  .exec(function(err,uploads){
    if (err) {
        res.send('Error!' + err)
    } else {
        res.json(uploads)
    }
  })
  
  })
    
  router.delete('/uploads/:id' , function(req, res){
    console.log('delete request for videos')
    Upload.findByIdAndRemove(req.params.id,
  function(err,deletedVideo){
    if (err) {
        res.send('Error!' + err)
    } else {
        res.json(deletedVideo)
    }
  })
  
  })
    /////////////////////////////////////////////////////////////
    router.delete('/tasks/:id' , function(req, res){
        console.log('delete request for videos')
        Link.findByIdAndRemove(req.params.id,
      function(err,deletedVideo){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo)
        }
      })
      
      })
      router.delete('/tasks7/:id' , function(req, res){
        console.log('delete request for videos')
        Link7.findByIdAndRemove(req.params.id,
      function(err,deletedVideo7){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo7)
        }
      })
      
      })

      router.delete('/tasks8/:id' , function(req, res){
        console.log('delete request for videos')
        Link8.findByIdAndRemove(req.params.id,
      function(err,deletedVideo8){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo8)
        }
      })
      
      })
      router.delete('/tasks9/:id' , function(req, res){
        console.log('delete request for videos')
        Link9.findByIdAndRemove(req.params.id,
      function(err,deletedVideo9){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo9)
        }
      })
      
      })
      
      router.delete('/tasks10/:id' , function(req, res){
        console.log('delete request for videos')
        Link10.findByIdAndRemove(req.params.id,
      function(err,deletedVideo10){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo10)
        }
      })
      
      })
      
      router.delete('/tasks11/:id' , function(req, res){
        console.log('delete request for videos')
        Link11.findByIdAndRemove(req.params.id,
      function(err,deletedVideo11){
        if (err) {
            res.send('Error!' + err)
        } else {
            res.json(deletedVideo11)
        }
      })
      
      })
      ///////////////////////////////////////////////////////////
  router.delete('/profiles/:id' , function(req, res){
    console.log('delete request for ads')
    Profile.findByIdAndRemove(req.params.id,
  function(err,deleteProfiles){
    if (err) {
        res.send('Error!' + err)
    } else {
        res.json(deleteProfiles)
    }
  })
  
  })

  router.put('/profiles/:id' , function(req, res){
    console.log('approve for  update')
    Profile.findByIdAndUpdate(req.params.id,
        {
            $set:{	name:req.body.name,	imagepath :req.body.imagepath
            }
        },
 {
            new :true
        },   
  function(err,updateProfiles){
    if (err) {
        res.send('Error!' + err)
    } else {
        res.json(updateProfiles)
    }
  })
  
  })

  router.put('/uploads/:id',function(req, res) {
    Upload.findOneAndUpdate(req.params.id, 
        {
            $set:{	name:req.body.name,	videopath :req.body.videopath ,subject:req.body.subject, teachername:req.body.teachername
            }
        },
 {
            new :true
        }, 
        
        function(err, updatedTask) {
        if(err) {
            res.json('Unable to update!'+ err);
        }
  
        res.json(updatedTask);
    })
  });












    
  /*router.post('/Upload',function(req,res){
    console.log('post video')
    var newVideo =new Video();
    newVideo.name =req.body.title;
    newVideo.videoPath =req.body.url;
    
newVideo.save(function(err,insertedVideo){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(insertedVideo)
    }
})

})*/

router.get('/pastpapers' , function(req, res){
    console.log('Get request for all pastpapers')
    Pastpaper.find({})
  .exec(function(err,pastpapers){
    if (err) {
        console.error('Error!' + err)
    } else {
        res.json(pastpapers)
    }
  })
  
  })


  
  router.put('/uploads/:id' , function(req, res){
    console.log('approve for  videos')
    Upload.findByIdAndUpdate(req.params.id,

        {
            $set:{	subject:req.body.subjectname,	Teacher:req.body.teachername,	lesson: req.body.name,
            }
        },
 {
            new :true
        },
    
        
  function(err,updateVideo){
    if (err) {
        res.send('Error!' + err)
    } else {
        res.json(updateVideo)
    }
  })
  
  })






  

module.exports = router