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

export interface UserStateInterface extends UserProfileInterface {
  isLoading: boolean;
  isError: boolean;
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
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  createdBy: {
    id: string;
    fullName: string;
    profileImage: string;
  };
  answers: number;
}

export interface QuestionState extends Question {
  isLoading: boolean;
  isError: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
}
