"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Upload } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function EditProfile() {
  const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.userReducer);
console.log("user", user);


  // Mock user data - in a real app this would be fetched from the backend
  // const [user, setUser] = useState({
  //   name: "Alex Chen",
  //   username: "alexchen",
  //   image: "/placeholder.svg?height=100&width=100",
  //   initials: "AC",
  //   bio: "Full-stack developer with 5 years of experience. Passionate about React, Next.js, and TypeScript.",
  //   location: "San Francisco, CA",
  //   website: "https://alexchen.dev",
  //   email: "alex@example.com",
  // })

  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage?.url || "")
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        setIsUploading(true)
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result as string)
            setIsUploading(false)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = e.target
    // setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a backend
    const updatedUser = { ...user, image: profileImage || user.profileImage.url }
    console.log("Updated user:", updatedUser)
    alert("Profile updated successfully! (This is just a frontend demo)")
    navigate("/profile")
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/profile"
        className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Profile
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>Update your personal information and profile settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage || user.profileImage?.url} alt={user.fullName} />
                  <AvatarFallback className="text-2xl">{user.fullName.slice(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                      <Upload className="h-4 w-4" />
                    </div>
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : "Upload a new profile picture"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={user.fullName} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={user.userID} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={user.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={user.bio} onChange={handleChange} rows={4} />
              <p className="text-xs text-muted-foreground">
                Brief description about yourself that will appear on your profile
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={user.city} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Country</Label>
                <Input id="website" name="website" type="text" value={user.country} onChange={handleChange} />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

