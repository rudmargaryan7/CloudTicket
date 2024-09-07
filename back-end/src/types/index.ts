import "express";

export type UserType = {
  password: string;
  email: string;
  login: string;
  liked: string[];
  _id?: string;
  __v?: number;
};

declare module "express" {
  export interface Request {
    token?: string;
    user?: UserType;
  }
}
