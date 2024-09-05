// components/TopBar.js
"use client";
import LogoutButton from "@/components/LogoutButton";
import React, { useState } from "react";

export default function TopBar({ onCategoryChange, onRefresh }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-base-100 shadow-md w-full">
      <div className="flex space-x-4 items-center">
        <h1 className="text-xl font-bold">Book/Movie Recommendation</h1>
        <select
          className="select select-bordered"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">Show All</option>
          <option value="movies">Movies</option>
          <option value="books">Books</option>
        </select>
      </div>
      <button onClick={handleRefresh} className="btn btn-secondary">
        Refresh
      </button>

      <LogoutButton />
    </div>
  );
}
