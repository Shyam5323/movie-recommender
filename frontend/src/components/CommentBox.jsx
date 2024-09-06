import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CommentBox = ({ recommendationId, category, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // To store the user's ID

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = Cookies.get("movieToken");
        const userIdFromToken = parseJwt(token).userId; // Assuming your JWT contains user ID
        setUserId(userIdFromToken);

        const response = await fetch(
          `http://localhost:5000/api/v1/${category}/${recommendationId}/comments`,
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

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const token = Cookies.get("movieToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/${category}/${recommendationId}/comments`,
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

  const handleDeleteComment = async (commentId) => {
    try {
      const token = Cookies.get("movieToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/${category}/${recommendationId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div className="mb-4 max-h-40 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex justify-between items-center">
              <p>
                <strong>{comment.author}</strong>: {comment.text}
              </p>

              {comment.author === currentUser.userId && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              )}
            </div>
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
