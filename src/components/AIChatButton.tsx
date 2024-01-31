import { useState } from "react";
import AIChatBox from "./AIChatBox";
import {Button} from "./ui/button"
import { Bot } from "lucide-react";
import Root from "../../public/8771020f92fe4a6e27d3.svg";
import Image from "next/image";
export default function AIChatButton(){
    const [chatBoxOpen,setChatBoxOpen] = useState(false);

    return (
        <>
        <Button onClick={()=> setChatBoxOpen(true)}>
            {/* <Bot size ={20} className="mr-2" /> */}
            <Image src={Root} width={45} height={45} alt="roots image" className="mr-2"></Image>

            Lets talk to root chatbot

            </Button>
            <AIChatBox open={chatBoxOpen} onClose={()=> setChatBoxOpen(false)}/>
       
        </>
    )
}