const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// Save or update draft
router.post("/save-draft", async (req, res) => {
  const { id, title, content, tags } = req.body;
  const tagArray = tags?.split(",").map(t => t.trim());
  const data = { title, content, tags: tagArray, status: "draft", updated_at: new Date() };

  let blog;
  if (id) blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  else blog = await new Blog(data).save();

  res.json(blog);
});

// Publish
router.post("/publish", async (req, res) => {
  const { id, title, content, tags } = req.body;
  const tagArray = tags?.split(",").map(t => t.trim());
  const data = { title, content, tags: tagArray, status: "published", updated_at: new Date() };

  let blog;
  if (id) blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  else blog = await new Blog(data).save();

  res.json(blog);
});

// Get all
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ updated_at: -1 });
  res.json(blogs);
});

// Get by ID
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

module.exports = router;
