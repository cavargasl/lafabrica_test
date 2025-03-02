"use client";
import { setUser } from "@/store/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      dispatch(
        setUser({
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.firstName + " " + user.lastName,
        })
      );
    }
  }, [isLoaded, user, dispatch]);

  return null;
}
