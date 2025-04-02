import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth'
import "../../scss/profile.scss"
import { useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";
import { editProfile } from '../../api/CreateApi';

function EditProfile() {
    const [loading, setLoading] = useState(true);
    const { token, user, getUser } = useAuth();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        logo: "",
        coverphoto: "",
        bio: ""
    });
    console.log(user, profile, "user");
    useEffect(() => {
        if (user) {
            setProfile({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                logo: user.logo || "",
                coverphoto: user.coverphoto || "",
                bio: user.bio || ""
            })
            setLoading(false)
        }
    }, [user])
    const handleChange = (e) => {
        const name = e.target.name;
        let value;
        console.log(e.target);

        if (name === 'logo' || name === 'coverphoto') {
            value = e.target.files[0]
        } else {
            value = e.target.value;
        }
        console.log(name, value);

        setProfile({
            ...profile,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(profile);

        if (profile.firstname !== user.firstname) {
            formData.append("firstname", profile.firstname);
        }

        if (profile.lastname !== user.lastname) {
            formData.append("lastname", profile.lastname);
        }

        if (profile.bio !== user.bio) {
            formData.append("bio", profile.bio);
        }

        if (profile.logo && profile.logo !== user.logo) {
            formData.append("logo", profile.logo);
        }

        if (profile.coverphoto && profile.coverphoto !== user.coverphoto) {
            formData.append("coverphoto", profile.coverphoto);
        }
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name); // Log file name instead of file object
            } else {
                console.log(`${key}:`, value); // Log the value for non-file fields
            }
        }
        console.log(formData, "formData",);
        try {
            const response = await editProfile(user._id, formData)
            if (response.status === 200) {
                const res_data = response.data;
                console.log(res_data);
                getUser();
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmojiClick = (emojiObject) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            bio: prevProfile.bio + emojiObject.emoji,
        }));
        setShowEmojiPicker(false); // Hide the picker after selection
    };


    if (loading) {
        return <div className="loader"></div>
    }
    return (
        <section className='edit-profile'>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h3>Edit Profile</h3>
                    <div className="name">
                        <input type="text" name='firstname' id='firstname' value={profile.firstname} onChange={handleChange} />
                        <input type="text" name='lastname' id='lastname' value={profile.lastname} onChange={handleChange} />
                    </div>
                    <div className="logo">
                        <label htmlFor="logo">Logo</label>
                        <input type="file" name='logo' id='logo' onChange={handleChange} />
                    </div>
                    <div className="coverphoto">
                        <label htmlFor="coverphoto">Cover Photo</label>
                        <input type="file" name='coverphoto' id='coverphoto' onChange={handleChange} />
                    </div>
                    <div className="bio">
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio" placeholder='write your bio..' value={profile.bio} onChange={handleChange}></textarea>
                        <button type="button" className='emoji' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                        {showEmojiPicker && (
                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                pickerStyle={{ position: "absolute", bottom: "40px", right: "0" }}
                            />
                        )}
                    </div>

                    <button className='btn btn-primary'>Update</button>
                </form>
            </div>
        </section>
    )
}

export default EditProfile