export interface UserProfileInterface {
  id: String;
  email: String;
  fullName: String;
  userID: String;
  profileImage: Images;
  createdAt: String;
  updatedAt: String;
  isVerified: Boolean;
  isAdmin: Boolean;
}

export interface signUpInterface {
  email: string;
  password: string;
}

export interface signInInterface {
  fullName: string;
  userID: string;
  email: string;
  password: string;
}

export interface Images {
  fileId: string;
  url: string;
}

export interface Question {
  title: string;
  description: string;
  tags: string[];
}
