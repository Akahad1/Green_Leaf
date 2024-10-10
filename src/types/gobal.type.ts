export type TQureyParam = {
  name: string;
  value: string;
};
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  details: string;
  image: string;
  coverImage: string;
  passwordChange: boolean;
  favourite: [string];
  followers: [string];
  followed: [string];
  verified: boolean;
};
export type User = {
  data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user";
    address: string;
    details: string;
    image: string;
    coverImage: string;
    passwordChange: boolean;
    favourite: [string];
    followers: [string];
    followed: [string];
    verified: boolean;
  };
  mesages: string;
  success: boolean;
};

export type TPost = {
  _id: string;
  user: TUser;
  image: string;
  text: string;
  premium: boolean;
  upvote: number;
  downvote: number;
  createdAt: string;

  catagory: "Vegetables" | "Flowers" | "Herbs" | "Fruits";
};

export type Tcommet = {
  _id: string;
  user: TUser;
  post: TPost;
  text: string;
};
