import React, { useState, useEffect } from 'react'
import { useAuth } from '../../store/auth';
import PostCard from './PostCard';
function Post({ search }) {
    const [post, setPosts] = useState([]);
    const [hiddenPosts, setHiddenPosts] = useState([])
    const { token } = useAuth();
    console.log(search, "search");

    const getAllPosts = async (e) => {
        try {
            const response = await fetch(`http://localhost:5001/api/post/getposts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const res_data = await response.json();
                console.log(res_data);
                setPosts(res_data.posts);
            }
        } catch (error) {
            console.log(error);

        }
    }
    const getHiddenPosts = async (e) => {
        try {
            const response = await fetch(`http://localhost:5001/api/post/hideposts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const res_data = await response.json();
                console.log(res_data);
                setHiddenPosts(res_data.response)
            }
        } catch (error) {
            console.log(error);


        }
    }
    const handleDelete = async (id) => {
        try {
            const data = {
                post_id: id
            }
            console.log(JSON.stringify(data));

            const response = await fetch(`http://localhost:5001/api/post/hide`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const res_data = await response.json();
                console.log(res_data);
                getHiddenPosts();
                getAllPosts();
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getAllPosts();
        getHiddenPosts();
    }, [])

    return (
        <>
            {post && post
                .filter((posts) => !hiddenPosts.some((hiddenPost) => hiddenPost.post_id === posts._id))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((posts) => posts.username.toLowerCase().includes(search.toLowerCase()) || posts.description.toLowerCase().includes(search.toLowerCase()))
                .map((posts, index) => {
                    return (
                        <PostCard posts={posts} key={index} handleDelete={handleDelete} />
                    )
                })}
        </>
    )
}

export default Post