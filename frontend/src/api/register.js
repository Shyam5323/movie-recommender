import axios from "axios";
import { createSession } from "./session";
import { redirect } from "next/navigation";

export default async function RegisterUser(name, email, password) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      { name, email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return;
  }
}
