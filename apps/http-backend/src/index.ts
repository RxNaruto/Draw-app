import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchma,createRoomSchema}  from "@repo/common/types"
import {prismaClient} from "@repo/db/client";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup",async (req,res)=> {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    const existingUser = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data?.username,
            
        }
    })
    if(existingUser){
        res.status(406).json({
            message: "User already exists"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
    
})

app.post("/signin",async(req,res)=>{
    const parsedData = SigninSchma.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Input"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    if(!user){
        res.status(403).json({
            message: "Not Authorized"
        })
        return;
    }
   
    const token = jwt.sign({
        userId: user?.id
    },JWT_SECRET)

    res.json({
        token
    })
    
})

app.post("/room",middleware, async(req,res)=>{
    const parsedData = createRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Details"
        })
        return;

    }
    //@ts-ignore
    const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
        data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
        message: "room created successfully",
         roomID: room.id
    })
  } catch (error) {
    res.status(411).json({
        message: "Room already exist with this name"
    })
    
  }

    
})
app.get("/chats/:roomId",async(req,res)=>{
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    });
    res.json({
        messages
    })
})
app.get("/room/:slug",async(req,res)=>{
    const slug= req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug : slug
        }
    });
    res.json({
        room
    })
})
app.listen(3001);