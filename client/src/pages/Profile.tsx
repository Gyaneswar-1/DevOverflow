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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Award,
  Edit,
  Settings,
  LogOut,
  ThumbsUp,
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
      setLoading(true); // Set loading state to true
      await logoutService();
      dispatch(clearUser()); // Clear the user from the store
      navigate("/welcome"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!user.id) {
    return <p>Loading...</p>; // Show a loading state while fetching user data
  }

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

  // Mock questions data
  const questions = [
    {
      id: 1,
      title: "How to optimize React rendering performance?",
      votes: 32,
      answers: 8,
      timePosted: "2 weeks ago",
      tags: ["react", "performance", "optimization"],
    },
    {
      id: 2,
      title: "Best practices for handling API errors in Next.js?",
      votes: 18,
      answers: 5,
      timePosted: "1 month ago",
      tags: ["next.js", "error-handling", "api"],
    },
  ];

  // Mock answers data
  const answers = [
    {
      id: 1,
      questionTitle: "How do I implement authentication in Next.js?",
      questionId: 101,
      content:
        "I would recommend using NextAuth.js. It's specifically designed for Next.js and provides a lot of functionality out of the box...",
      votes: 15,
      isAccepted: true,
      timePosted: "3 days ago",
    },
    {
      id: 2,
      questionTitle: "What's the difference between useMemo and useCallback?",
      questionId: 102,
      content:
        "The main difference is that useMemo is used to memoize values while useCallback is used to memoize functions...",
      votes: 24,
      isAccepted: true,
      timePosted: "1 week ago",
    },
    {
      id: 3,
      questionTitle: "How to implement dark mode in a React application?",
      questionId: 103,
      content:
        "You can use CSS variables combined with a context provider to implement a dark mode toggle...",
      votes: 12,
      isAccepted: false,
      timePosted: "2 weeks ago",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={user.fullName} />
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
                  {`Joined ${formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}`}
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
          <Tabs defaultValue="answers">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="answers">
                <MessageCircle className="mr-2 h-4 w-4" />
                Answers
              </TabsTrigger>
              <TabsTrigger value="questions">
                <MessageCircle className="mr-2 h-4 w-4" />
                Questions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="answers" className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Answers</h2>

              {answers.map((answer) => (
                <Card key={answer.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-2">
                    <Link
                      to={`/questions/${answer.questionId}`}
                      className="hover:underline"
                    >
                      <h3 className="font-semibold">{answer.questionTitle}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {answer.content}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm">
                          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                          {answer.votes}
                        </span>
                        {answer.isAccepted && (
                          <Badge
                            variant="default"
                            className="flex items-center gap-1 bg-green-100 text-green-800"
                          >
                            <Award className="h-3 w-3" />
                            Accepted
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {answer.timePosted}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <h2 className="text-xl font-semibold">Your Questions</h2>

              {questions.map((question) => (
                <Card key={question.id}>
                  <CardHeader className="pb-2">
                    <Link
                      to={`/questions/${question.id}`}
                      className="hover:underline"
                    >
                      <h3 className="font-semibold">{question.title}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm">
                          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                          {question.votes}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          {question.answers}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {question.timePosted}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-center">
                <Link to="/ask">
                  <Button>Ask a New Question</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
