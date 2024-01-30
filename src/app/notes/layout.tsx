import NavBar from './Navbar'
export default function  Layout({
    children,
}: {
  children: React.ReactNode
})
{return(
    <>
    <NavBar/>
    <main className='m-auto max-v-7x1 p-4'>{children}</main>
    </>
    
)}