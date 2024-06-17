"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("movieToken");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-4 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
