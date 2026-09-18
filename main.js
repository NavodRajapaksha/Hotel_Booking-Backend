import bodyParser from 'body-parser'
import express from 'express'
import userRoute from './routes/userRoute.js'
import mongoose from 'mongoose'
import galleryItemRoute from './routes/gallleryItemRoute.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const connectionString = process.env.DB_URL

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  
  if(token != null){
    jwt.verify(token, process.env.JWT_SECRET, 
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