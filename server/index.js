const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require("./routes/auth.routes")
const app = express()
const PORT = config.get('serverPort')

app.use(express.json())
app.use("/api/auth",authRouter)
const start = async ()=>{
  try {
    mongoose.connect('mongodb://localhost/app')
      .then(() => console.log('Connected to MongoDB...'))
      .catch(err => console.error('Could not connect to MongoDB...'));

    app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

  }
  catch (e){

  }
}
start()