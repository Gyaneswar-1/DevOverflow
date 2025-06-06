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
    profileImage: {
      url: string;
    };
  };
  upvote: number;
  _count: {
    answers: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface userAnswerInterface {
  id: string;
  content: string;
  upvote: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface answerInterface {
  downvote: number;
  createdBy: {
    id: string;
    fullName: string;
    profileImage: {};
  };
}

//  {
//             "id": "ea5825e4-9f5c-45bd-8ed9-8fc9325d8d0d", //
//             "content": "You can help yourself 🤞 ",  //
//             "createdAt": "2025-06-03T14:32:36.453Z", //
//             "upvote": 0, //
//             "downvote": 0,
//             "isAccepted": false, //
//             "createdBy": {
//                 "id": "12b5976f-cd2e-45b1-a299-7146bc444f45",
//                 "fullName": "Gyaneswar",
//                 "profileImage": {
//                     "id": "36b7766c-b704-4749-96b7-43b04e3adcd3",
//                     "url": "https://ik.imagekit.io/yhbo0zn8m/sukuna-electric-5120x2880-22504_Ni3dVtm_K.jpg",
//                     "fileId": "683d3917b13a102537cec315",
//                     "questionId": null,
//                     "createdAt": "2025-06-02T05:39:38.018Z"
//                 }
//             }
//         }
