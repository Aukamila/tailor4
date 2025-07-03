"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOut, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  children?: React.ReactNode;
  showBackButton?: boolean;
}

export function Header({ title, user, children, showBackButton }: HeaderProps) {
  const router = useRouter();
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
       <div className="flex items-center gap-2">
         <SidebarTrigger className="md:hidden" />
         {showBackButton && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
            </Button>
         )}
         <h1 className="text-xl font-semibold font-headline">{title}</h1>
       </div>
      
      <div className="flex items-center gap-4">
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
