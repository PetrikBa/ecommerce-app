"use client"

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
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
        </div>
    </nav>
  )
}

export default Navbar