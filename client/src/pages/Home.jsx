import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../scss/home.scss"
import { FaFacebook, FaUserFriends, FaRegClock, FaRegSave, FaRegComment, FaWhatsapp } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { GrGroup } from "react-icons/gr";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GiIndiaGate } from "react-icons/gi";
import { TbCalendarClock } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { BiBarChart } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Post from '../components/Layout/Post';
import "../scss/post.scss"
import { useAuth } from '../store/auth';
function Home() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])
    if (loading) {
        return <div className="loader"></div>
    }
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <div className='home'>
                <div className="three-col">
                    <div className="left-c">
                        <ul>
                            <li className='account'><span>
                                {user.logo ? <img src={`http://localhost:5001/${user.logo}`} alt="" /> : <VscAccount />}
                            </span>{`${user.firstname} ${user.lastname}`}</li>
                            <li className='find-friends'><span><FaUserFriends /></span>Find friends</li>
                            <li className='welcome'><span><FaFacebook /></span>Welcome</li>
                            <li className='memories'><span><FaRegClock /></span>Memories</li>
                            <li className='saved'><span><FaRegSave /></span>Saved</li>
                            <li className='groups'><span><GrGroup /></span>Groups</li>
                            <li className='video'><span><MdOutlineOndemandVideo /></span>Video</li>
                            <li className='marketplace'><span><GiIndiaGate /></span>MarketPlace</li>
                            <li className='feeds'><span><TbCalendarClock /></span>Feeds</li>
                            <li className='events'><span><SlCalender /></span>Events</li>
                            <li className='ads-manager'><span><BiBarChart /></span>Ads Manager</li>
                            <li className='see-more'><span><IoIosArrowDropdownCircle /></span>See more</li>
                        </ul>
                    </div>
                    <div className="middle-c">
                        <div className="posts">
                            <Post search={search} />
                        </div>
                    </div>
                    <div className="right-c">
                        <div className="content">
                            <h3>Group Chats</h3>
                            <p><strong>Create Group Chat</strong></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home