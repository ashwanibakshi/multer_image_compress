const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
      pic:{
          type:String,
          required:true
      },
      name:{
          type:String,
          required:true
      },
      address:{
          type:String,
          required:true
      }
});

module.exports =  mongoose.model('user',userSchema);