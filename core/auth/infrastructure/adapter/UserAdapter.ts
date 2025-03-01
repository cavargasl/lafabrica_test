import { User } from "firebase/auth";
import { IUser } from "../../domain/User";

export const UserAdapter = (userDto: User): IUser => ({
  id: userDto.uid,
  email: userDto.email ?? "",
  name: userDto.displayName ?? "",
});