"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  maxImages?: number;
}

export function ImageUpload({
  images,
  setImages,
  maxImages = 1,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      images.length < maxImages
    ) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      images.length < maxImages
    ) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      if (
        file.type.startsWith("image/") &&
        images.length + newImages.length < maxImages
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (
              newImages.length ===
              Math.min(files.length, maxImages - images.length)
            ) {
              setImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="mb-1 text-sm font-medium">Drag & drop images here</p>
        <p className="mb-4 text-xs text-muted-foreground">
          PNG, JPG or GIF (max. {maxImages} images)
        </p>

        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
          disabled={images.length >= maxImages}
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            disabled={images.length >= maxImages}
          >
            Select Files
          </Button>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative h-[120px] overflow-hidden rounded-md border"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
