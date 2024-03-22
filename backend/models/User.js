const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { 
      type: String, 
      required: true, 
      unique: true 
    },
  email:{
      type:String, 
      required: true, 
      unique: true
    },
  password: { 
      type: String, 
      required: true 
    }
});


UserSchema.methods.isValidPassword = async function(candidatePassword, password) {
    try {
      return await bcrypt.compare(candidatePassword, password);
    } catch (error) {
      throw error;
    }
  };


const User = mongoose.model('User', UserSchema);
module.exports = User;
