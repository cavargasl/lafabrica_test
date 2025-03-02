import {
  collection,
  db,
  doc,
  getDocs,
  query,
  setDoc,
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
  createUserData: async (userData: IUserData) => {
    const userCollection = collection(db, "users");
    const userDocRef = await doc(userCollection, userData.userId);
    await setDoc(userDocRef, { ...userData });
    return { ...userData };
  },
  updateUserData: async (userData: IUserData) => {
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, userData.userId);
    await updateDoc(userDoc, { ...userData });
    return userData;
  },
};
