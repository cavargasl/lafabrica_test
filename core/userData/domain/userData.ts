export interface IUserData {
  userId: string;
  name: string;
  email: string;
  folders: IFolder[];
}

export interface IFolder {
  id: string;
  name: string;
}
