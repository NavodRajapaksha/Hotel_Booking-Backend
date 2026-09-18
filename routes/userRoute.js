import express from "express"
import { postUser, loginUser } from "../controllers/userControllers.js"

const userRoute = express.Router()


userRoute.post("/", postUser)
userRoute.post("/login", loginUser)


export default userRoute