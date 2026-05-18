import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <div className='mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg md:gap-0'>
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
            <Image 
                src="/logo.png" 
                alt="Ecommerce web" 
                width={36} 
                height={36} 
            />
            <p className="hidden md:block text-md font-medium tracking-wider text-white">E-COMMERCE</p>
        </Link>
        <p className="text-sm text-gray-400">© 2026 E-COMMERCE.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Website</p>
        <Link href="/" className="hover:text-gray-200">Home</Link>
        <Link href="/" className="hover:text-gray-200">Contact</Link>
        <Link href="/" className="hover:text-gray-200">Terms of service</Link>
        <Link href="/" className="hover:text-gray-200">Privacy policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Products</p>
        <Link href="/products" className="hover:text-gray-200">All products</Link>
        <Link href="/products" className="hover:text-gray-200">New arrivals</Link>
        <Link href="/products" className="hover:text-gray-200">Best sellers</Link>
        <Link href="/products" className="hover:text-gray-200">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Other</p>
        <Link href="/" className="hover:text-gray-200">About</Link>
        <Link href="/" className="hover:text-gray-200">Contact</Link>
        <Link href="/" className="hover:text-gray-200">Blog</Link>
        <Link href="/" className="hover:text-gray-200">Affiliate</Link>
      </div>
    </div>
  )
}

export default Footer