
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useAppContext } from '../context/appContext';

const Sidebar = () => {

    const { showSidebar, user, toggleLoginPage } = useAppContext()


    return (
        // showSidebar && (

        <div className={showSidebar ? "sidebar-active" : "sidebar"}>
            {!showSidebar && (
                <div className="sidebar__menu-small">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="sidebar__menu-small-element"  >
                            <HomeIcon className="sidebar__menu-small-icon" />
                            <span> Home</span>
                        </div>
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className="sidebar__menu-small-element" >
                            <ExploreOutlinedIcon className="sidebar__menu-small-icon" />
                            <span> Explore</span>
                        </div>
                    </Link>
                    <Link to='/subscriptions' style={{ textDecoration: 'none' }}>
                        <div className="sidebar__menu-small-element" >
                            <SubscriptionsOutlinedIcon className="sidebar__menu-small-icon" />
                            <span> Subscriptions</span>
                        </div>
                    </Link>
                    <div className="sidebar__menu-small-element" >
                        <VideoLibraryOutlinedIcon className="sidebar__menu-small-icon " />
                        <span>  Library</span>
                    </div>
                </div>
            )
            }
            {
                showSidebar && (
                    <div className="sidebar__menu">
                        <div className="sidebar__menu-element">
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <ExploreOutlinedIcon className="sidebar__menu-icon" />
                                <span> Explore</span>
                            </Link>
                        </div>
                        <div className="sidebar__menu-element">
                            <Link to='/subscriptions' style={{ textDecoration: 'none' }}>
                                <SubscriptionsOutlinedIcon className="sidebar__menu-icon" />
                                <span> Subscriptions</span>
                            </Link>
                        </div>
                        <div className="sidebar__underline"></div>
                        <div className="sidebar__menu-element underline ">
                            <VideoLibraryOutlinedIcon className="sidebar__menu-icon " />
                            <span>  Library</span>
                        </div>
                        <div className="sidebar__menu-element">
                            <HistoryOutlinedIcon className="sidebar__menu-icon" />
                            <span>  History</span >
                        </div>
                        <div className="sidebar__underline"></div>

                        {user ? (
                            <div className="user">
                                <div className="user__name">
                                    {user.username}
                                </div>
                                {user.profilePicture
                                    ? <img className="user__img" src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${user.profilePicture}`} alt='user' />
                                    : <AccountCircleIcon className='sidebar__menu-icon-user' />
                                }
                            </div>
                        ) : (
                            <div className="sidebar__menu-text">
                                <span>Sign in to like videos, comment, and subscribe.</span>
                                <button className="btn-login" onClick={toggleLoginPage} >
                                    <AccountCircleOutlinedIcon />
                                    Sign In
                                </button>
                            </div>
                        )}

                        <div className="sidebar__underline"></div>
                        <div className="sidebar__menu-element">
                            <LibraryMusicOutlinedIcon className="sidebar__menu-icon" />
                            <span>   Music</span>
                        </div>
                        <div className="sidebar__menu-element">
                            <MovieOutlinedIcon className="sidebar__menu-icon" />
                            <span> Movies</span>
                        </div>
                        <div className="sidebar__menu-element">
                            <ArticleOutlinedIcon className="sidebar__menu-icon" />
                            <span> News</span>
                        </div>
                        <div className="sidebar__menu-element">
                            <SportsBasketballOutlinedIcon className="sidebar__menu-icon" />
                            <span> Sports</span>
                        </div>
                        <div className="sidebar__menu-element">
                            <SportsEsportsOutlinedIcon className="sidebar__menu-icon" />
                            <span> Gaming</span>
                        </div>
                        <div className="sidebar__underline"></div>
                        <Link to='/profile' style={{ textDecoration: 'none' }}>
                            <div className="sidebar__menu-element">
                                <SettingsOutlinedIcon className="sidebar__menu-icon" />
                                <span> Edit Profile</span>
                            </div>
                        </Link>
                        <div className="sidebar__menu-element">
                            <HelpOutlineOutlinedIcon className="sidebar__menu-icon" />
                            <span> Help</span>
                        </div>
                    </div>
                )
            }
        </div >
        // )

    )
}
export default Sidebar