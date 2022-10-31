import '../css/main.css'
import moment from 'moment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppContext } from '../context/appContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Video from '../pages/Video';
import Loading from './Loading';

const Cards = ({ id, title, author, thumbnail, views, createdat }) => {

    const { findAuthor, findVideo, isLoading } = useAppContext()
    const [channel, setChannel] = useState()
    const [loading, setLoading] = useState(false)


    const find = async () => {
        await findAuthor(author).then((res) => { return setChannel(res) })
        setLoading(true)
    }

    useEffect(() => {
        find()
    }, [])

    if (isLoading) {
        return <Loading center />
    }


    let date = moment(createdat)
    date = date.format('MMM Do, YYYY')

    return (
        (loading &&
            <Link to={`/video/${id}`} style={{ textDecoration: "none" }} >
                <div className="card">
                    <img src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${thumbnail}`} alt="thumbnail 1" className="card__img" />
                    <div className="card__details">
                        {channel.profilepicture
                            ? <img src={`https://res.cloudinary.com/dlz3svxzk/image/upload/v1663831019/${channel.profilepicture}`} alt="avatar of user" className="card__details-channel-img" />
                            : <AccountCircleIcon className='card__details-icon' />
                        }

                        <div className="card__details-texts">
                            <div className="card__details-title">{title}</div>
                            <div className="card__details-channel">{channel.username}</div>
                            <div className="card__details-info">{views} views &nbsp; •  &nbsp;  {date} </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    )

}
export default Cards