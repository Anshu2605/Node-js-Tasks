const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//created a schema
const userSchema = new Schema({
    "name": {
      type: String,
    },

    "email_id": {
      type: String,
      unique: true
      },

    "password" : String,
    "gender" : String,
    "age" : Number,
    "isDeleted" : {
      type : Boolean,
      default : false
    }
});


//created the model
const User = mongoose.model('Student' , userSchema);

module.exports = User;