// components/Hero.jsx
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import RecommendationForm from "./RecommendationForm.jsx";
import RecommendationList from "./RecommendationList.jsx";

export default function Hero() {
  const [category, setCategory] = useState("book");
  const [recommendations, setRecommendations] = useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const addRecommendation = (recommendation) => {
    setRecommendations([...recommendations, recommendation]);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = Cookies.get("movieToken");
      const endpoint = `http://localhost:5000/api/v1/${category}`;
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (category === "book") {
          setRecommendations(data.books);
        } else {
          setRecommendations(data.Movies);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [category]);

  return (
    <div className="min-h-screen bg-base-200 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-gray-400 rounded-xl p-10">
        <div className="flex justify-center mb-4">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="book">Book</option>
            <option value="movie">Movie</option>
          </select>
        </div>

        <div>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Add Book/Movie
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Recommendation</h2>
                <RecommendationForm
                  category={category}
                  addRecommendation={addRecommendation}
                />
                <button onClick={closeModal} className="mt-4 text-red-500">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <RecommendationList
          recommendations={recommendations}
          category={category}
          className="z-10"
        />
      </div>
    </div>
  );
}
