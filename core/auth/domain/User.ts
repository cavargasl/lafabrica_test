export interface IUser {
  id: string;
  email: string;
  name: string;
}
export interface IUserCreate {
  email: string;
  password: string;
  name: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}
