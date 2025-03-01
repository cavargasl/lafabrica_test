import { IUser, IUserCreate, IUserSignIn } from "./User";

export type IUserRepository = {
  createUserWithEmailAndPassword: (user: IUserCreate) => Promise<IUser>;
  signInWithEmailAndPassword: (user: IUserSignIn) => Promise<IUser>;
  signInWithGoogle: () => Promise<IUser>;
  getCurrentUser: () => Promise<IUser | null>;
  signOut: () => Promise<void>;
};
