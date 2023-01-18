const { Schema} = require('mongoose');
const mongoose = require('mongoose')

//This is the job schema used to create, read, update and delete jobs from the database.
const jobSchema = new Schema({
    subcontName:{
        type:String,
        required:true,
    },
    subcontEmail:{
        type:String,
        required:true,
    },
    jobLocation:{
        type:String,
        required:true,
    },
    
    jobDescription:{
        type:String,
        required:true,
    },
    img:{
        // data: Buffer,
        file_name: Array,
        data: Array,
        contentType: String
    },

    date:{
        type:Date,
        default:Date.now,
    }
   });
   
module.exports=mongoose.model('Job', jobSchema);
  

