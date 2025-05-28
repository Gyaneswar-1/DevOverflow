
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Users, MessageCircle, Tag, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function LeftSidebar() {
  // Mock data for popular tags
  const popularTags = [
    { name: "javascript", count: 1250, trending: true },
    { name: "react", count: 980, trending: true },
    { name: "next.js", count: 756, trending: false },
    { name: "typescript", count: 642, trending: true },
    { name: "node.js", count: 534, trending: false },
    { name: "css", count: 489, trending: false },
    { name: "python", count: 423, trending: false },
    { name: "html", count: 398, trending: false },
    { name: "tailwind", count: 287, trending: true },
    { name: "api", count: 245, trending: false },
  ]

  // Mock community stats
  const stats = {
    totalQuestions: 12450,
    totalAnswers: 28930,
    totalUsers: 5680,
    questionsToday: 47,
  }

  return (
    <aside className="hidden w-64 space-y-6 lg:block">
      <div className="sticky top-20 space-y-6">
        {/* Community Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Community Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalQuestions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalAnswers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Answers</div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.questionsToday}</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Tags */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Popular Tags</CardTitle>
              <Link to="/tags">
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Most discussed topics this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularTags.slice(0, 8).map((tag) => (
              <Link key={tag.name} to={`/tags/${tag.name}`} className="block">
                <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                    {tag.trending && <TrendingUp className="h-3 w-3 text-green-500" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{tag.count}</span>
                </div>
              </Link>
            ))}
            <Link to="/tags">
              <Button variant="outline" size="sm" className="w-full">
                View All Tags
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/ask">
              <Button className="w-full justify-start gap-2" size="sm">
                <MessageCircle className="h-4 w-4" />
                Ask a Question
              </Button>
            </Link>
            <Link to="/users">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Users className="h-4 w-4" />
                Browse Users
              </Button>
            </Link>
            <Link to="/tags">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Tag className="h-4 w-4" />
                Explore Tags
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">15 new questions today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">42 answers posted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-muted-foreground">8 new users joined</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-muted-foreground">23 badges earned</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
