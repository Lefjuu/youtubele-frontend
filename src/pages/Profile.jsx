import { Navbar, Sidebar } from "../components"
import LoginCard from "../components/Login"
import { useState } from "react"
import { useAppContext } from "../context/appContext"
import Alert from "../components/Alert"

const Profile = () => {

    const { user, isLoading, showAlert, showLoginPage, updateUser, displayAlert, showSidebar, uploadImage } = useAppContext()

    const [username, setUsername] = useState(user?.username)
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState('')
    const [previewSource, setPreviewSource] = useState('')

    const profilePicture = user.profilePicture

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password || !email) {
            displayAlert()
            return
        }

        let newProfilePicture = await uploadImage(previewSource)
            .then((data) => {
                return data
            });

        if (newProfilePicture === undefined) {
            newProfilePicture = profilePicture
        }

        updateUser({ username, email, password, profilePicture: newProfilePicture })
    }

    return (
        <>
            {showLoginPage && <LoginCard />}
            <Navbar />
            <Sidebar />

            <div className={showSidebar ? "profile sb-active" : "profile "}>
                <h2 className="profile__title">Edit Profile</h2>
                <form className='profile__form' onSubmit={handleSubmit} >
                    {showAlert && <Alert />}
                    <div className='profile__form-container'>
                        <div className="profile__form-card">
                            <span>EMAIL</span>
                            <label className="profile__form-label"></label>
                            <input
                                type="email"
                                className="profile__form-input"
                                name='email'
                                value={email}
                                disabled="disabled"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="profile__form-small-text">You cant change email</span>
                        </div>

                        <div className="profile__form-card">
                            <span>PROFILE PICTURE</span>
                            <label className="profile__form-label"></label>
                            <input
                                type="file"
                                className="profile__form-input"
                                name='image'
                                onChange={handleFileInputChange}

                            />
                            {previewSource ? (
                                <img src={previewSource} alt="chosen" style={{ height: '120px' }} />
                            ) : <img src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${profilePicture}`} alt="profile" style={{ height: '120px' }} />}
                        </div>

                        <div className="profile__form-card">
                            <span>USERNAME</span>
                            <label className="profile__form-label"></label>
                            <input
                                type="text"
                                className="profile__form-input"
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="profile__form-card">
                            <span>PASSWORD</span>
                            <label className="profile__form-label"></label>
                            <input
                                type="password"
                                className="profile__form-input"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="profile__form-button-container">
                        <button className='profile__form-button' type='submit' disabled={isLoading}>

                            {isLoading ? 'Please Wait...' : 'save changes'}
                        </button>
                    </div>
                </form>

            </div >
        </>
    )
}
export default Profile