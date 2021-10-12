const express = require('express');
const mongoose = require('mongoose');
const { json, urlencoded } = require("body-parser");
const { register } = require('./controllers/auth');
const { login } = require('./controllers/auth');

//express app
const app = express();

app.use(urlencoded({
  extended: true
}));

app.use(json({
  extended: true
}));


const dbURI = 'mongodb+srv://anshu26:ganesham2605@cluster0.vsw4z.mongodb.net/project?retryWrites=true&w=majority';

mongoose.connect(dbURI , { useNewUrlParser : true , useUnifiedTopology : true })
 .then((result) => app.listen(8000))
 .catch((err) => console.log('err' , err));

const User = require('./models/users');




//adding the users
app.post('/add-user', register);
app.post('/login' , login);


//Read all the users 
app.get('/all-users' , (req, res) => 
 {
   User.find()
   .then((result) => { 
     res.send(result);
   })
   .catch((err) => {
    console.log(err);
   })
});



//Read the users by id
app.get('/users/:id' , (req , res) => 
{
 const id = req.params.id;
 User.findById(id)
 .then((result) => {
     res.send(result);
 })
  .catch((err) => {
      console.log(err);
  })
}); 



//Delete the users by id ---->>> HARD DELETE
app.delete('/users/:id' , (req, res) =>
{
 const id = req.params.id;
 User.deleteOne(
   {
     id : id
   })            //1 query will be executed
 .then((result) => {
     res.send(result);
 })
  .catch((err) => {
   console.log(err);
  })
}); 


app.delete('/users/id/_id' , (req , res) =>
{
  const id = req.params._id;
  User.updateOne({
    _id : id
  },{
     isDeleted : true           
  })
  .then((result) => {
    res.send(result);
})
 .catch((err) => {
     console.log(err);
 })
});



//Get the users by email_id
app.get('/users/email/:email_id' , (req, res) => 
{
 const email = req.params.email_id;
 User.findOne(
   {
     email_id: email             //right email_id is the email we are inserting
   }
 )
   .then((result) => {
    res.send(result);
})
    .catch((err) => {
     console.log(err);
 })
});



//Update the users by email id
app.put("/users/:email_id" , (req,res)  =>
{
  const userObj = req.body;
  const email = req.params.email_id;

 User.findOne(
   {
     email_id: email             //right email_id is the email we are inserting
   }
 )
  User.updateOne({
    email_id : email
  },{
    $set : userObj                
  })
  .then((result) => {
    res.send(result);
})
 .catch((err) => {
     console.log(err);
 })
});













