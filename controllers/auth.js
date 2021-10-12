const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res) =>
{
    console.log(req.body);
    bcrypt.hash(req.body.password , 10 , function(err,hash) {
      if(err){
        res.json({
            error : err
        })
      }
      else{
        let user = new User(
            {
                name : req.body.name,
                email_id : req.body.email_id,
                password : hash, 
                gender : req.body.gender,
                age : req.body.age
            })
            user.save()
            .then(user => {
                res.json({
                    message : 'User added successfully!'
                })
            }).catch(error =>
                {
                  res.json({
                      error : error
                  })
                })
      }
    })
}

const login = (req,res)=> {
   var email= req.body.email_id
   var password = req.body.password

   User.findOne(
       { 
           email_id : email
       }
   )
   .then( user => {
       if(user)
       {
         bcrypt.compare(password , user.password , function(err , result){
            if(err){
                res.json({
                      error : err
                })
            }
            if(result){
                let token = jwt.sign(
                    { name : user.name} , 'verySecretValue' , {expiresIn : '1h'})
                    res.json({
                        message : 'Login successful',
                        token
                    })
                }else{
                    res.json({
                        message : "Password does not match"
                    })
                }
            })
             }else{
                res.json({
                  message : "No User Found"
                })
            }
       })
}

module.exports = { register , login }