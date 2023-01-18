const mongoose = require('mongoose')

const bcrypt = require('bcrypt');

//This is the access schema, is used to login, logout and register users
const UserSchema= mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    admin:{
        type:Boolean,
        required:true,
        default:false,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

UserSchema.methods.comparePassword = function(plaintext,callback) {
    return callback(null,bcrypt.compareSync(plaintext,this.password));

};
const user = mongoose.model("User",UserSchema);
module.exports = user