import React, { useEffect, useState } from 'react'
import { FaFacebook, FaFacebookMessenger, FaRegFileVideo, FaBookOpen, FaMoon, FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdHome, IoIosSearch, IoMdNotifications } from "react-icons/io";
import { IoPeopleOutline, IoPeopleCircleOutline, IoMenu, IoCreateOutline } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/images/react.svg"
import { TbLogout } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import "../scss/header.scss"
import { useAuth } from '../store/auth';
function Navbar({ search, setSearch }) {
    const [postmenu, setPostmenu] = useState("")
    const [searchbox, setSearchbox] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { LogoutUser } = useAuth();
    const location = useLocation();
    console.log(location.pathname);

    const LogOut = async (e) => {
        console.log(!LogoutUser());

        if (!LogoutUser()) {
            navigate("/")
        }
    }
    const toggleMenus = (name) => {
        console.log(name);
        if (name === "account") {
            return setPostmenu("account")
        } else if (name === "menu") {
            return setPostmenu("menu")
        } else {
            return setPostmenu("")
        }
    }
    const handleSearch = (e) => {
        console.log(e.target.value);

        setSearch(e.target.value)
    }
    return (
        <header>
            <div className="navbar">
                <div className="left">
                    <Link to="/home">
                        <FaFacebook />
                    </Link>
                    <div className="search">
                        <span><IoIosSearch /></span>
                        <input
                            type="text"
                            placeholder='Search...'
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="middle">
                    <div className="home"><Link to="/home"><IoMdHome /></Link></div>
                    <div className="friends"><IoPeopleOutline /></div>
                    <div className="group"><IoPeopleCircleOutline /></div>
                </div>
                <div className="right">
                    <div className="account">
                        <button onClick={() => toggleMenus(postmenu === "account" ? false : "account")}>
                            {user.logo ? <img src={`http://localhost:5001/${user.logo}`} alt="" /> : <VscAccount />}
                        </button>
                    </div>
                    <div className="menu">
                        <button onClick={() => toggleMenus(postmenu === "menu" ? false : "menu")}><CgMenuGridR /></button>
                    </div>
                    <div className="messenger">
                        <FaFacebookMessenger />
                    </div>
                    <div className="notifications">
                        <IoMdNotifications />
                    </div>
                    <div className="find-friends">
                        <Link to="#">Find Friends</Link>
                    </div>
                </div>
            </div>
            <div className="navbar-sm">
                <div className={`first-row ${searchbox ? `searchbox` : ""}`}>
                    {!searchbox && (
                        <div className="left">
                            <Link to="/home">
                                <img src={Logo} alt="" />
                            </Link>
                        </div>)}
                    <div className={`right ${searchbox ? `right-search` : ""}`}>
                        <div className="search">
                            {searchbox ? (
                                <button onClick={() => { setSearchbox(!searchbox); setSearch(''); }}>
                                    <span><FaLongArrowAltLeft /></span>
                                </button>
                            ) : (
                                <button onClick={() => setSearchbox(!searchbox)}>
                                    <span><IoIosSearch /></span>
                                </button>
                            )
                            }
                            {searchbox && (<input
                                type="text"
                                placeholder='Search...'
                                value={search}
                                onChange={handleSearch}
                            />)}
                        </div>
                        <div className="menu">
                            <button onClick={() => toggleMenus(postmenu === "account" ? false : "account")}>
                                <IoMenu />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="second-row">
                    <div className="home">
                        <Link to="/home"><IoMdHome /></Link>
                    </div>
                    <div className="friends">
                        <IoPeopleOutline />
                    </div>
                    <div className="group">
                        <IoPeopleCircleOutline />
                    </div>
                    <div className="video">
                        <MdOutlineOndemandVideo />
                    </div>
                    <div className="messenger">
                        <FaFacebookMessenger />
                    </div>
                    <div className="notifications">
                        <IoMdNotifications />
                    </div>
                </div>
            </div>
            {
                postmenu === "menu" ? (
                    <>
                        <div className="menu-bar" id='postmenu'>
                            <h3>Menu</h3>
                            <div className="post">
                                <p className='heading'>Create</p>
                                <ul>
                                    <li>
                                        <Link to="/createpost"><span><IoCreateOutline /></span>Post</Link>
                                    </li>
                                    <li>
                                        <Link><span><FaBookOpen /></span>Story</Link>
                                    </li>
                                    <li>
                                        <Link><span><FaRegFileVideo /></span>Reels</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : ""
            }
            {
                postmenu === "account" ? (
                    <>
                        <div className="account-menu">
                            <div className="profile">
                                <div className="logo-name">
                                    {user.logo ? <img src={`http://localhost:5001/${user.logo}`} alt="" /> : <VscAccount />}

                                    <span>{`${user.firstname} ${user.lastname}`}</span>
                                </div>
                                <div className="view-profile">
                                    {location.pathname === "/profile" ? <Link to="/home">View Home Page</Link> : <Link to="/profile">View Profile</Link>}
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <Link><span><IoSettingsSharp /></span>Settings & Privacy</Link>
                                </li>
                                <li>
                                    <Link><span><IoIosHelpCircle /></span>Help & Support</Link>
                                </li>
                                <li>
                                    <Link><span><FaMoon /></span>Display & Accesibility</Link>
                                </li>
                                <li>
                                    <button onClick={() => LogOut()}><span><TbLogout /></span>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : ""
            }
        </header >
    )
}

export default Navbar