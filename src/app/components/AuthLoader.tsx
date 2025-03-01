"use client";
import { UserService } from "@/core/auth/application/UserService";
import { FirebaseUserRepository } from "@/core/auth/infrastructure/FirebaseUserRepository";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userService = UserService(FirebaseUserRepository());
      const currentUser = await userService.getCurrentUser();
      if (currentUser) {
        dispatch(setUser(currentUser));
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
}
