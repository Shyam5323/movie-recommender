import React, { useState } from "react";
import CommentBox from "@/components/CommentBox";
import Cookies from "js-cookie";

const currentUser = {
  userId: Cookies.get("userId"),
};

const RecommendationCard = ({
  _id,
  title,
  authorOrDirector,
  genre,
  description,
  recommendedBy,
  whereToReadOrWatch,
  status,
  category,
  createdBy,
}) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  // Function to delete
  const onDelete = async (id, category) => {
    const token = Cookies.get("movieToken");

    const response = await fetch(
      `http://localhost:5000/api/v1/${category}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      alert("Recommendation deleted successfully");
      // Implement logic to update the UI after deletion
    } else {
      alert("Failed to delete recommendation");
    }
  };

  const openCommentBox = () => setIsCommentBoxOpen(true);
  const closeCommentBox = () => setIsCommentBoxOpen(false);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          <strong>{category === "book" ? "Author" : "Director"}:</strong>{" "}
          {authorOrDirector}
        </p>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Recommended By:</strong> {recommendedBy}
        </p>
        <p>
          <strong>
            {category === "book" ? "Where to Read" : "Where to Watch"}:
          </strong>{" "}
          {whereToReadOrWatch}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        {/* Show delete button only to the user who created the recommendation */}
        {currentUser.userId === createdBy && (
          <button
            onClick={() => onDelete(_id, category)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
        <button
          onClick={openCommentBox}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Comment
        </button>

        {/* CommentBox Modal */}
        {isCommentBoxOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Comments</h2>
              <CommentBox
                recommendationId={_id}
                category={category}
                currentUser={currentUser}
              />
              <button
                onClick={closeCommentBox}
                className="mt-4 text-red-500 hover:text-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
