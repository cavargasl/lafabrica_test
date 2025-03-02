import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@/core/shared/firebaseConfig";
import { IUserData } from "../domain/userData";
import { IUserDataRepository } from "../domain/userDataRepository";

export const FirestoreUserDataRepository: IUserDataRepository = {
  getUserData: async (userId: string) => {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userData = querySnapshot.docs[0].data() as IUserData;
    return userData;
  },
  createUserData: async (userData: Omit<IUserData, "id">) => {
    const userCollection = collection(db, "users");
    const newUserDoc = await addDoc(userCollection, { ...userData });

    return { ...userData, id: newUserDoc.id };
  },
  updateUserData: async (userData: IUserData) => {
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, userData.id);
    await updateDoc(userDoc, { ...userData });
    return userData;
  },
};
