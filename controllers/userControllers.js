import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export function postUser(req, res) {

    const user = req.body

    const password = user.password

    const passwordHash = bcrypt.hashSync(password, 10)

    user.password = passwordHash

    const newUser = new User(user)

    newUser.save()
        .then(() => {
            res.status(201).json({
                message: "User created successfully"
            })
        })
        .catch((err) => {
            console.log(err)

            res.status(500).json({
                message: "Error creating user"
            })
        })
}


export function loginUser(req, res) {

    const credentials = req.body

    // Find user only using email
    User.findOne({ email: credentials.email })
        .then((user) => {

            if (user == null) {

                return res.status(404).json({
                    message: "User not found"
                })
            }

            // Compare entered password with stored hashed password
            const isPasswordValid = bcrypt.compareSync(
                credentials.password,
                user.password
            )

            if (!isPasswordValid) {

                return res.status(401).json({
                    message: "Invalid password"
                })
            }

            const payload = {
                id: user._id,
                email: user.email,
                type: user.type
            }

            const token = jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: "1h"
                }
            )

            res.status(200).json({
                message: "User logged in successfully",
                user: user,
                token: token
            })
        })
        .catch((err) => {

            console.log(err)

            res.status(500).json({
                message: "Login error"
            })
        })
}