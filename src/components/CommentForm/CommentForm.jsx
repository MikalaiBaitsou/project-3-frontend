// src/components/CommentForm/CommentForm.jsx
import { useState } from 'react';

export default function CommentForm({ postId, addComment }) {
  const [content, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addComment(postId, { content });
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={e => setText(e.target.value)} required />
      <button type='submit'>Add Comment</button>
    </form>
  );
}