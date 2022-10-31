import { Card, Loading, Navbar, Sidebar, Login } from "../components"


import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const Video = () => {

  const { getVideo, findAuthor, videos, isLoading, followUser, followings, showLoginPage, unfollowUser, user, getAllVideos, findUser } = useAppContext()
  const [video, setVideo] = useState('')
  const [channel, setChannel] = useState()
  const [loading, setLoading] = useState(false)
  // const [subscribed, setSubscribed] = useState(followings)
  const [followings1, setFollowings1] = useState()
  // console.log([followings]);
  const id = window.location.pathname.split('/')[2]

  const find = async () => {
    await getVideo(id).then((res) => { return setVideo(res) })
  }

  useEffect(() => {
    const allVideos = async () => {
      await getAllVideos();
    }
    allVideos()
  }, []);


  const findAgain = async () => {
    if (video) await findAuthor(video.author).then((res) => {
      return (
        // console.log(res),
        setChannel(res)
      )
    })
    if (video) await findUser(user.email).then((res) => {
      return (
        // console.log(res),
        setFollowings1(res.followings),
        setLoading(true)
      )
    })
  }

  const follow = async (e) => {
    await followUser(channel.id)
      .then((res) => {
        return setFollowings1(res)
      })
  }

  const unfollow = async () => {
    await unfollowUser(channel.id)
      .then((res) => {
        return setFollowings1(res)
      })
  }

  // useEffect(() => {
  //   console.log(followings1);
  // }, [followings1])


  useEffect(() => {
    find()
  }, [])

  useEffect(() => {
    findAgain()
  }, [video])

  let date = moment(video.createdat)
  date = date.format('MMM Do, YYYY')

  return (
    <>

      {showLoginPage && <Login />}
      <Navbar />
      {loading &&
        <>
          <div className="video">
            <div className="video__container">
              <div className="video__content">
                <div className="video__content-video">
                  <iframe
                    width="100%"
                    height="720"
                    src={`https://res.cloudinary.com/dlz3svxzk/video/upload/v1663831019/${video.video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="video__title">{video.title}</div>
                <div className="video__detail">
                  <div className="video__detail-info">{video.views} views • {date}</div>
                  <div className="video__detail-buttons">
                    <div className="video__detail-button">
                      <ThumbUpOutlinedIcon /> {video.likes}
                    </div>
                    <div className="video__detail-button">
                      <ThumbDownOffAltOutlinedIcon /> {video.dislikes}
                    </div>
                    <div className="video__detail-button">
                      <ReplyOutlinedIcon /> Share
                    </div>
                  </div>
                </div>
                <div className="sidebar__underline"></div>
                <div className="video__channel">
                  <div className="video__channel-profile">
                    {channel.profilepicture
                      ? <img className="user__img" src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${channel.profilepicture}`} alt='user' />
                      : <AccountCircleIcon className='video__channel-icon' />
                    }
                    <div className="video__channel-info">
                      <div className="video__channel-name">
                        {channel.username}
                      </div>
                    </div>
                  </div>
                  {followings1 !== undefined && (
                    user && followings1 !== null && followings1.includes(Number(channel.id)) ? (
                      <button className="video__channel-btn-subscribed" onClick={() => unfollow()} disabled={isLoading} >SUBSCRIBED</button>
                    ) : (
                      <button className="video__channel-btn-subscribe" onClick={() => follow()} disabled={isLoading} >SUBSCRIBE</button>
                    )
                  )}
                </div>
                <div className="video__description">{video.description}</div>
              </div>




              <div className="video__sidebar">
                {videos && videos.map((video) => {
                  return <Card key={video.id} {...video} />
                })}
                {/* {movies.map((movie) => {
              return (
                <div className="video__sidebar-card">
                  <Card key={movie.id} {...movie} />
                </div>
              )
            })} */}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
export default Video