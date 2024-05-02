"use client"

import axios from "axios";
import { useEffect, useRef } from "react";

export default function SignUp() {
  let usernameRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    if (!usernameRef.current?.value || !passwordRef.current?.value)
      return;
    axios.post("/api/sign-up", {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
  }

  useEffect(() => {
    axios.get("/api/sign-up")
      .then((users) => {
        console.log(users);
      })
  }, []);
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4">
        <input ref={usernameRef} placeholder="username"/>
        <input ref={passwordRef} placeholder="password"/>
        <button onClick={handleSignUp}>Sign up</button>
      </div>
    </main>
  )
}