
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { questionSchema } from "@/validation/question.validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQuestion } from "@/service/submitQuestion.service";

export default function AskQuestion() {
  type QuestionSchemaType = z.infer<typeof questionSchema>;
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const onSubmit = (data: QuestionSchemaType) => {
    // In a real app, this would submit to a backend
    console.log(data, images);
    submitQuestion(data, images[0])
    
    toast("Question has been created");
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <Link 
        to="/"
        className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Questions
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a Question</CardTitle>
          <CardDescription>
            Be specific and imagine you're asking a question to another person
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. How do I center a div with Tailwind CSS?"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Be specific and summarize your problem
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Details</Label>
              <Textarea
                id="description"
                placeholder="Explain your question in detail..."
                className="min-h-[200px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Include all the information someone would need to answer your
                question
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="e.g. javascript,react,tailwind"
                {...register("tags")}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to describe what your question is about (comma
                separated)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImages([files[0]]);
                  }
                }}
              />
            </div>

            <Button type="submit" className="w-full">
              Post Your Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
