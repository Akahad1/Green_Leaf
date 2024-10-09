export type TQureyParam = {
  name: string;
  value: string;
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
