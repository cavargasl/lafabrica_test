import { IUserData } from "./userData";

export interface IUserDataRepository {
  getUserData: (userId: string) => Promise<IUserData | null>;
  createUserData: (userData: Omit<IUserData, "id">) => Promise<IUserData>;
  updateUserData: ({userId, userData}: {userId: string, userData: Partial<IUserData>}) => Promise<void>;
}

