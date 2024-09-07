export type UserPayload = {
  login: string;
  password: string;
  confirmPassword: string;
  isRemember: boolean;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  isRemember: boolean;
};

export type FilterQueryType = {
  from?: string;
  to?: string;
  depart?: string;
  flightClass?: string;
};
