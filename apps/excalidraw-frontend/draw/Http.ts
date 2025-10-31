import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data?.messages || [];
  const shapes = messages
    .map((x: { message: string }) => {
      try {
        const msg = JSON.parse(x.message);
        return msg.shape;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return shapes;
}
