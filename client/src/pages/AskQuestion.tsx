"use client";

import type React from "react";

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
import { ImageUpload } from "@/components/ImageUpload";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    console.log({
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      images,
    });
    toast("Event has been created");
    // alert("Question submitted successfully! (This is just a frontend demo)");
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. How do I center a div with Tailwind CSS?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Be specific and summarize your problem
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Details</Label>
              <Textarea
                id="content"
                placeholder="Explain your question in detail..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
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
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to describe what your question is about (comma
                separated)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Images (optional)</Label>
              <ImageUpload images={images} setImages={setImages} />
              <p className="text-xs text-muted-foreground">
                Add images to help explain your problem
              </p>
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
