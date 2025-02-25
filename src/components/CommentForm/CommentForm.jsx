// src/components/CommentForm/CommentForm.jsx
import { useState } from 'react';

export default function CommentForm({ postId, addComment }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={e => setText(e.target.value)} required />
      <button type='submit'>Add Comment</button>
    </form>
  );
}