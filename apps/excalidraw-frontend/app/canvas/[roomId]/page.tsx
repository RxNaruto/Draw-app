import { RoomCanvas } from "@/Components/RoomCanvas";

export default async function CanvasPage({params}: {
    params: {
        roomId: string
    }
}){
    const roomId = (await params).roomId;
    if(!roomId){
        console.log("Room Id not provided");
        return;
    }
    return <RoomCanvas roomId = {roomId} />
    
}