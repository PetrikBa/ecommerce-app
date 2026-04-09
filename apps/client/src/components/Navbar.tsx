import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-300 pb-4'>
        {/* LEFT */}
        <Link href="/" className="flex items-center">
            <Image 
                src="/logo.png" 
                alt="Ecommerce web" 
                width={36} 
                height={36} 
                className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className="hidden md:block text-md font-medium tracking-wider">E-COMMERCE</p>
        </Link>
        {/* RIGHT */}
        <div className="flex items-center gap-6">
            <SearchBar />   
            <Link href="/" >
                <Home className="w-4 h-4 text-gray-600"/>
            </Link>
            <Bell className="w-4 h-4 text-gray-600"/>
            <ShoppingCartIcon/>
            <Show when="signed-out">
              <SignInButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
        </div>
    </nav>
  )
}

export default Navbar