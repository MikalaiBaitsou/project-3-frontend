// src/components/CommentList/CommentList.jsx
export default function CommentList({ comments, postId, deleteComment, editComment }) {
    return (
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <button onClick={() => deleteComment(postId, comment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }