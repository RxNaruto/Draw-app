import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchma,createRoomSchema}  from "@repo/common/types"
const app = express();

app.post("/signup",(req,res)=>{
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
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

app.post("/room",middleware, (req,res)=>{
    const data = createRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect Details"
        })
        return;

    }
    res.json({
        roomId:123
    })

    
})
app.listen(3001);