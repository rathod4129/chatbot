// import { Link } from "lucide-react";
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddNoteDialog from "@/components/AddEditNoteDialog";
import { Plus } from "lucide-react";
import AIChatButton from "@/components/AIChatButton";

export default function Navbar(){
    const [showAddEditNoteDialog , setShowAddEditNoteDialog] = useState(false)
    return (
        <>
    <div className="p-4 shadow ">
        <div className="max-w-7x1  m-auto flex flex-wrap gap-3 items-center justify-between">
            <span>
                <Link href='/chatbot' className="flex items-center gap-1">
                    <Image src={logo} alt="logo" height={40} width={40}></Image>
                    <span className="font-bold">ChatBot</span>
                    </Link>
            </span>
            <span>
                <div className="flex items-center gap-2">
                    {/* <UserButton afterSignOutUrl="/"
                        appearance={{
                            elements:{avatarBox:{width:"2.5rem",height:"2.5rem"}},
                        }}           
                    /> */}
                     <Button onClick={()=>setShowAddEditNoteDialog(true)}><Plus size ={20} className="mr-2"/>Add Notes</Button> 
                    {/* <AIChatButton /> */}
                </div>
            </span>
        </div>
    </div>
    <AddNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog}/>
    </>
    );
}