"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Moon, Settings, SquareMenu, User, Sun } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { setTheme } = useTheme();

    const {toggleSidebar} = useSidebar();


    return(
        <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-background">
            {/* LEFT */}
            <SidebarTrigger />
            {/* <Button variant="outline" onClick={toggleSidebar}>Custom btn</Button> */}
            {/* RIGHT */}
            <div className="flex items-center gap-4">
                <Link href="/">Dashboard</Link>
                {/* THEME MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {mounted ? (
                    <>
                        {/* USER MENU */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button type="button">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={10}>
                                <DropdownMenuGroup>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <User className="h-[1.2rem] w-[1.2rem] mr-2"/>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="h-[1.2rem] w-[1.2rem] mr-2"/>
                                    Settings
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive">
                                    <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"/>
                                    Sign out
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Avatar>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="icon" disabled>
                            <SquareMenu/>
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Navbar