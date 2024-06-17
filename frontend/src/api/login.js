"use server";

import axios from "axios";

export default async function LoginUser(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return;
  }
}
