import Booking from '../models/booking.js';
import { isCustomerVaild } from './userControllers.js';

export function createBooking(req, res) {

    if(!isCustomerVaild(req)){
        return res.status(403).json({ 
            message: "Unauthorized" 
        });
    }

    var startingId = 1000;

    Booking.countDocuments({}).then(
    (count) => {
        const newId =  startingId + count;
        const newBooking = new Booking({
            bookinId : newId,
            roomId : req.body.roomId,
            email : req.user.email,
            start : req.body.start,
            end : req.body.end
        })
        newBooking.save().then(
            (result)=>{
                res.json(
                    {
                        message : "Booking created successfully",
                        result : result
                    }
                )
            }
        ).catch(
            (err)=>{
                res.status(500).json(
                    {
                        message : "Error creating booking"
                    }
                )
            }
        )
    }
    )
}