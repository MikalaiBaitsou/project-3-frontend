import { useNavigate, useParams } from "react-router"
import { Navigate } from "react-router"


export default function PostDetail(props){

    
    const { postId } = useParams()
    const navigate = useNavigate()

    const selectedPost = props.posts.find((post) => {
        return post._id === postId
    })  

    function handleDelete(){
        props.deletePost(selectedPost._id)
        navigate('/')
      // navigate('/'); // navigate function is defined above
      // and it is a custom hook from react-router
    }

    return (
        <section>
            <h2>{selectedPost.name}</h2>
            <span>Title: {selectedPost.title}</span>
            <br />
            <span>Content: {selectedPost.content}</span>
            <br />
            <button onClick={handleDelete}>Delete</button>
            <br />
        </section>
    )
}