"use client";

import {
    Home, 
    Inbox, 
    Calendar,
    Search,
    Settings,
    User2,
    ChevronUp,
    Plus,
    Shirt,
    User,
    ShoppingBasket
} from "lucide-react";
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarGroupLabel, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem, 
    SidebarSeparator,
    SidebarGroupAction,
    SidebarMenuBadge,
} from "@/components/ui/sidebar"

import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import AddOrder from "./AddOrder";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
    return(
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="bg-transparent hover:bg-transparent">
                            <Link href="/">
                                <Image src="/logo.svg" alt="Shadcn Dashboard Logo" width={20} height={20} />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.title === "Inbox" && (
                                        <SidebarMenuBadge>5</SidebarMenuBadge>   
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Product</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                    <Link href="/products">
                                        <Shirt/>
                                        See all products
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                            <Link href="#">
                                                <Plus/>
                                                    Add Product
                                            </Link>
                                        </SidebarMenuButton>
                                    </SheetTrigger>
                                        <AddProduct />
                                </Sheet>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                            <Link href="#">
                                                <Plus/>
                                                    Add Category
                                            </Link>
                                        </SidebarMenuButton>
                                    </SheetTrigger>
                                        <AddCategory />
                                </Sheet>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Users</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add User</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                    <Link href="/Users">
                                        <User/>
                                        See all Users
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                            <Link href="#">
                                                <Plus/>
                                                    Add User
                                            </Link>
                                        </SidebarMenuButton>
                                    </SheetTrigger>
                                        <AddUser />
                                </Sheet>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Orders / Payments</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Order</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                    <Link href="/payments">
                                        <ShoppingBasket/>
                                        See all Transactions
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <SidebarMenuButton asChild style={{ backgroundColor: 'transparent' }}>
                                            <Link href="#">
                                                <Plus/>
                                                    Add Order
                                            </Link>
                                        </SidebarMenuButton>
                                    </SheetTrigger>
                                    <AddOrder />
                                </Sheet>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>                
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton style={{ backgroundColor: 'transparent' }}>
                                    <User2 /> John Doe <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-10" align="end">
                                <DropdownMenuItem>Account</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
export default AppSidebar