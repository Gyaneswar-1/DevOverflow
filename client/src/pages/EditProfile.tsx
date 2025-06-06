import type React from "react";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { userProfileSchema } from "@/validation/userProfile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { editProfileService } from "@/service/EditProfile.service";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer);

  type UserProfileSchema = z.infer<typeof userProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: user.fullName || "",
      userID: user.userID || "",
      email: user.email || "",
      bio: user.bio || "",
      city: user.city || "",
      country: user.country || "",
    },
  });

  console.log("user", user);
  console.log("form errors", errors);

  const [profileImage, setProfileImage] = useState<string | null>(
    user.profileImage?.url || ""
  );

  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleForm: SubmitHandler<UserProfileSchema> = async (data) => {
    setIsUploading(true);
    
    try {
      const { fullName, userID, email, bio, city, country } = data;

      const formData = new FormData();
      
      if (fullName) formData.append('fullName', fullName);
      if (userID) formData.append('userID', userID);
      if (email) formData.append('email', email);
      if (bio) formData.append('bio', bio);
      if (city) formData.append('city', city);
      if (country) formData.append('country', country);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const result = await editProfileService(formData);
      
      if (result.success) {
        toast.success(result.message);
        navigate("/profile");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("IMAGE FILEEEEE", file);
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setSelectedFile(file);
      setValue("profilePicture", file); 
    }
  };

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
          <CardDescription>
            Update your personal information and profile settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ">
                  <AvatarImage
                    src={profileImage || user.profileImage?.url}
                    alt={user.fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
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
                    {...register("profilePicture", {
                      onChange: handleImageChange,
                    })}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : "Upload a new profile picture"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("fullName")}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("userID")}
                className={errors.userID ? "border-red-500" : ""}
              />
              {errors.userID && (
                <p className="text-sm text-red-500">{errors.userID.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                rows={4}
                className={errors.bio ? "border-red-500" : ""}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Brief description about yourself that will appear on your
                profile
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("city")}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  {...register("country")}
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-red-500">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}