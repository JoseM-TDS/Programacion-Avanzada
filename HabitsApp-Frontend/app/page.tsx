'use client';
import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { RootState, AppDispatch } from "@/Redux/store";
import Habits from "./habits";
import { fetchRegisterUserThunk, fetchLoginUserThunk, addUser } from "@/features/users/userSlice";
import { getCookie } from "cookies-next"

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const user = useSelector((state: RootState) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    const token = getCookie('habitToken');
    if(token){
      dispatch(addUser(token));
    }
    if(user){
      dispatch(fetchHabitsThunk(user.toString()));
    }
  }, [dispatch, user]);

  const handleLogin = () => {
    dispatch(fetchLoginUserThunk({ username, password }));
  };

  const handleRegister = () => {
    dispatch(fetchRegisterUserThunk({ username, password }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20 font-sans bg-gray-100">
      
    </div>
  );
 }
