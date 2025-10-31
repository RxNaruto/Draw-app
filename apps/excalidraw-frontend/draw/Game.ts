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
      ctx.strokeStyle = "white";
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
    }
  }

  private getCanvasCoords(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    const { x, y } = this.getCanvasCoords(e);
    this.startX = x;
    this.startY = y;
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (!this.clicked) return;
    this.clicked = false;

    const { x: endX, y: endY } = this.getCanvasCoords(e);
    const width = endX - this.startX;
    const height = endY - this.startY;
    const radius = Math.sqrt(width * width + height * height);

    let shape: Shape | null = null;

    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
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
    const width = x - this.startX;
    const height = y - this.startY;

    this.clearCanvas();

    this.ctx.strokeStyle = "white";
    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedTool === "circle") {
      const radius = Math.sqrt(width * width + height * height);
      this.ctx.beginPath();
      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  };

  initMouseHandler() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
