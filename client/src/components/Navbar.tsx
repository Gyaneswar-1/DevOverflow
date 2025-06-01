import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, MessageCircle,  Search, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { setUserAsync } from "@/store/actions/user.action";
import type { AppDispatch } from "@/store/store";
import { MobileNav } from "./MobileNav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const pfp = useSelector((state: RootState) => state.userReducer.profileImage);
  const name = useSelector((state: RootState) => state.userReducer.fullName);
  const userID = useSelector((state: RootState) => state.userReducer.userID);
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.isAuthenticated);
  // const user = useSelector((state: RootState) => state.userReducer);
  
  useEffect(()=>{
    dispatch(setUserAsync())
  },[dispatch,setUserAsync])
  return (
               <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevOverflow</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Questions
          </Link>
          <Link
            to="/tags"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname.startsWith("/tags") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Tags
          </Link>
          <Link
            to="/users"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname.startsWith("/users") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Users
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-sm mx-6 lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search questions..." className="pl-8" />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Link to="/ask" className="hidden sm:block">
            <Button size="sm">Ask Question</Button>
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={pfp.url|| "/placeholder.svg"} alt={name} />
                    <AvatarFallback>{name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">@{userID}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/edit" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
