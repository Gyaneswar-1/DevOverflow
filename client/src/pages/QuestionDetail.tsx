import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getQuestionByID } from "@/service/getQuestionByID";
import type { QuestionDetailInterface } from "@/types/ObjectTypes";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/Loader";

export default function QuestionDetail() {
  const [answer, setAnswer] = useState("");
  const [Question, setQuestion] = useState<QuestionDetailInterface>();
  const [images, setImages] = useState<string[]>([]);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function QuestionID() {
      try {
        const response = await getQuestionByID(id!);
        if (response.success) {
          setQuestion(response.data!);
          console.log("Question data:", response.data);
          
        }
      } catch {}
    }
    QuestionID();
  }, []);

  // Mock data for a question

  // Mock data for answers
  const answers = [
    {
      id: 1,
      content:
        "I would recommend using NextAuth.js. It's specifically designed for Next.js and provides a lot of functionality out of the box. It supports many authentication providers and is well-maintained. Here's a basic example of how to set it up...",
      author: "Alex Chen",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "AC",
      authorReputation: 3420,
      votes: 15,
      timePosted: "1 hour ago",
      isAccepted: true,
      images: [],
    },
    {
      id: 2,
      content:
        "Auth0 is another great option if you need a more comprehensive solution. It provides additional features like user management, multi-factor authentication, and more. The integration with Next.js is straightforward...",
      author: "Miguel Rodriguez",
      authorImage: "/placeholder.svg?height=40&width=40",
      authorInitials: "MR",
      authorReputation: 2180,
      votes: 8,
      timePosted: "45 minutes ago",
      isAccepted: false,
      images: ["/placeholder.svg?height=200&width=400"],
    },
  ];

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    console.log({ answer, images, questionId: id });
    alert("Answer submitted successfully! (This is just a frontend demo)");
    setAnswer("");
    setImages([]);
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        to="/"
        className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Questions
      </Link>

      {Question ? (
        <Card className="mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{Question.title}</h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">{Question.upvote || 0}</span>
                  <Button variant="ghost" size="icon">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      Question.createdBy.profileImage?.url || "/placeholder.svg"
                    }
                    alt={Question.createdBy.fullName}
                  />
                  <AvatarFallback>
                    {Question.createdBy.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{Question.createdBy.fullName}</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {`Posted ${formatDistanceToNow(new Date(Question.createdAt), {
                  addSuffix: true,
                })}`}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="whitespace-pre-line">{Question.description}</p>

            {Question.images && Question.images.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {Question.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[200px] overflow-hidden rounded-md border"
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Question image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ):(
        <div className="flex items-center justify-center mb-8 w-full">
          <Loader />
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Highest Votes
          </Button>
          <Button variant="ghost" size="sm">
            Newest
          </Button>
        </div>
      </div>

      {answers.map((answer) => (
        <Card key={answer.id} className="mb-6 border-l-4 border-l-primary">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div className="flex items-center gap-2 text-sm">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={answer.authorImage || "/placeholder.svg"}
                  alt={answer.author}
                />
                <AvatarFallback>{answer.authorInitials}</AvatarFallback>
              </Avatar>
              <span>{answer.author}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {answer.authorReputation.toLocaleString()} rep
              </span>
              {answer.isAccepted && (
                <Badge
                  variant="default"
                  className="flex items-center gap-1 bg-green-100 text-green-800"
                >
                  <CheckCircle className="h-3 w-3" />
                  Accepted
                </Badge>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {answer.timePosted}
            </span>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="whitespace-pre-line">{answer.content}</p>

            {answer.images.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {answer.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[200px] overflow-hidden rounded-md border"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Answer image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-1 h-4 w-4" />
                {answer.votes}
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Answer</h2>

        {!showAnswerForm ? (
          <div className="flex justify-center">
            <Button onClick={() => setShowAnswerForm(true)} size="lg">
              Write an Answer
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitAnswer} className="space-y-6">
            <Textarea
              placeholder="Write your answer here..."
              className="min-h-[200px]"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Images (optional)</p>
              <ImageUpload images={images} setImages={setImages} />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAnswerForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Post Your Answer</Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
