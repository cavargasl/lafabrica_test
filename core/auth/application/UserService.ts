import { IUserCreate, IUserSignIn } from "../domain/User";
import { IUserRepository } from "../domain/UserRepository";

export const UserService = (repository: IUserRepository): IUserRepository => ({
  createUserWithEmailAndPassword: async (user: IUserCreate) => await repository.createUserWithEmailAndPassword(user),
  signInWithEmailAndPassword: async (user: IUserSignIn) => await repository.signInWithEmailAndPassword(user),
  signInWithGoogle: async () => await repository.signInWithGoogle(),
});
