import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Terminal,
  Users,
  Award,
  Search,
  ImageIcon,
  Tag,
  CheckCircle,
  ArrowRight,
  ThumbsUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Welcome() {
  const isAuth = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevOverflow</span>
          </div>
          {isAuth ? (
           <div onClick={()=>{
            navigate("/profile")
           }} className="cursor-pointer">
             <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={user.fullName} />
              <AvatarFallback className="text-xs">
                {user.fullName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
           </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/50 py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Your Developer <span className="text-primary">Q&A</span> Community
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Get answers to your programming questions, share knowledge, and
              connect with developers from around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="gap-2">
                  Join the Community
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Browse Questions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">10K+</span>
                <span className="text-center text-sm text-muted-foreground">
                  Questions Asked
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">25K+</span>
                <span className="text-center text-sm text-muted-foreground">
                  Helpful Answers
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">5K+</span>
                <span className="text-center text-sm text-muted-foreground">
                  Active Users
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">95%</span>
                <span className="text-center text-sm text-muted-foreground">
                  Questions Answered
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold">Platform Features</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Everything you need to get answers and share knowledge with the
                developer community
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <CardTitle>Ask & Answer Questions</CardTitle>
                  <CardDescription>
                    Post your programming questions and get answers from
                    experienced developers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Detailed question formatting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Code syntax highlighting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Answer voting system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <CardTitle>Rich Media Support</CardTitle>
                  <CardDescription>
                    Enhance your questions and answers with images and visual
                    examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Image uploads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Drag and drop interface</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Screenshot sharing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>User Profiles</CardTitle>
                  <CardDescription>
                    Build your reputation and showcase your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Reputation system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Achievement badges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Contribution history</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Tag className="h-6 w-6" />
                  </div>
                  <CardTitle>Topic Tags</CardTitle>
                  <CardDescription>
                    Organize and discover questions by technology or topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Tag-based browsing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Follow specific tags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Personalized feed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search className="h-6 w-6" />
                  </div>
                  <CardTitle>Powerful Search</CardTitle>
                  <CardDescription>
                    Find solutions quickly with advanced search capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full-text search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Filter by tags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Sort by relevance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>Gamification</CardTitle>
                  <CardDescription>
                    Earn rewards for your valuable contributions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Reputation points</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Achievement badges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Leaderboards</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold">How It Works</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Getting started with DevOverflow is easy - follow these simple
                steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Create an Account
                </h3>
                <p className="text-muted-foreground">
                  Sign up for free and set up your developer profile with your
                  areas of expertise
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Ask or Answer</h3>
                <p className="text-muted-foreground">
                  Post your programming questions or help others by answering
                  their questions
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Build Reputation</h3>
                <p className="text-muted-foreground">
                  Earn reputation points and badges as you contribute valuable
                  content to the community
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Questions Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Questions</h2>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Question 1 */}
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">
                      How do I implement authentication in Next.js?
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        24
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Terminal className="h-4 w-4" />8
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">
                    I'm building a Next.js application and need to add user
                    authentication. What's the best approach?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">next.js</Badge>
                    <Badge variant="secondary">authentication</Badge>
                    <Badge variant="secondary">web-dev</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Question 2 */}
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">
                      What's the difference between useMemo and useCallback?
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        32
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Terminal className="h-4 w-4" />
                        12
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">
                    I'm confused about when to use useMemo vs useCallback in
                    React. Can someone explain?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">react</Badge>
                    <Badge variant="secondary">hooks</Badge>
                    <Badge variant="secondary">javascript</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Question 3 */}
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">
                      Best practices for responsive design in 2023?
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        18
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Terminal className="h-4 w-4" />6
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">
                    What are the current best practices for creating responsive
                    web designs in 2023?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">css</Badge>
                    <Badge variant="secondary">responsive-design</Badge>
                    <Badge variant="secondary">ui-ux</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold">What Our Users Say</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Join thousands of developers who have found solutions and shared
                knowledge on DevOverflow
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="/placeholder.svg?height=64&width=64"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="mb-4 text-center italic text-muted-foreground">
                    "DevOverflow helped me solve a complex React issue that had
                    been blocking my project for days. The community is
                    incredibly knowledgeable and supportive."
                  </p>
                  <div className="text-center">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Frontend Developer
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="/placeholder.svg?height=64&width=64"
                        alt="User"
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="mb-4 text-center italic text-muted-foreground">
                    "I've learned so much by answering questions on DevOverflow.
                    It's improved my coding skills and helped me build a
                    professional network in the industry."
                  </p>
                  <div className="text-center">
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="/placeholder.svg?height=64&width=64"
                        alt="User"
                      />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="mb-4 text-center italic text-muted-foreground">
                    "The reputation system on DevOverflow has helped me showcase
                    my expertise to potential employers. It's become an
                    essential part of my developer portfolio."
                  </p>
                  <div className="text-center">
                    <p className="font-semibold">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Backend Engineer
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to join our developer community?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl">
              Create your account today and start asking questions, sharing
              knowledge, and connecting with developers from around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Explore Questions
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DevOverflow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A community-driven Q&A platform for developers to ask questions,
                share knowledge, and build their careers.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Questions
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Tags
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Users
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Abouto
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-foreground">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} DevOverflow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
