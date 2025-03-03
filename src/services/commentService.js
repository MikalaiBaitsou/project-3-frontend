// src/services/commentService.js
const COMMENT_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`;

export async function create(postId, data) {
  const res = await fetch(`${COMMENT_URL}/${postId}/comment`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteComment(postId, commentId) {
  const res = await fetch(`${COMMENT_URL}/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) {
    throw new Error('Failed to delete comment');
  }
  return res.json(); // Returns { message: 'Comment deleted successfully' }
}
