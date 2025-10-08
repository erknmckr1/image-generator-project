"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/slices/user.slice";

//! SSR dan gelen user bilgilerini redux a hydryt et.
export default function UserProvider({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    if (user) dispatch(setUser(user));
    else dispatch(clearUser());
  }, [user, dispatch]);

  return <>{children}</>;
}
