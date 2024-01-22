const Router = require('express')
const User = require('../models/User')
const {check,validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const router = new Router()
const config = require('config')
const jwt = require('jsonwebtoken')

router.post("/registration",[
  check('email','Uncorrect emial').isEmail(),
  check("password","password must be longer than 3 and shorter than 12 ").isLength({min:3,max:12})],async (req,res)=>{
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({message:"Uncorrect request",errors})
    }
    const {email,password}=req.body
    const userExist =  await User.findOne({email})

    if(userExist) return  res.status(400).json({message:`User with email ${email} already exists`})

    const hashedPass = await bcrypt.hash(password,15)
    const user = new User({email,password:hashedPass})
    await user.save()
    return res.json({message:"User was created"})

  }catch (e){
    console.log(e)
    res.send({message:"Server error"})
  }
})


router.post("/login", async (req,res)=>{
  try {
   const {email,password}=req.body
    const user = User.find({email})
    if(!user) return res.status(404).json({message:"User not found "})
    const isPassValid = bcrypt.compareSync(password,user.password) ///сравнение пароля из запроса и пароля из бд
    if(!isPassValid) return res.send(400).json({message:"Invalid password"})

    const token = jwt.sing({id:user.id},config.get('secretKey'),{expiresIn:"1h"})

  }catch (e){
    console.log(e)
    res.send({message:"Server error"})
  }
})
module.exports = router