
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Terminal, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full  ring-2 ring-red-700 bg-red-50">
            <span className="text-2xl font-bold  text-red-950">404</span>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 flex flex-col gap-2">
            <Link to="/">
              <Button className="w-full gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>

            <Link to="/ask">
              <Button variant="outline" className="w-full gap-2">
                <Terminal className="h-4 w-4" />
                Ask a Question
              </Button>
            </Link>

            <Button variant="ghost" className="w-full gap-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Need help? Try searching for what you're looking for or browse our popular questions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
