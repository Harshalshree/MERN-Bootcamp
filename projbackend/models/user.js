var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:{
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname:{
    type: String,
    maxlength: 32,
    trim: true,
  },
  email:{
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  userinfo:{
    type: String,
    trim: true,
  },
  //TODO: Password
  encry_password:{
    type: String,
    required: true,
  },
  salt: String,
  role:{
    type: Number,
    default: 0,
  },
  purchases:{
    type: Array,
    default: []
  }
});

userSchema.method = {
  securePassword: function(plainPassword){
    if(!plainPassword) return "";
    try{
      return crypto.createHmac('sha256', this.salt)
      .update(plainPassword)
      .digest('hex');
    } catch(err){
      return "";
    }

  }
};

module.exports = mongoose.model("User", userSchema);