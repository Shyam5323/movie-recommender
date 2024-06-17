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
      <div className="max-w-4xl mx-auto">
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
        <div className="h-32 overflow-scroll">
          <RecommendationForm
            category={category}
            addRecommendation={addRecommendation}
          />
        </div>
        <RecommendationList
          recommendations={recommendations}
          category={category}
        />
      </div>
    </div>
  );
}
