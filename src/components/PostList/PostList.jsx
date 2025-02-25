// src/components/PostList/PostList.jsx
import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <section className='post-list'>
      <h1>Post List</h1>
      {posts.length ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Posts yet!</h2>
      )}
    </section>
  );
}