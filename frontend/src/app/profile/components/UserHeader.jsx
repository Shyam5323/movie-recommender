// Header.js
import React from "react";

const UserHeader = ({ category, setCategory, setShowPopup }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowPopup(true)}
      >
        Add {category}s
      </button>
      <div>
        <button
          className={`px-4 py-2 rounded ${
            category === "book" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCategory("book")}
        >
          Books
        </button>
        <button
          className={`px-4 py-2 rounded ${
            category === "movie" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCategory("movie")}
        >
          Movies
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
