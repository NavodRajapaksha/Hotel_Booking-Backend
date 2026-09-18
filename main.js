import bodyParser from 'body-parser'
import express from 'express'
import userRoute from './routes/userRoute.js'
import mongoose from 'mongoose'
import galleryItemRoute from './routes/gallleryItemRoute.js'
import jwt from 'jsonwebtoken'

const app = express()

const connectionString = "mongodb://rmpndulshanrajapaksha_db_user:navod123@ac-7bc61fd-shard-00-00.18uv7o0.mongodb.net:27017,ac-7bc61fd-shard-00-01.18uv7o0.mongodb.net:27017,ac-7bc61fd-shard-00-02.18uv7o0.mongodb.net:27017/?ssl=true&replicaSet=atlas-121cbr-shard-0&authSource=admin&appName=Cluster0"

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  
  if(token != null){
    jwt.verify(token, "secret", 
      (err, decoded) => {
      if(decoded != null){
        req.user = decoded
        next()
      }else{
        next()
      }
    })
  }else{
    next()
  }
})

mongoose.connect(connectionString).then(
  () => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json())

app.use('/api/users', userRoute)

app.use('/api/gallery-items', galleryItemRoute)

app.listen(3000, (req,res) => {
  console.log('Server is running on port 3000');
});