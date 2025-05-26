import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircleQuestion, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { setUserAsync } from "@/store/actions/user.action";
import type { AppDispatch } from "@/store/store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const pfp = useSelector((state: RootState) => state.userReducer.profileImage);
  const name = useSelector((state: RootState) => state.userReducer.fullName);
  useEffect(()=>{
    dispatch(setUserAsync())
  },[dispatch,setUserAsync])
  return (
    <div className="container mx-auto flex items-center justify-evenly  px-4 py-5">
      <div className="mb-8 flex items-center justify-between bg-muted-foreground/10 p-6 rounded-lg shadow-md max-w-7xl min-w-full">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer flex items-center gap-2 justify-center"
        >
          <h1 className=" font-bold text-primary text-2xl sm:hidden block">
            <MessageCircleQuestion />
          </h1>
          <h1 className="text-3xl  font-bold sm:block hidden text-primary">DevOverflow</h1>
        </div>
        <div className="flex gap-4">
          <Link to="/ask">
            <Button>Ask a Question</Button>
          </Link>
          <Link to="/profile">
            <Avatar>
              <AvatarImage src={String(pfp)} />
              <AvatarFallback>
                {name ? (
                  name.charAt(0).toUpperCase()
                ) : (
                  <User className="h-6 w-6" />
                )}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
