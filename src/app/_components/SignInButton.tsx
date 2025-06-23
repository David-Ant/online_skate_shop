"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { AnimatedButton } from "./AnimatedButton";

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <AnimatedButton onClick={() => signOut()}>
            Sign out
          </AnimatedButton>
        </div>
      ) : (
        <AnimatedButton onClick={() => signIn("google")}>
          Sign in
        </AnimatedButton>
      )}
    </div>
  );
}