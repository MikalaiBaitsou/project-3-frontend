// src/services/postService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`;

export async function index() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function create(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` 
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function update(postId, data) {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to update the post');
    }
    return res.json();
  }

export async function deletePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete the post');
    }
  
    return response.json();
  }
  
