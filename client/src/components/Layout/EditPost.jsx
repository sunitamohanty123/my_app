import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../../store/auth"
import EmojiPicker from "emoji-picker-react";

function EditPost() {
    const location = useLocation();
    const post = location?.state?.posts;
    const navigate = useNavigate();
    const { token } = useAuth();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [edit, setEdit] = useState({
        description: post.description,
        image: post.image
    });
    console.log(location, post);

    const handleChange = (e) => {
        const name = e.target.name;
        let value;
        if (name === "image") {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }
        setEdit({
            ...edit,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(edit, post);
        const formData = new FormData();
        formData.append("id", post._id)
        if (edit.description && edit.description !== post.description) {
            formData.append("description", edit.description);
        }
        if (edit.image && edit.image instanceof File) {
            const uploadedFileName = edit.image.name;
            const existingFileName = post.image ? post.image.split("\\").pop() : "";
            console.log(existingFileName, uploadedFileName);

            if (uploadedFileName !== existingFileName) {
                formData.append("image", edit.image);
            }
        }
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name); // Log file name instead of file object
            } else {
                console.log(`${key}:`, value); // Log the value for non-file fields
            }
        }
        try {
            const response = await fetch(`http://localhost:5001/api/post/editpost`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            if (response.ok) {
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmojiClick = (emojiObject) => {
        setEdit((prevEdit) => ({
            ...prevEdit,
            description: prevEdit.description + emojiObject.emoji,
        }));
        setShowEmojiPicker(false); // Hide the picker after selection
    };
    return (
        <div className='edit-post'>
            <form onSubmit={handleSubmit}>
                <textarea name="description" id="description" placeholder='write something here...' onChange={handleChange} value={edit.description}></textarea>
                <button type="button" className='emoji' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                {showEmojiPicker && (
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        pickerStyle={{ position: "absolute", bottom: "40px", right: "0" }}
                    />
                )}
                {typeof edit.image === "string" ? <img width='100%' height='200px' src={`http://localhost:5001/${edit.image}`} /> : <img width='100%' height='200px' src={URL.createObjectURL(edit.image)} />}
                <input type="file" name='image' id='image' onChange={handleChange} />
                <button className='btn btn-primary'>Update</button>
            </form>
        </div>
    )
}

export default EditPost