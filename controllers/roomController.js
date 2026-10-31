import Room from '../models/roomModel.js';
import {isAdminValid} from '../controllers/userControllers.js'

export function createRoom(req, res) {
    if(!isAdminValid(req)) {
        return res.status(403).json({
            message: "Access denied. Admin privileges required."
        })
        return
    }

    const newRoom = newRoom(req.body)
    newRoom.save().then(
        (result)=>{
            res.json(
                {
                    message : "Room created successfully",
                    result : result
                }
            )
        }
    )
}

export function deleteRoom(req, res) {

    if(!isAdminVaild(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.param.roomId

    Room.findOneAndDelete({roomId:roomId}).then(
        ()=>{
            res.json(
                {
                    message : "Room Delete successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "Room deletetion failed"
                }
            )
        }
    )
}

export function findRoomById(req,res){

    const roomId = req.param.roomId

    Room.findOne({roomId:roomId}).then(
        (result)=>{
            if(result == null){
                res.status(404).json({
                    message : "Room not found"
                })
                return
            }else{
                res.json(
                    {
                        message : "Room found",
                        result : result
                    }
                )
            }
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Room search failed",
                    error: err
                }
            )
        }
    )
}

export function updateRoom(req, res){

    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.param.roomId

    Room.findOneAndUpdate({
        roomId:roomId},req.body),then(
            ()=> {
                res.json(
                    {
                        message : "Room updated successfully"
                    }
                )
            }
        ).catch(
            ()=>{
                res.json(
                    {
                        message : "Room update failed"
                    }
                )
            }
        )

}