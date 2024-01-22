const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({

  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  diskSpace:{type:Number,default:1024**3*10},
  usedSpace:{type:Number,default: 0},
  avatar:{type:String},
  files:[{type:mongoose.ObjectId,ref:"File"}]
})

 const User = mongoose.model('User',userSchema)

module.exports=User