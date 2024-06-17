"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import LoginUser from "@/api/login";
import { useRouter } from "next/navigation";
import { Satisfy } from "next/font/google";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await LoginUser(email, password);
    if (response) {
      Cookies.set("movieToken", response.token, { expires: 7 });
      router.push("./dashboard");
    } else {
      alert("login failed, Try again later");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-around items-center border-2 h-full">
        <div className="flex flex-col justify-center items-center">
          <h2 className={`my-10 ${satisfy.className}`}>Website Name</h2>
          <h2>Welcome to website</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col gap-10"
        >
          <div className="form-group flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group  flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <button className="btn btn-active btn-neutral" type="submit">
              Login
            </button>
          )}
        </form>

        <div className="text-sm font-light flex gap-2">
          Don't have an account?
          <span className="text-sm underline">
            <Link href="./register">Create Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
