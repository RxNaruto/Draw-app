import axios from "axios"
import { BACKEND_URL } from "../../config"
import { redirect } from "next/navigation";
async function getRoomId(slug: string){ 
        try {
            const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
            if(response.data && response.data?.room?.id){
                return response.data.room.id;
                
            }
            else{
                console.warn("No room with this name")
                return null;
            }
        } catch (error: any) {
            console.log(error.message)
            return null;
            
        }
        
}
export default async function ChatRoom({
    params
}:{
    params: {
        slug: string
    }
}) {
    const {slug} = params;
    const roomId = await getRoomId(slug);
    if(!roomId){
        redirect("/roomSelect")
        
    }
    redirect(`http://localhost:3001/canvas/${roomId}`);
    

}