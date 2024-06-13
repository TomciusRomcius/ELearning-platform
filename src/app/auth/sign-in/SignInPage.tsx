"use client"

import { signIn } from "next-auth/react";
import AuthLayout from "../authLayout";
import AuthInput from "../ui/AuthInput";
import GithubButton from "../ui/GithubButton";
import GoogleButton from "../ui/GoogleButton";
import CredentialsButton from "../ui/CredentialsButton";
import { useRef } from "react";
import { navigate } from "@/utils/navigation";
import Link from "next/link";

export default function SignIn() {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const onCredentialsSignIn = () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert("no data");
      return;
    }

    signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current?.value,
    });
  }

  const onGithubSignIn = () => {
    signIn("github")
    .then(() => navigate("/my-courses"))
    .catch((err) => alert(err));
  }

  const onGoogleSignIn = () => {

  }


  return (
    <AuthLayout>
      <h1 className="text-center text-5xl">Sign in</h1>
      <Link href="/auth/sign-up" className="text-accent">or create an account</Link>
      <small>Email</small>
      <AuthInput ref={emailRef} placeholder="Email" />
      <small>Password</small>
      <AuthInput ref={passwordRef} placeholder="Password" />
      <CredentialsButton onClick={onCredentialsSignIn}>Sign in</CredentialsButton>
      <GoogleButton>Sign in with Google</GoogleButton>
      <GithubButton onClick={onGithubSignIn}>Sign in with Github</GithubButton>
    </AuthLayout>
  );
}
