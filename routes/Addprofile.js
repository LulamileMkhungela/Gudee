const express = require('express')

const router = express.Router()


router.post('/addProfile',(request,response)=>{
    const addProfile= new AddProfileTemplateCopy({
        image:request.body.image,
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        email:request.body.email,
        password:request.body.password
 
    })
    addProfile.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
})
})
//ADD Profile two ... to the database
router.post('/addProfiletwo',(request,response)=>{
    const addProfiletwo= new AddProfileTwoCopy({
        
        phonenumber:request.body.phonenumber,
        alternativenumber:request.body.alternativenumber,
        location:request.body.location
      
 
    })
    addProfiletwo.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})














module.exports = router