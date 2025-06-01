

import { useState } from "react"
import { Link } from "react-router-dom" 
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Menu, Terminal, Home, Plus, User, Tag, Users, LogIn, UserPlus } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = location.pathname

  // Mock user data - in a real app this would come from auth context
  const isLoggedIn = false // Change this based on actual auth state
  const user = {
    name: "Alex Chen",
    username: "alexchen",
    image: "/placeholder.svg?height=32&width=32",
    initials: "AC",
  }

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Questions", href: "/", icon: Terminal },
    { name: "Ask Question", href: "/ask", icon: Plus },
    { name: "Tags", href: "/tags", icon: Tag },
    { name: "Users", href: "/users", icon: Users },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left">
            <Terminal className="h-6 w-6 text-primary" />
            DevOverflow
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* User Section */}
          {isLoggedIn ? (
            <div className="space-y-3">
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">@{user.username}</span>
                </div>
              </Link>
              <Separator />
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/auth/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register" onClick={() => setOpen(false)}>
                <Button className="w-full justify-start gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
              <Separator />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                    isActive(item.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Additional Actions */}
          {isLoggedIn && (
            <>
              <Separator />
              <div className="space-y-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
                <Link
                  to="/profile/edit"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
