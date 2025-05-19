import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditorPage.css"; // Ensure this file is imported for custom styling

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`).then(res => {
        const b = res.data;
        setTitle(b.title);
        setContent(b.content);
        setTags(b.tags.join(", "));
      });
    }
  }, [id]);

  const autoSave = () => {
    axios.post("http://localhost:5000/api/blogs/save-draft", { id, title, content, tags })
      .then(res => {
        console.log("Auto-saved draft");
        if (!id) navigate(`/editor/${res.data._id}`);
      });
  };

  useEffect(() => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(autoSave, 5000));
    return () => clearTimeout(timer);
  }, [title, content, tags]);

  return (
    <div className="editor-container">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="btn-back">
        ← Back to Blog List
      </button>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="textarea"
        placeholder="Write your content..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <input
        className="input"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <div className="button-row">
        <button onClick={autoSave} className="btn btn-yellow">Save Draft</button>
        <button onClick={() => {
          axios.post("http://localhost:5000/api/blogs/publish", { id, title, content, tags })
            .then(() => navigate("/"));
        }} className="btn btn-green">Publish</button>
      </div>
    </div>
  );
}
