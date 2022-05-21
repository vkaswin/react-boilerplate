import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, PasswordInput, Button, CheckBox } from "components";
import { useCookies, useRouter } from "hooks";
import { toast } from "utils";

import "./SignIn.scss";

const SignIn = ({ auth: { setUser } }) => {
  const socialLoginIcons = [
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>,
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>,
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </>,
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { getCookie, setCookie, clearCookie } = useCookies();

  const router = useRouter();

  let [isRemember, setIsRemember] = useState(true);

  useEffect(() => {
    window.addEventListener("keyup", onEnter);
    let userName = getCookie("userName");
    let password = getCookie("password");
    setIsRemember(userName && password ? true : false);
    return () => {
      window.removeEventListener("keyup", onEnter);
    };
  }, []);

  const onSubmit = ({ email, password }) => {
    if (email === "admin@gmail.com" && password === "admin") {
      let user = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        role: "Admin",
      };
      reset({
        email: "",
        password: "",
      });
      setUser(user);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIn0.sKLB1PRu-CH3-1gt4rbN8WPr_xwv5G7kLKTwf344t9A";
      setCookie({ name: "authToken", value: token, days: 14 });
      router.push("/admin/dashboard");
      if (isRemember) {
        setCookie({ name: "userName", value: email, days: 30 });
        setCookie({ name: "password", value: password, days: 30 });
      } else {
        clearCookie("userName");
        clearCookie("password");
      }
      toast({ type: "success", message: "User logged in successfully" });
    } else {
      toast({ type: "error", message: "Invalid email and password" });
    }
  };

  const onEnter = ({ key }) => {
    if (key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleCheckbox = (event) => {
    const { checked } = event.target;
    setIsRemember(checked);
  };

  return (
    <div className="sign-in">
      <h2>Welcome to React! 👋</h2>
      <span className="sign-in-note">
        Please sign-in to your account and start the adventure
      </span>
      <div className="credential">
        <div>
          <b>Admin: </b>
          <span>admin@gmail.com | admin</span>
        </div>
        <i className="bi bi-question-circle"></i>
      </div>
      <Input
        label="Email"
        value={getCookie("userName") ?? ""}
        register={register("email", {
          required: true,
          pattern:
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        })}
        error={errors.email}
        message={{
          required: "Please enter email",
          pattern: "Invalid email id",
        }}
      />
      <PasswordInput
        label="Password"
        register={register("password", { required: true })}
        value={getCookie("password") ?? ""}
        error={errors.password}
        message={{ required: "Please enter password" }}
      />
      <div className="remember">
        <CheckBox
          label="Remember Me"
          name="isRemember"
          checked={isRemember}
          onChange={handleCheckbox}
        />
      </div>
      <Button
        label="Sign in"
        className="btn-signin"
        onClick={handleSubmit(onSubmit)}
      />
      <div className="create-account">
        <span>New on our platform? </span>
        <Link to="/auth/sign-up">
          <span>Create an account</span>
        </Link>
      </div>
      <div className="or">
        <div></div>
        <span>or</span>
        <div></div>
      </div>
      <div className="social-login">
        {socialLoginIcons.map((list, index) => {
          return (
            <button key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {list}
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SignIn;
