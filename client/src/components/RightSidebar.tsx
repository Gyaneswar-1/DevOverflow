import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Terminal, TrendingUp, Award } from "lucide-react"
import { Link } from "react-router-dom"

export function RightSidebar() {

  // Mock data for top questions
  const topQuestions = [
    {
      id: 1,
      title: "How to optimize React performance with large datasets?",
      votes: 156,
      answers: 23,
      author: "John Doe",
      authorUsername: "johndoe",
      authorImage: "/placeholder.svg?height=24&width=24",
      authorInitials: "JD",
      tags: ["react", "performance"],
      timePosted: "2 days ago",
    },
    {
      id: 2,
      title: "Best practices for TypeScript in large applications",
      votes: 142,
      answers: 18,
      author: "Jane Smith",
      authorUsername: "janesmith",
      authorImage: "/placeholder.svg?height=24&width=24",
      authorInitials: "JS",
      tags: ["typescript", "architecture"],
      timePosted: "3 days ago",
    },
    {
      id: 3,
      title: "Understanding async/await vs Promises in JavaScript",
      votes: 134,
      answers: 31,
      author: "Mike Johnson",
      authorUsername: "mikejohnson",
      authorImage: "/placeholder.svg?height=24&width=24",
      authorInitials: "MJ",
      tags: ["javascript", "async"],
      timePosted: "1 week ago",
    },

  ]



  // Mock data for trending topics
  const trendingTopics = [
    { name: "AI/ML", growth: "+25%" },
    { name: "Web3", growth: "+18%" },
    { name: "React 18", growth: "+15%" },
    { name: "TypeScript", growth: "+12%" },
  ]

  // Mock data for top contributors
  const topContributors = [
    {
      name: "Alex Chen",
      username: "alexchen",
      reputation: 4250,
      image: "/placeholder.svg?height=32&width=32",
      initials: "AC",
    },
    {
      name: "Sarah Johnson",
      username: "sarahjohnson",
      reputation: 3890,
      image: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    {
      name: "Mike Rodriguez",
      username: "mikerodriguez",
      reputation: 3654,
      image: "/placeholder.svg?height=32&width=32",
      initials: "MR",
    },
  ]

  return (
    <aside className="hidden w-80 space-y-6 xl:block">
      <div className="sticky top-20 space-y-6">
        {/* Top Questions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Top Questions</CardTitle>
            <CardDescription>Most upvoted questions this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topQuestions.slice(0, 3).map((question) => (
              <div key={question.id} className="space-y-2 border-b pb-4 last:border-b-0 last:pb-0">
                <Link to={`/questions/${question.id}`} className="block">
                  <h4 className="text-sm font-medium leading-tight hover:text-primary">{question.title}</h4>
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {question.votes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Terminal className="h-3 w-3" />
                    {question.answers}
                  </span>
                  <span>•</span>
                  <span>{question.timePosted}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {question.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/users/${question.authorUsername}`} className="flex items-center gap-1">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={question.authorImage || "/placeholder.svg"} alt={question.author} />
                      <AvatarFallback className="text-xs">{question.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{question.author}</span>
                  </Link>
                </div>
              </div>
            ))}

          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic) => (
              <div key={topic.name} className="flex items-center justify-between">
                <Badge variant="outline">{topic.name}</Badge>
                <span className="text-xs font-medium text-green-600">{topic.growth}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-4 w-4" />
              Top Contributors
            </CardTitle>
            <CardDescription>This week's most helpful users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topContributors.map((contributor, index) => (
              <Link key={contributor.username} to={`/users/${contributor.username}`} className="block">
                <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contributor.image || "/placeholder.svg"} alt={contributor.name} />
                    <AvatarFallback className="text-xs">{contributor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contributor.name}</p>
                    <p className="text-xs text-muted-foreground">{contributor.reputation.toLocaleString()} rep</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Be respectful and constructive</p>
            <p>• Search before asking</p>
            <p>• Provide clear examples</p>
            <p>• Accept helpful answers</p>
            <Link to="/guidelines">
              <Button variant="link" className="h-auto p-0 text-xs">
                Read full guidelines →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
