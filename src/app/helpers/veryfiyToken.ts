import { jwtDecode } from "jwt-decode";

export const veryfiyToken = (token: string) => {
  return jwtDecode(token);
};
