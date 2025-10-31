import {ReactNode} from "react";

export function IconButton({
   Icon,onClick,activated
}:{
    Icon: ReactNode,
    onClick: ()=>void,
    activated: boolean

}){
   return <div className={`pointer rounded-full border p-2 bg-white hover:bg-amber-100 ${activated? "text-red-400":"bg-white"}`}
       onClick={onClick}>
        {Icon}
   </div>
}