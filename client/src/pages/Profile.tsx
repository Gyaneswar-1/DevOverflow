import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Settings,
  LogOut,
  MessageCircleQuestionIcon,
  Text,
  
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAsync } from "@/store/actions/user.action";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { logoutService } from "@/service/logout.service";
import React from "react";
import { clearUser } from "@/store/reducers/user.reducer";
import { logout } from "@/store/reducers/auth.reducer";
import UserAnswers from "@/components/UserAnswers";
import UserQuestions from "@/components/UserQuestions";

export default function Profile() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (!user.id) {
      dispatch(setUserAsync());
    }
  }, [dispatch, user.id]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutService();
      dispatch(clearUser());
      dispatch(logout());
      navigate("/welcome");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock user data
  const user_ = {
    name: "Alex Chen",
    username: "alexchen",
    image: "/placeholder.svg?height=100&width=100",
    initials: "AC",
    bio: "Full-stack developer with 5 years of experience. Passionate about React, Next.js, and TypeScript.",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    joinDate: "Joined January 2022",
    reputation: 3420,
    badges: {
      gold: 2,
      silver: 8,
      bronze: 15,
    },
    stats: {
      questions: 24,
      answers: 156,
      accepted: 89,
    },
  };


  // Mock answers data

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24 ">
                  <AvatarImage
                    src={user.profileImage?.url}
                    alt={user.fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {user.fullName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.fullName}</CardTitle>
              <CardDescription>@{user.userID}</CardDescription>
              <div className="mt-2 flex justify-center gap-2">
                <Link to="/profile/edit">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="whitespace-pre-line text-sm">{user.bio}</p>
                <p className="text-sm text-muted-foreground">
                  {user.city || "no city"}, {user.country || "no country"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.createdAt
                    ? `Joined ${formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                      })}`
                    : "Joined date not available"}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">Reputation & Badges</h3>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {user_.reputation.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    reputation
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Badge className="bg-amber-500">●</Badge>
                    <span className="text-sm">{user_.badges.gold}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-gray-400">●</Badge>
                    <span className="text-sm">{user_.badges.silver}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className="bg-amber-700">●</Badge>
                    <span className="text-sm">{user_.badges.bronze}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-4 text-center">
                <div>
                  <p className="text-lg font-bold">{user_.stats.questions}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user_.stats.answers}</p>
                  <p className="text-xs text-muted-foreground">Answers</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user_.stats.accepted}</p>
                  <p className="text-xs text-muted-foreground">Accepted</p>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {loading ? "Logging Out..." : "Log Out"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="questions">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="questions">
                <MessageCircleQuestionIcon className="mr-2 h-4 w-4" />
                Questions
              </TabsTrigger>
              <TabsTrigger value="answers">
                <Text className="mr-2 h-4 w-4" />
                Answers
              </TabsTrigger>
            </TabsList>

          <UserAnswers/>
          <UserQuestions />

           
          </Tabs>
        </div>
      </div>
    </main>
  );
}
