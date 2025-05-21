import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp, Clock } from "lucide-react"

export default function Home() {
  // Mock data for questions
  const questions = [
    {
      id: 1,
      title: "How do I implement authentication in Next.js?",
      content: "I'm building a Next.js application and need to add user authentication. What's the best approach?",
      author: "Sarah Johnson",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "SJ",
      tags: ["next.js", "authentication", "web-dev"],
      votes: 24,
      answers: 8,
      timePosted: "2 hours ago",
    },
    {
      id: 2,
      title: "What's the difference between useMemo and useCallback?",
      content: "I'm confused about when to use useMemo vs useCallback in React. Can someone explain?",
      author: "Alex Chen",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "AC",
      tags: ["react", "hooks", "javascript"],
      votes: 32,
      answers: 12,
      timePosted: "5 hours ago",
    },
    {
      id: 3,
      title: "Best practices for responsive design in 2023?",
      content: "What are the current best practices for creating responsive web designs in 2023?",
      author: "Miguel Rodriguez",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "MR",
      tags: ["css", "responsive-design", "ui-ux"],
      votes: 18,
      answers: 6,
      timePosted: "1 day ago",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">DevOverflow</h1>
          <p className="text-muted-foreground">Your community for developer Q&A</p>
        </div>
        <div className="flex gap-4">
          <Link to="/ask">
            <Button>Ask a Question</Button>
          </Link>
          <Link to="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Questions</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Latest
          </Button>
          <Button variant="ghost" size="sm">
            Top
          </Button>
          <Button variant="ghost" size="sm">
            Unanswered
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {questions.map((question) => (
          <Link to={`/questions/${question.id}`} key={question.id} className="block">
            <Card className="h-full transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{question.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      {question.votes}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {question.answers}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">{question.content}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={question.authorImage || "/placeholder.svg"} alt={question.author} />
                      <AvatarFallback>{question.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{question.author}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {question.timePosted}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
