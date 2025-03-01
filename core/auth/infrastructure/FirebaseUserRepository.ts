import { auth } from "@/core/shared/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { IUserRepository } from "../domain/UserRepository";
import { UserAdapter } from "./adapter/UserAdapter";

export const FirebaseUserRepository = (): IUserRepository => ({
  createUserWithEmailAndPassword: async (user) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    await updateProfile(userCredential.user, {
      displayName: user.name,
    });
    return UserAdapter(userCredential.user);
  },
  signInWithEmailAndPassword: async (user) => {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    return UserAdapter(userCredential.user);
  },
  signInWithGoogle: async () => {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    return UserAdapter(userCredential.user);
  },
  getCurrentUser: async () => {
    const user = auth.currentUser;
    if (user) return UserAdapter(user);
    
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user ? UserAdapter(user) : null);
      });
    });
  },
  signOut: async () => {
    await signOut(auth);
  },
});
