import Cookies from "js-cookie";
import { useState } from "react";

export default function RecommendationForm({ category, addRecommendation }) {
  const [formData, setFormData] = useState({
    title: "",
    authorOrDirector: "",
    genre: "",
    description: "",
    recommendedBy: "",
    whereToReadOrWatch: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      title: formData.title,
      genre: formData.genre,
      description: formData.description,
      recommendedBy: formData.recommendedBy,
      status: formData.status,
    };

    if (category === "book") {
      dataToSend.author = formData.authorOrDirector;
      dataToSend.whereToRead = formData.whereToReadOrWatch;
    } else if (category === "movie") {
      dataToSend.director = formData.authorOrDirector;
      dataToSend.whereToWatch = formData.whereToReadOrWatch;
    }
    console.log(dataToSend);

    const token = Cookies.get("movieToken");
    const response = await fetch(`http://localhost:5000/api/v1/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });
    if (response.ok) {
      alert("Recommendation added successfully");
      setFormData({
        title: "",
        authorOrDirector: "",
        genre: "",
        description: "",
        recommendedBy: "",
        whereToReadOrWatch: "",
        status: "",
      });
    } else {
      // console.log(response);
      alert("Failed to add recommendations");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label className="label" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="authorOrDirector">
          {category === "book" ? "Author" : "Director"}:
        </label>
        <input
          type="text"
          id="authorOrDirector"
          name="authorOrDirector"
          value={formData.authorOrDirector}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="genre">
          Genre:
        </label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="textarea textarea-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="recommendedBy">
          Recommended By:
        </label>
        <input
          type="text"
          id="recommendedBy"
          name="recommendedBy"
          value={formData.recommendedBy}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="whereToReadOrWatch">
          {category === "book" ? "Where to Read" : "Where to Watch"}:
        </label>
        <input
          type="text"
          id="whereToReadOrWatch"
          name="whereToReadOrWatch"
          value={formData.whereToReadOrWatch}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="status">
          Status:
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Add Recommendation
      </button>
    </form>
  );
}
