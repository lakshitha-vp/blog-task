import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import BlogListPage from "./pages/BlogListPage";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogListPage />} />
        <Route path="/editor/:id?" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
