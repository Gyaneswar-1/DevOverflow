export interface UserProfileInterface {
  id: string;
  email: string;
  fullName: string;
  userID: string;
  profileImage: Images;
  createdAt: string;
  updatedAt: string;
  isVerified: Boolean;
  isAdmin: Boolean;
  bio: string;
  city: string;
  country: string;
}

export interface signUpInterface {
  email: string;
  password: string;
}

export interface signInInterface {
  fullName?: string;
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


export interface AuthState {
  isAuthenticated: boolean;
}
