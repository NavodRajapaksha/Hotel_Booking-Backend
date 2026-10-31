import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        bookinId:{
            required: true,
            type: String,
            unique: true
        },
        email:{
            required: true,
            type: String
        },
        status:{
            required: true,
            type: String,
            default: "pending"
        },
        reason:{
            type: String,
            default: ""
        },
        start:{
            type: Date,
            required: true
        },
        end:{
            type: Date,
            required: true
        },
        timestamp:{
            type: Date,
            default: Date.now
        },
        notes:{
            type: String,
            default: ""
        }
    }
)

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking