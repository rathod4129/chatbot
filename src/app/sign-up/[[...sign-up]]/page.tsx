
import { SignUp } from "@clerk/nextjs"

import { Metadata } from "next";
export const metadata : Metadata={
    title:"Sign-up"
}


export default function SingUpPage(){
    return (
        <div className="flex h-screen item-center justify-center">
        <SignUp appearance={{variables:{colorPrimary: "#0F172A"}}}/>
        </div>
    )
}