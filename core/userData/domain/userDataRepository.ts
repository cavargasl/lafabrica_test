import { IUserData } from "./userData";

export interface IUserDataRepository {
  getUserData: (userId: string) => Promise<IUserData | null>;
  createUserData: (userData: Omit<IUserData, "id">) => Promise<IUserData>;
  updateUserData: (userData: IUserData) => Promise<IUserData>;
}

