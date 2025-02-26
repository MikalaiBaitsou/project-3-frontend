// src/components/PostDetail/PostDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';

export default function PostDetail({ posts, deletePost, editPost, addComment, deleteComment }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p._id === postId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: post?.title || '', content: post?.content || '' });

  if (!post) return <h2>Post not found</h2>;

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editPost(post._id, formData);
    setIsEditing(false); // Hide the form after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
          <CommentList comments={post.comments} postId={post._id} deleteComment={deleteComment} />
          <CommentForm postId={post._id} addComment={addComment} />
        </>
      )}
    </section>
  );
}