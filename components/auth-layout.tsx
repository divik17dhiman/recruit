"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: pathname.includes("/recruiter") ? "Recruiter" : "Applicant",
  })

  const handleLogout = () => {
    // Placeholder for Supabase auth logout
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href={user.role === "Recruiter" ? "/dashboard/recruiter" : "/dashboard"}
              className="text-xl font-bold"
            >
              Recruitment Portal
            </Link>
            <nav className="hidden md:flex">
              {user.role === "Applicant" ? (
                <>
                  <Link href="/dashboard" className={`px-4 py-2 ${pathname === "/dashboard" ? "font-medium" : ""}`}>
                    Dashboard
                  </Link>
                  <Link href="/application" className={`px-4 py-2 ${pathname === "/application" ? "font-medium" : ""}`}>
                    Application
                  </Link>
                  <Link href="/profile" className={`px-4 py-2 ${pathname === "/profile" ? "font-medium" : ""}`}>
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard/recruiter"
                    className={`px-4 py-2 ${pathname === "/dashboard/recruiter" ? "font-medium" : ""}`}
                  >
                    Dashboard
                  </Link>
                  <Link href="/profile" className={`px-4 py-2 ${pathname === "/profile" ? "font-medium" : ""}`}>
                    Profile
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary md:block">
              {user.role}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuItem className="text-xs opacity-50">{user.email}</DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">{user.role}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Recruitment Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
