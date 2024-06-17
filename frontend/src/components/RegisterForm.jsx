"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import RegisterUser from "@/api/register";
import { useRouter } from "next/navigation";
import { Satisfy } from "next/font/google";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await RegisterUser(name, email, password);
    if (response) {
      Cookies.set("movieToken", response.token, { expires: 7 });
      router.push("./dashboard");
    } else {
      alert("Registration failed, Try again later");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-around items-center border-2 h-full">
        <div className="flex flex-col justify-center items-center">
          <h2 className={`my-10 ${satisfy.className}`}>Website Name</h2>
          <h2>Welcome to the website</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col gap-10"
        >
          <div className="form-group flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group flex flex-col">
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
              Sign Up
            </button>
          )}
        </form>

        <div className="text-sm font-light flex gap-2">
          Already have an account?
          <span className="text-sm underline">
            <Link href="./login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
