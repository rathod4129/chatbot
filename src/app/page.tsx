import Image from 'next/image'
import logo from "@/assets/logo.png"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {

  // const {userId} = auth()
  // if(userId)
   redirect('/chatbot')

  return (
    <main className='flex flex-col h-screen items-center justify-center gap-5'>
      <div className='flex items-center gap-4'>
        <Image src={logo} alt="lamge" height={100} width={100} />
        <span className='font-extrabold tracking-tight txt-4xl lg:text-5xl'>
          ChatBot
        </span>
      </div>
  
    <p className='text-center max-w-pros'>
      An intelligent note taking app with AI integration ,built with OpenAI,Pinecone,Next.js, Shadcn Ui and Clerk.
    </p>
    <Button size='lg' asChild>
      <Link href={'/chatbot'}>Open</Link>
    </Button>
    </main>
  )
}
