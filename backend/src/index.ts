require("dotenv").config();
import express from 'express'
import { WebSocketServer, WebSocket } from "ws";
import {prisma} from  "./lib/prisma"
import jwt from 'jsonwebtoken'

const app = express()
const httpServer = app.listen(8080)

export const wss = new WebSocketServer({ server: httpServer });

app.use(express.json())


app.post('/register', async (req,res)=>{
    let {username, email, password} = req.body
    const creatUser = await prisma.users.create({
        data: {
            username,
            email,
            password
        }
    })
    res.json({
        creatUser
    })
})

app.post('/login', async (req, res)=>{
    let {username, password} = req.body

    const findUser = await prisma.users.findUnique({
        where:{
            username,
            password
        }
    })

    if(!findUser){
        return res.status(404).json({
            message : "user not found with this credentials"
        })
    }

    const token = jwt.sign({
        
    },"vibely123")

    res.json({
        token
    })

})  