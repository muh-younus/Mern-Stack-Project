import React from "react";
import axios from "axios"

function CreatePost() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);    
    axios.post('http://localhost:3000/post', formData)
    .then((res)=>{
      console.log('the response is ', res.data) 
    })
    .catch((err)=>{
      console.error('Error creating post:', err);
    })  
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)"
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          height: "420px",
          borderRadius: "15px"
        }}
      >
        {/* Heading */}
        <h2 className="text-center mb-4 fw-bold text-dark">
          Create Post
        </h2>

        <form onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="mb-3">
            <label htmlFor="postImage" className="form-label fw-semibold">
              Upload Image
            </label>
            <input
              className="form-control"
              type="file"
              id="postImage"
              name="image"
            />
          </div>

          {/* Caption */}
          <div className="mb-3">
            <label htmlFor="caption" className="form-label fw-semibold">
              Caption
            </label>
            <textarea
              className="form-control"
              id="caption"
              rows="3"
              name="caption"
              placeholder="Write your caption..."
            ></textarea>
          </div>

          {/* Button */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-dark btn-lg">
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;