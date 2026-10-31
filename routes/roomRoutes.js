import express from "express"
import { createRoom, deleteRoom, findRoomById, updateRoom, getRoomsByCategory} from "../controllers/roomController.js"

const roomRouter = express.Router()

roomRouter.post('/', createRoom)
roomRouter.get('/by-category/:category', getRoomsByCategory)
roomRouter.delete('/:roomId', deleteRoom)
roomRouter.get('/:roomId', findRoomById)
roomRouter.put('/:roomId', updateRoom)


export default roomRouter