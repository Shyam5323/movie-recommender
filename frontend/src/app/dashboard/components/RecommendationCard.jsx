// components/RecommendationCard.js
import React from "react";

const RecommendationCard = ({
  title,
  authorOrDirector,
  genre,
  description,
  recommendedBy,
  whereToReadOrWatch,
  status,
  category,
}) => {
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
      </div>
    </div>
  );
};

export default RecommendationCard;
