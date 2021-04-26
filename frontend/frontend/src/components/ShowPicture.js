import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getPicture } from '../components/connectServer/userController'
export default withRouter(function ShowPicture(props) {
    const [imgSrc, setImgSrc] = useState('')
    const [media_type, setmedia_type] = useState('')
    const user = props.user


    useEffect(function () {
        getTheNicePicture()

    }, []);

    async function getTheNicePicture() {
        debugger;

        try {
            const res = await getPicture(user._id, user.token)
            console.log(res);
            setImgSrc(res.url)
            setmedia_type(res.media_type)
            console.log(media_type)
        }


        catch {
            console.log("error!!!!")
        }

    }

    return (
        <div>
            <h2 className="text-warning">hello  {user.name}</h2>
            <h2 className="text-secondary">the nice picture of the day:</h2>

            {imgSrc != '' ? media_type === 'video' ?
                <video style={{ borderColor: 'red' }} width="320" height="240" controls>
                    <source src={imgSrc} type="video/mp4"></source>
                    <source src={imgSrc} type="video/ogg"></source>
                </video> :
                <img className="w-50 h-25" src={imgSrc}></img> : 'Loading...'}
            <div>
                <h2 className="text-warning">i want to see all my pictures</h2>
                <Link className="btn btn-outline-warning" to="/showAllPictures">All my pictures</Link>
            </div>
        </div>
    )


}
)