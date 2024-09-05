import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CommentBox = ({ recommendationId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = Cookies.get("movieToken");
        const response = await fetch(
          `https://movie-recommender-jrka.onrender.com/api/v1/book/${recommendationId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [recommendationId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const token = Cookies.get("movieToken");
      const response = await fetch(
        `https://movie-recommender-jrka.onrender.com/api/v1/book/${recommendationId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (response.ok) {
        const postedComment = await response.json();
        setComments([...comments, postedComment]);
        setNewComment("");
      } else {
        alert("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 max-h-40 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.userId}</strong>: {comment.text}
            </p>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full"
      />
      <button
        onClick={handlePostComment}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default CommentBox;
