
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
export const metadata : Metadata={
    title:"Sign-in"
}

export default function SingInPage(){
    return (
        <div className="flex h-screen item-center justify-center">
        <SignIn appearance={{variables:{colorPrimary: "#0F172A"}}}/>
        </div>
    )
}