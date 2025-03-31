import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchma,createRoomSchema}  from "@repo/common/types"
import {prismaClient} from "@repo/db/client";
const app = express();
app.use(express.json());

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
        await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: "123"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
    
})

app.post("/signin",(req,res)=>{
    const data = SigninSchma.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect Input"
        })
        return;
    }
    const userId = req.body.userId;
    const token = jwt.sign({
        userId
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
    const room = await prismaClient.room.create({
        data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
         roomID: room.id
    })

    
})
app.listen(3001);