import React,{useState, useEffect} from "react";
import axios from "axios";  

const Feedback = () => {
    const [post, setPost] = useState([])

useEffect(()=>{

  axios.get('http://localhost:3000/posts')
  .then((res)=>{
    setPost(res.data.data)
  })
},[])
        

    
  

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
      }}
    >
      <div className="container">

        {/* Heading */}
        <h2 className="text-center mb-5 fw-bold text-white">
          Feedback
        </h2>

        {post.length > 0 ? (
          post.map((posts) => (
            <div
              key={posts.id}
              className="card shadow-lg mb-4 mx-auto"
              style={{
                width: "450px",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <img
                src={posts.image}
                alt="Feedback"
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body">
                <p className="card-text text-center fw-semibold">
                  {posts.caption}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">
            No feedback available
          </p>
        )}
      </div>
    </div>
  );
};

export default Feedback;