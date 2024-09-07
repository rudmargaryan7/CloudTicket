import { UserType } from "../../types";

export const generatorError = (text: string): object => {
  return {
    error: {
      type: "error",
      text,
    },
  };
};

export const UserPayloadFunction = (user: UserType) => {
  return {
    login: user.login,
    email: user.email,
    liked: user.liked,
  };
};
