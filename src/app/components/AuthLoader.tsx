"use client";
import { UserDataService } from "@/core/userData/application/userDataService";
import { FirestoreUserDataRepository } from "@/core/userData/infrastructure/FirestoreUserDataRepository";
import { setUser } from "@/store/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AuthLoader() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchFolders = async () => {
      const userDataService = UserDataService(FirestoreUserDataRepository);
      if (isLoaded && user) {
        try {
          const userData = await userDataService.getUserData(user.id);
          if (userData) {
            dispatch(setUser(userData));
          } else {
            const newUserData = await userDataService.createUserData({
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.firstName + " " + user.lastName,
              folders: [],
            });
            dispatch(setUser(newUserData));
          }
        } catch (error) {
          console.error("Error fetching folders: ", error);
          toast.error("Error fetching data");
        }
      }
    };

    fetchFolders();
  }, [isLoaded, user, dispatch]);

  return null;
}
