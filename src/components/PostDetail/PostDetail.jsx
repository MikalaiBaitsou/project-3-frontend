import { useNavigate, useParams } from "react-router"
import { Navigate } from "react-router"


export default function PostDetail(props){

    // null is the orignal value of selectedPet
   
    // petId is coming from the route
    // <Route path='/pets/:petId' element={<PetDetail deletePet={deletePet} pets={pets}/>} />
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