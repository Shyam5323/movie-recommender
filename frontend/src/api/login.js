"use server";

import axios from "axios";

export default async function LoginUser(email, password) {
  try {
    const response = await axios.post(
      "https://movie-recommender-jrka.onrender.com/api/v1/auth/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return;
  }
}
