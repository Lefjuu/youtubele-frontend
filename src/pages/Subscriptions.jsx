import { Navbar, Sidebar, Card, Loading } from '../components/'
import '../css/main.css'
import { useAppContext } from '../context/appContext'
import Login from '../components/Login'
import { useEffect } from 'react'

const Subscriptions = () => {

    const { showSidebar, showLoginPage, getAllVideos, videos, isLoading, user } = useAppContext()

    useEffect(() => {
        const allVideos = async () => {
            await getAllVideos();
        }
        allVideos()
    }, []);
    // if (isLoading) {
    //     return <Loading center />
    // }

    // if (videos.length === 0) {
    //     return (
    //         <h2>No videos to display...</h2>
    //     )
    // }


    // TODO: 
    // zmienic w videos z emaila na id uzytkownika

    return (
        user && (
            <>
                <Navbar />
                <Sidebar />
                <div className={showSidebar ? "cards sb-active" : "cards "}>
                    {videos && videos.map((video) => {
                        return <Card key={video.id} {...video} />
                    })}
                </div>
                {showLoginPage && <Login />}
            </>
        )
    )
}
export default Subscriptions