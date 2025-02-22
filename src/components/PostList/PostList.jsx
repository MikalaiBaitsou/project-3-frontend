import { Link } from 'react-router-dom';

export default function PostList(props){

    const postLis = props.posts.map((post) => {
        return (
        <li key={post._id} >
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            
        </li>
        )
    })
     console.log(postLis)
    // check to see if we have posts
    return (
        <section className={'post-list'}>
            <h1>Post List</h1>
            {postLis.length !== 0 ? (
                <ul>
                    {postLis}
                </ul>
            ) : (
                <h2>No Posts yet!</h2>
            )}
        </section>
    )
}