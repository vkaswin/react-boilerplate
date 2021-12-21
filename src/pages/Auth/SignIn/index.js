import React from "react";
import { useAuth, useRouter } from "hooks";

const SignIn = () => {
  const router = useRouter();

  const { setUser } = useAuth();

  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
};

export default SignIn;
