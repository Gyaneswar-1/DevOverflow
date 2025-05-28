export interface UserProfileInterface {
  id: string;
  email: string;
  fullName: string;
  userID: string;
  profileImage: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  isVerified: Boolean;
  isAdmin: Boolean;
  bio: string;
  city: string;
  country: string;
}

export interface QuestionDetailInterface {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  images: [
    {
      url: string;
    }
  ];
  upvote: number;
  createdBy: {
    id: string;
    fullName: string;
    profileImage: Images;
  };
  _count: {
    answers: number;
  };
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

export interface QuestionInterface {
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
  upvote: number;
  _count: {
    answers: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
}
