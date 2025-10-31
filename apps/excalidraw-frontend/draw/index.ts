//bad code
//bad code
//bad code
//bad code
//bad code
//bad code
//bad code
//bad code


import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
    startAngle: number;
    endAngle: number;

}



export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, selectedShape: string) {

    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);
    if (!ctx) {
        return;
    }
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    }
    clearCanvas(existingShapes, canvas, ctx);
    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const radius = Math.sqrt(width * width + height * height);
        let shape: Shape | null = null;
        if (selectedShape === 'rect') {
            shape = {
                type: "rect",
                x: startX,
                y: startY,
                height,
                width
            }
        }
        else if (selectedShape === 'circle') {
            shape = {
                type: "circle",
                centerX: startX,
                centerY: startY ,
                radius: radius,
                startAngle: 0,
                endAngle: 2 * Math.PI


            }
        }

        if (!shape) {
            return
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))
    })
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            if (selectedShape === 'rect') {
                ctx.strokeStyle = "rgba(255,255,255)"
                ctx.strokeRect(startX, startY, width, height);
            }
            else if (selectedShape === 'circle') {
                const radius = Math.sqrt(width * width + height * height);
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
                ctx.stroke();
            }





        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    existingShapes.map((shape) => {
        if (shape.type === 'rect') {
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        else if (shape.type === 'circle') {
            
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, shape.startAngle, shape.endAngle);
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.stroke()
        }
    })
}

//to get all the existing shapes from the backend
async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;
    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape
    })
    return shapes;
}