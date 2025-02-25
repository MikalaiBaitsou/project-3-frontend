// src/components/PostDetail/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';

export default function PostDetail({ posts, deletePost, editPost, addComment, deleteComment, editComment }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p._id === postId);

  if (!post) return <h2>Post not found</h2>;

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => deletePost(post._id)}>Delete</button>
      <CommentList comments={post.comments} postId={post._id} deleteComment={deleteComment} editComment={editComment} />
      <CommentForm postId={post._id} addComment={addComment} />
    </section>
  );
}