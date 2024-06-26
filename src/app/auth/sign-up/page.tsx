"use client";

import { signIn } from "next-auth/react";
import AuthLayout from "../authLayout";
import AuthInput from "../ui/AuthInput";
import GithubButton from "../ui/GithubButton";
import GoogleButton from "../ui/GoogleButton";
import CredentialsButton from "../ui/CredentialsButton";
import { useRef } from "react";
import { navigate } from "@/utils/navigation";
import Link from "next/link";
import { createUser } from "@/frontend/services/createUser";

export default function SignIn() {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let repeatPasswordRef = useRef<HTMLInputElement>(null);
  let isAdminRef = useRef<HTMLInputElement>(null);

  const onCredentialsSignUp = () => {
    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !repeatPasswordRef.current?.value
    ) {
      alert("no data");
      return;
    }
    
    const isAdmin = isAdminRef.current?.checked ? true : false;
    createUser(emailRef.current.value, passwordRef.current.value, isAdmin).then(() =>
      navigate("/auth/sign-in")
    );
  };

  const onGithubSignIn = () => {
    signIn("github")
      .then(() => navigate("/my-courses"))
      .catch((err) => alert(err));
  };

  const onGoogleSignIn = () => {};

  return (
    <AuthLayout>
      <h1 className="text-center text-5xl">Sign up</h1>
      <Link href="/auth/sign-in" className="text-accent">
        or log in
      </Link>
      <small>Email</small>
      <AuthInput ref={emailRef} placeholder="Email" />
      <small>Password</small>
      <AuthInput ref={passwordRef} placeholder="Password" />
      <small>Repeat password</small>
      <AuthInput ref={repeatPasswordRef} placeholder="Repeat password" />
      <div className="flex flex-row gap-2">
        <small>Is admin?</small>
        <input ref={isAdminRef} type="checkbox"/>
      </div>
      <CredentialsButton onClick={onCredentialsSignUp}>
        Sign up
      </CredentialsButton>
      <GoogleButton>Sign up with Google</GoogleButton>
      <GithubButton onClick={onGithubSignIn}>Sign up with Github</GithubButton>
    </AuthLayout>
  );
}
