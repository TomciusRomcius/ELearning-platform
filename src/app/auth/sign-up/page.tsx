"use client"

import { createUser } from "@/services/createUser";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function SignUp() {
  let usernameRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    if (!usernameRef.current?.value || !passwordRef.current?.value)
      return;
    createUser(usernameRef.current.value, passwordRef.current.value);
  }

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