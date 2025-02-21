import { useState } from 'react'

import { useNavigate } from 'react-router'

const initialState = {
    title: '',
    content: '',
    author: '',
    comments: '',
    date: ''

}

export default function PostForm(props) {
    const [formData, setFormData] = useState(initialState)

    const navigate = useNavigate()

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()

        props.createPost(formData)
        setFormData(initialState)

        navigate('/')
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" name='title' id='title' value={formData.title} onChange={handleChange} />
            <label htmlFor="content">Content:</label>
            <input type="text" name='content' id='content' value={formData.content} onChange={handleChange} />
            <label htmlFor="author">Author:</label>
            <input type="text" name='author' id='author' value={formData.author} onChange={handleChange} />
            <button type='submit'>Create Form</button>
        </form>
    )


}