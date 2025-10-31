import { getExistingShapes } from "./Http";
import { Tool } from "@/Components/Canvas";

type Shape =
    | {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
    }
    | {
        type: "circle";
        centerX: number;
        centerY: number;
        radius: number;
        startAngle: number;
        endAngle: number;
    }
    | {
        type: "line";
        startX: number;
        startY: number;
        lastX: number;
        lastY: number;
    } | {
        type: "triangle";
        topX: number;
        topY: number;
        leftX: number;
        leftY: number;
        rightX: number;
        rightY: number;
    } | {
        type: "pencil";
        points: {
            x: number,
            y: number
        }[]
    };

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    private currentPath: { x: number; y: number }[] = [];
    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not found");
        this.ctx = ctx;

        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;

        this.init();
        this.initHandler();
        this.initMouseHandler();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.ctx.strokeStyle = "white"
        this.ctx.lineWidth = 4;
        this.clearCanvas();
    }

    initHandler() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        const { ctx, canvas } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const shape of this.existingShapes) {
            if (shape.type === "rect") {
                ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                ctx.beginPath();
                ctx.arc(
                    shape.centerX,
                    shape.centerY,
                    shape.radius,
                    shape.startAngle,
                    shape.endAngle
                );
                ctx.stroke();
            }
            else if (shape.type === "line") {
                ctx.beginPath();
                ctx.moveTo(shape.startX, shape.startY);
                ctx.lineTo(shape.lastX, shape.lastY);
                ctx.stroke();
            }
            else if (shape.type === "triangle") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.topX, shape.topY);
                this.ctx.lineTo(shape.rightX, shape.rightY);
                this.ctx.lineTo(shape.leftX, shape.leftY);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            else if (shape.type === 'pencil') {
                this.ctx.beginPath();
                for (let i = 0; i < shape.points.length - 1; i++) {
                    const p1 = shape.points[i];
                    const p2 = shape.points[i + 1];
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                }
                this.ctx.stroke();
            }
        }
    }

    private getCanvasCoords(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    private calculateShapePoints(endX: number, endY: number) {

        const width = endX - this.startX;
        const height = endY - this.startY;
        const rectWidth = Math.abs(width);
        const rectHeight = Math.abs(height);
        const radius = Math.sqrt(width * width + height * height);
        const topX = this.startX + width / 2;
        const topY = this.startY;
        const leftX = this.startX;
        const leftY = this.startY + height;
        const rightX = this.startX + width;
        const rightY = this.startY + height;
        return { rectHeight, rectWidth, radius, topX, topY, leftX, leftY, rightX, rightY };

    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        const { x, y } = this.getCanvasCoords(e);
        this.startX = x;
        this.startY = y;

        if (this.selectedTool === 'pencil') {
            this.currentPath = [{ x, y }];
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
        }

    };

    mouseUpHandler = (e: MouseEvent) => {
        if (!this.clicked) return;
        this.clicked = false;

        const { x: endX, y: endY } = this.getCanvasCoords(e);
        const { rectWidth, rectHeight, radius, topX, topY, leftX, leftY, rightX, rightY } = this.calculateShapePoints(endX, endY);

        let shape: Shape | null = null;

        if (this.selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width: rectWidth,
                height: rectHeight,
            };
        } else if (this.selectedTool === "circle") {
            shape = {
                type: "circle",
                centerX: this.startX,
                centerY: this.startY,
                radius,
                startAngle: 0,
                endAngle: 2 * Math.PI,
            };

        }
        else if (this.selectedTool === 'line') {
            shape = {
                type: "line",
                startX: this.startX,
                startY: this.startY,
                lastX: endX,
                lastY: endY

            }
        }
        else if (this.selectedTool === 'triangle') {
            shape = {
                type: "triangle",
                topX: topX,
                topY: topY,
                leftX: leftX,
                leftY: leftY,
                rightX: rightX,
                rightY: rightY
            }

        }
        else if (this.selectedTool === 'pencil') {
            shape = {
                type: "pencil",
                points: this.currentPath
            }
        }

        if (!shape) return;

        this.existingShapes.push(shape);
        this.clearCanvas();

        this.socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }),
                roomId: this.roomId,
            })
        );
    };

    mouseMoveHandler = (e: MouseEvent) => {
        if (!this.clicked) return;

        const { x, y } = this.getCanvasCoords(e);
        const { rectWidth, rectHeight, radius, topX, topY, leftX, leftY, rightX, rightY } = this.calculateShapePoints(x, y);
        if (this.selectedTool === 'pencil') {
            this.currentPath.push({ x, y });
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            return;
        }
        this.clearCanvas();

        this.ctx.strokeStyle = "white";
        if (this.selectedTool === "rect") {
            this.ctx.strokeRect(this.startX, this.startY, rectWidth, rectHeight);
        }
        else if (this.selectedTool === "circle") {
            this.ctx.beginPath();
            this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else if (this.selectedTool === 'line') {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        else if (this.selectedTool === 'triangle') {
            this.ctx.beginPath();
            this.ctx.moveTo(topX, topY);
            this.ctx.lineTo(rightX, rightY);
            this.ctx.lineTo(leftX, leftY);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        
    };

    initMouseHandler() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}
