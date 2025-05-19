import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="list-container">
      <h1>My Blogs</h1>
      <Link to="/editor" className="btn btn-blue">+ New Blog</Link>
      <div className="list">
        {["published", "draft"].map(status => (
          <div key={status}>
            <h2>{status.toUpperCase()}</h2>
            {blogs.filter(b => b.status === status).map(blog => (
              <Link to={`/editor/${blog._id}`} key={blog._id} className="blog-item">
                <h3>{blog.title || "Untitled"}</h3>
                <small>{new Date(blog.updated_at).toLocaleString()}</small>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
