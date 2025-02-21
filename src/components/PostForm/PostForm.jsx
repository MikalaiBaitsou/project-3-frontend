import { useState } from 'react';
import { useNavigate } from 'react-router';

const initialState = {
    title: '',
    content: '',
};

export default function PostForm(props) {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

               
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

            
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Add the author ID from props (assumed to be an ObjectId from the backend)
        const postData = {
            ...formData,
            author: props.userId, // Assuming userId is passed via props
        };

        console.log('Data being sent:', postData);

        props.createPost(postData); // Send the post data to the backend
        setFormData(initialState);  // Reset form
        navigate('/');              // Redirect to home
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required // Match backend "required: true"
            />
            <label htmlFor="content">Content:</label>
            <textarea // Using textarea for longer content
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
                required // Match backend "required: true"
            />
            {/* Author is not an input; it's set programmatically */}
            <button type="submit">Create Post</button>
        </form>
    );
}