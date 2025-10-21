"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/slices/user.slice";
import { User } from "@supabase/supabase-js";
//! SSR dan gelen user bilgilerini redux a hydryt et.
export default function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) dispatch(setUser(user));
    else dispatch(clearUser());
  }, [user, dispatch]);
  return <>{children}</>;
}
