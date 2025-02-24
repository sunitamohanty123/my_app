import React, { useState } from 'react'
import { useAuth } from "../../store/auth"
import "../../scss/post.scss"
import { useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";

function CreatePost() {
    const { token } = useAuth();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const navigate = useNavigate();
    const [post, setPost] = useState({
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        let value;
        if (name === 'image') {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }

        setPost({
            ...post,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post);
        const formData = new FormData();
        formData.append('description', post.description);
        if (post.image) {
            formData.append('image', post.image);  // Append the image file
        }
        try {
            const response = await fetch(`http://localhost:5001/api/post/createpost`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
            if (response.ok) {
                const res_data = await response.json();
                console.log(res_data);
                navigate("/profile")
            }
        } catch (error) {

        }
    }
    const handleEmojiClick = (emojiObject) => {
        setPost((prevPost) => ({
            ...prevPost,
            description: prevPost.description + emojiObject.emoji,
        }));
        setShowEmojiPicker(false); // Hide the picker after selection
    };
    return (
        <div className='create-post'>
            <form onSubmit={handleSubmit}>
                <textarea name="description" id="description" placeholder='write something here...' onChange={handleChange} value={post.description}></textarea>
                <button type="button" className='emoji' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                {showEmojiPicker && (
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        pickerStyle={{ position: "absolute", bottom: "40px", right: "0" }}
                    />
                )}
                {post.image && <img width='100%' height='200px' src={URL.createObjectURL(post.image)} />}
                <input type="file" name='image' id='image' onChange={handleChange} />
                <button className='btn btn-primary'>Post</button>
            </form>
        </div>
    )
}

export default CreatePost