import MenuIcon from '@mui/icons-material/Menu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logo } from '../components'
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { toggleSidebar, toggleLoginPage, user } = useAppContext()

    return (
        <div className="navbar">
            <div className="navbar__menu">
                <MenuIcon onClick={toggleSidebar} className='navbar__menu-icon' />
                <Link to='/' style={{ textDecoration: "none" }}>
                    <Logo />
                </Link>
            </div>
            <div className="navbar__menu-logo">

            </div>

            <div className="navbar__search">
                <input type="text" className="navbar__search-input" placeholder='Search...' />
                <button className="navbar__search-btn">
                    <SearchRoundedIcon />
                </button>
            </div>

            <div className="navbar__icons">
                <SettingsBrightnessOutlinedIcon className='navbar__icons-icon' />
                <Link to='/add-video' style={{ textDecoration: "none" }}>
                    <FileUploadOutlinedIcon className='navbar__icons-icon' />
                </Link>
                <NotificationsNoneIcon className='navbar__icons-icon' />

                {user ? (
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div className="user">
                            <div className="user__name">
                                {user.username}
                            </div>
                            {user.profilePicture
                                ? <img className="user__img" src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${user.profilePicture}`} alt='user' />
                                : <AccountCircleIcon className='navbar__icons-icon-user' />
                            }
                        </div>
                    </Link>
                ) : (
                    <button className="btn-login" onClick={toggleLoginPage} >
                        <AccountCircleOutlinedIcon />
                        Sign In
                    </button>
                )}

            </div>
        </div >

    )
}
export default Navbar