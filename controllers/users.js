const User = require('./models/controllers/users');

app.post('/add-user', (req, res) =>
{
 const userObj = req.body;
 const user = new User(userObj);
 console.log(userObj);

  user.save()
   .then((result) => {
    res.send(result)
   })
   .catch((err) => {
     console.log(err);
   })
});


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


app.delete('/users/:email_id' , (req, res) =>
{
  const email = req.params.email_id;
 User.deleteOne(email)              //1 query will be executed
 .then((result) => {
     res.send(result);
 })
  .catch((err) => {
      console.log(err);
  })
}); 



app.put("/users/:email_id" , (req,res)  =>
{
  const userObj = req.body;
  const email = req.params.email_id;
  User.updateOne({
    email_id : email
  },{
    $set : { 
      name : "Dev"
    }                            
  })
  .then((result) => {
    res.send(result);
})
 .catch((err) => {
     console.log(err);
 })
});



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

