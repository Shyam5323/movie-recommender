import Cookies from "js-cookie";
import { useState } from "react";

export default function RecommendationForm({ category, userOrRec }) {
  const token = Cookies.get("movieToken");
  const userName = Cookies.get("userName");

  const determineInitialStatus = (category, userOrRec) => {
    if (userOrRec === "rec") {
      return "recommended";
    } else if (userOrRec === "user") {
      return category === "book" ? "read" : "watched";
    }
    return "recommended";
  };

  const [formData, setFormData] = useState({
    title: "",
    authorOrDirector: "",
    genre: "",
    description: "",
    recommendedBy: userName,
    whereToRead: category === "book" ? "" : undefined,
    whereToWatch: category === "movie" ? "" : undefined,
    status: determineInitialStatus(category, userOrRec),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      title: formData.title,
      genre: formData.genre,
      description: formData.description,
      status: formData.status,
      recommendedBy: formData.recommendedBy,
      whereToRead: category === "book" ? formData.whereToRead : undefined,
      whereToWatch: category === "movie" ? formData.whereToWatch : undefined,
    };

    if (category === "book") {
      dataToSend.author = formData.authorOrDirector;
    } else if (category === "movie") {
      dataToSend.director = formData.authorOrDirector;
    }

    console.log(dataToSend);

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
        recommendedBy: userName,
        whereToRead: category === "book" ? "" : undefined,
        whereToWatch: category === "movie" ? "" : undefined,
        status: determineInitialStatus(category, userOrRec),
      });
    } else {
      console.error("Failed to add recommendation:", response);
      alert("Failed to add recommendation");
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
      {category === "book" && (
        <div className="form-group">
          <label className="label" htmlFor="whereToRead">
            Where to Read:
          </label>
          <input
            type="text"
            id="whereToRead"
            name="whereToRead"
            value={formData.whereToRead}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      )}
      {category === "movie" && (
        <div className="form-group">
          <label className="label" htmlFor="whereToWatch">
            Where to Watch:
          </label>
          <input
            type="text"
            id="whereToWatch"
            name="whereToWatch"
            value={formData.whereToWatch}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-full">
        Add Recommendation
      </button>
    </form>
  );
}
