import { Button } from "@/components/ui/button";

import HomeCards from "@/components/HomeCards";

export default function Home() {

  // Mock data for questions
  const questions = [
    {
      id: 1,
      title: "How do I implement authentication in Next.js?",
      content:
        "I'm building a Next.js application and need to add user authentication. What's the best approach?",
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
      content:
        "I'm confused about when to use useMemo vs useCallback in React. Can someone explain?",
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
      content:
        "What are the current best practices for creating responsive web designs in 2023?",
      author: "Miguel Rodriguez",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "MR",
      tags: ["css", "responsive-design", "ui-ux"],
      votes: 18,
      answers: 6,
      timePosted: "1 day ago",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
    

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
          <HomeCards question={question}/>
        ))}
      </div>
    </main>
  );
}
