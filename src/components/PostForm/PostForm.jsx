// src/components/PostForm/PostForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ createPost }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createPost(formData);
    navigate('/posts');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:
        <input type='text' name='title' value={formData.title} onChange={handleChange} required />
      </label>
      <label>Content:
        <textarea name='content' value={formData.content} onChange={handleChange} required />
      </label>
      <button type='submit'>Create Post</button>
    </form>
  );
}