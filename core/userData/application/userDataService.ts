import { IUserDataRepository } from "../domain/userDataRepository";

export const UserDataService = (
  repository: IUserDataRepository
): IUserDataRepository => ({
  getUserData: async (userId) => {
    const userData = await repository.getUserData(userId);
    return userData;
  },
  createUserData: async (userId) => {
    const userData = await repository.createUserData(userId);
    return userData;
  },
  updateUserData: async (userData) => {
    const updatedUserData = await repository.updateUserData(userData);
    return updatedUserData;
  },
});
