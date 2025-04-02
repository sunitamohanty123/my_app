import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../scss/profile.scss"
import { Link } from 'react-router-dom'
import { FaPen } from "react-icons/fa";
import PostCard from '../components/Layout/PostCard';
import { useAuth } from '../store/auth';
import { FaUserCircle } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { deletePostByUser, getUserPost } from '../api/CreateApi';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("")
    const { token, user, getUser } = useAuth();
    console.log(user, "user");

    const getPostByUser = async (e) => {
        try {
            const response = await getUserPost();
            console.log(response, "axios");

            if (response.status === 200) {
                const res_data = response.data;
                setPosts(res_data.response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await deletePostByUser(id)
            if (response.status === 200) {
                getPostByUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id) => {
        try {
            const response = await fetch(``, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        getUser()
        getPostByUser();
    }, [])
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <section className="profile">
                <div className="container">
                    <div className="pics">
                        <div className="cover-photo">
                            {user.coverphoto ? <img src={`http://localhost:5001/${user.coverphoto}`} alt="" /> : <span></span>}
                        </div>
                        <div className="profile-row">
                            <div className="profile-pic">
                                {user.logo ? <img src={`http://localhost:5001/${user.logo}`} alt="" /> : <span><FaUserCircle /></span>}
                                <div className="name">
                                    <h3>{user.firstname} {user.lastname}</h3>
                                </div>
                                <div className="bio">
                                    <p>{user.bio}</p>
                                </div>
                            </div>

                            <div className="editprofile">
                                <Link to="/editprofile"><span><FaPen /></span>Edit Profile</Link>
                                <Link to="/createpost"><span><IoCreateOutline /></span>Create Post</Link>
                            </div>
                        </div>
                    </div>
                    <div className="navbar">
                        <ul>
                            <li className='active'>Posts</li>
                            <li>About</li>
                            <li>Friends</li>
                            <li>Photos</li>
                            <li>Videos</li>
                        </ul>
                    </div>
                </div>
                <div className="user-posts">
                    {posts
                        .filter((posts) => posts.username.toLowerCase().includes(search.toLowerCase()) || posts.description.toLowerCase().includes(search.toLowerCase()))
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((posts, index) => {
                            return (
                                <PostCard posts={posts} key={index} handleDelete={handleDelete} handleEdit={handleEdit} />
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Profile