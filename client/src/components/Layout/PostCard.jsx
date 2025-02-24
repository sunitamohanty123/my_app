import React, { useEffect, useState } from 'react'
import { FaRegComment, FaWhatsapp } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { FaPen } from "react-icons/fa";
import "../../scss/post.scss"
import { useAuth } from '../../store/auth';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
function PostCard({ posts, handleDelete, handleEdit }) {
    const { user, token } = useAuth();
    console.log(posts, "posts");
    const [edit, setEdit] = useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const time = new Date(posts.updatedAt ? posts.updatedAt : posts.createdAt);
    const date = time.getDate();
    const month = months[time.getMonth()];
    const year = time.getFullYear();
    const hour = time.getHours();
    const minute = time.getMinutes();

    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    let modifiedDate;
    let modifiedTime;
    if (currentYear === year) {
        modifiedDate = `${date} ${month}`;
        modifiedTime = `${hour}:${minute}`;
    } else {
        modifiedDate = `${date} ${month} ${year}`;
    }
    // Like functionality
    const [likes, setLikes] = useState(posts.likes);
    const [heartStyle, setHeartStyle] = useState({});
    const handleClick = async () => {
        showHeart();

        try {
            const response = await fetch(`http://localhost:5001/api/post/getlikesids`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const likedId = await response.json();
                const likedIds = likedId.ids;
                console.log(likedIds, "ids");

                let exists;
                if (likedIds.length === 0 || likedIds === undefined) {
                    exists = false;
                } else {
                    exists = likedIds.includes(posts._id);
                }
                console.log(exists);

                if (!exists) {
                    const response_likes = await fetch(`http://localhost:5001/api/post/likes/${posts._id}`, {
                        method: "PATCH",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if (response_likes.ok) {
                        setLikes(likes + 1);
                    }
                } else {
                    console.log("user already liked this post");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const showHeart = () => {
        const heart = document.getElementById('heart');
        // Get button position to center the heart icon
        const buttonRect = document.getElementById('likeBtn').getBoundingClientRect();
        setHeartStyle({
            // left: `${buttonRect.left + buttonRect.width / 2 - 25}px`,
            // top: `${buttonRect.top - 30}px`,
            opacity: 1,
            animation: 'popUp 1s forwards',
        });

        // Reset the animation after it's done
        setTimeout(() => {
            setHeartStyle({ opacity: 0 });
        }, 1000);
    };

    //comments functionality
    const [comments, setComments] = useState(false);
    const [commentsArray, setCommentsArray] = useState(posts.comments);
    console.log(commentsArray);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentFormData = new FormData(e.target)
        const formInputData = Object.fromEntries(commentFormData.entries());

        let commentsData = []

        if (formInputData.text) {
            commentsData.push({
                "text": formInputData.text,
                "name": `${user.firstname} ${user.lastname}`,
                "logo": user.logo.replace(/\\/g, '\\'),
                "id": posts._id
            })
            console.log(JSON.stringify(commentsData));

            try {
                const response = await fetch(`http://localhost:5001/api/post/comments`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(commentsData)
                })
                if (response.ok) {
                    const res_data = await response.json();
                    console.log(res_data);
                    setCommentsArray(res_data.response.comments)
                    e.target.reset();
                }
            } catch (error) {
                console.log(error);

            }
        }

    }
    return (
        <div className="post">
            <div className="details">
                <div className="mr">
                    <div className="left">
                        <img src={`http://localhost:5001/${posts.loginDp}`} alt="" />
                    </div>
                    <div className="middle">
                        <p className="name">{posts.username}</p>
                        <p className="date">{modifiedDate}<span>{modifiedTime ? ` at ${modifiedTime}` : ""} </span></p>
                    </div>
                </div>

                <div className="right">
                    <span className="edit">{user._id === posts.loginId ? <button onClick={() => setEdit(!edit)}><HiOutlineDotsHorizontal /></button> : ""}</span>
                    <span className="delete"><button onClick={() => handleDelete(posts._id)}><RxCross2 /></button></span>
                </div>
                {edit &&
                    (
                        <div className="post-edit">
                            <Link to={{ pathname: "/editpost" }} state={{ posts }}><span><FaPen /></span>Edit</Link>
                        </div>
                    )
                }

            </div>
            <div className="description">
                <p>{posts.description}</p>
                <button onClick={() => handleClick()}>
                    <img src={`http://localhost:5001/${posts.image}`} alt="" />
                </button>

            </div>
            <div className="numbers">
                <div className="likes"><FcLike /><span>{likes}</span></div>
                <div className="cs">
                    <div className="comments"><span>{commentsArray.length}</span>comments</div>
                    <div className="share"><span>1</span>shares</div>
                </div>
            </div>
            <div className="logos">
                <div className="likes" id="likeBtn"><button onClick={() => handleClick()}><span><AiOutlineLike /></span>like</button></div>
                <div className="comments"><button onClick={() => setComments(!comments)}><span><FaRegComment /></span>comments</button></div>
                <div className="send"><span><FaWhatsapp /></span>send</div>
                <div className="share"><span><PiShareFat /></span>share</div>
            </div>
            <div
                id="heart"
                className="heart"
                style={heartStyle}
            >
                ❤️
            </div>
            {
                comments && (
                    <Modal isOpen={comments}
                        onRequestClose={() => setComments(false)}>
                        <div className="comments-section">
                            <div className="profiles">
                                {
                                    commentsArray.length > 0 && commentsArray
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((comments, index) => {
                                            return (
                                                <div className="profile" key={index}>
                                                    <div className="logo">
                                                        <img src={`http://localhost:5001/${comments.logo}`} alt="" />
                                                    </div>
                                                    <div className="others">
                                                        <div className="name">{comments.name}</div>
                                                        <div className="comment">{comments.text}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className="comment-form">
                                <div className="logo">
                                    <img src={`http://localhost:5001/${user.logo}`} alt="" />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <textarea name="text" id="text" placeholder='write comments here...' />
                                    <button>send</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </div >
    )
}

export default PostCard