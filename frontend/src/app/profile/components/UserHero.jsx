"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RecommendationForm from "@/app/dashboard/components/RecommendationForm";
import UserList from "./UserList";
import UserHeader from "./UserHeader";

export default function UserHero() {
  const [category, setCategory] = useState("book");
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  // Retrieve the token and userId from cookies
  const token = Cookies.get("movieToken");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchEntries = async () => {
      if (!token || !userId) {
        console.error("Token or User ID is missing.");
        return;
      }

      try {
        const endpoint =
          category === "book"
            ? `http://localhost:5000/api/v1/user/read_books/${userId}`
            : `http://localhost:5000/api/v1/user/watched_movies/${userId}`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const entriesKey = category === "book" ? "books" : "movies";
        console.log(response.data[entriesKey]);
        setEntries(response.data[entriesKey]);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, [category, token, userId]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <UserHeader
          category={category}
          setCategory={setCategory}
          setShowPopup={setShowPopup}
        />

        {/* List */}
        <UserList entries={entries} />

        {/* popup show */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Recommendation</h2>
              <RecommendationForm category={category} userOrRec={"user"} />
              <button onClick={closePopup} className="mt-4 text-red-500">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
