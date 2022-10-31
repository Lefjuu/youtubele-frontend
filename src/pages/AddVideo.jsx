import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components"
import Alert from "../components/Alert"
import { useAppContext } from "../context/appContext"

const AddVideo = () => {

    const { showAlert, uploadImage, isLoading, displayAlert, addVideo, uploadVideo, user } = useAppContext()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [author, setAuthor] = useState(user.email)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setVideo(reader.result)
        }
    }

    const handleImageInputChange = (e) => {
        const file = e.target.files[0]
        previewImage(file)
    }

    const previewImage = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setThumbnail(reader.result)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !video) {
            displayAlert()
            return
        }

        const thumbnail1 = await uploadImage(thumbnail)
            .then((data) => {
                return data
            })

        const video1 = await uploadVideo(video)
            .then((data) => {
                return data
            })

        const newVideo = { title, description, video: video1, thumbnail: thumbnail1, author }
        console.log(newVideo);
        console.log('video uploaded');
        addVideo({ newVideo, alertText: 'Video Uploaded! Redirecting...', })
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }

    return (
        <>
            <Navbar />

            <div className="addVideo">

                <form className='addVideo__form' onSubmit={handleSubmit}  >

                    {showAlert && <Alert />}
                    <div className="addVideo__container">
                        <div className="addVideo__form-card">
                            <span className="addVideo__form-title">TITLE OF VIDEO</span>
                            <label className="addVideo__form-label"></label>
                            <input
                                type="text"
                                className="addVideo__form-input"
                                name='title'
                                value={title}
                                // disabled="disabled"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="addVideo__form-card">
                            <span className="addVideo__form-title">Video FILE (50MB MAX)</span>

                            <label className="addVideo__form-label"></label>
                            <input
                                type="file"
                                className="addVideo__form-input"
                                name='video'
                                onChange={handleFileInputChange}
                            />
                            {video && <iframe className="addVideo__form-video" src={video} alt="chosen" />}
                            {/* {video ? (
                                <iframe className="addVideo__form-video" src={video} alt="chosen" />
                            ) : <iframe className="addVideo__form-video" src={video} alt="chosen" />
                            } */}
                        </div>

                        <div className="addVideo__form-card">
                            <span className="addVideo__form-title">THUMBNAIL</span>

                            <label className="addVideo__form-label"></label>
                            <input
                                type="file"
                                className="addVideo__form-input"
                                name='thumbnail'
                                onChange={handleImageInputChange}
                            />
                            {thumbnail && <img className="addVideo__form-thumbnail" src={thumbnail} alt="chosen" />}
                            {/* {thumbnail ? (
                                <img className="addVideo__form-thumbnail" src={thumbnail} alt="chosen" />
                            ) : <img className="addVideo__form-thumbnail" src={thumbnail} alt="chosen" />
                            } */}
                        </div>


                        <div className="addVideo__form-card">
                            <span className="addVideo__form-title">DESCRIPTION</span>
                            <label className="addVideo__form-label"></label>
                            <textarea
                                type="text"
                                className="addVideo__form-input-desc"
                                name='description'
                                value={description}
                                // disabled="disabled"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="profile__form-button-container">
                        <button className='profile__form-button' type='submit'>

                            {isLoading ? 'Please Wait...' : 'Upload Video'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddVideo