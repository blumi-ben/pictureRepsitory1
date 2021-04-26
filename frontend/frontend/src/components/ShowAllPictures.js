
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getAllPicturesController, deletPictureController } from './connectServer/userController'
import { Link } from 'react-router-dom'
export default withRouter(function ShowAllPictures(props) {

    const user = props.user
    let arr = []
    const [imgs, setImgs] = useState([''])
    useEffect(function () {
        getAllPictures()


    }, []);



    async function getAllPictures() {
        debugger;

        try {
            const res = await getAllPicturesController(user._id, user.token)
            console.log(res.data.picture)
            arr = res.data.picture
            setImgs([...arr])
            console.log(imgs)
            console.log(arr)
      

        }


        catch {
            console.log("error!!!!")
        }

    }
    async function deletPicture(pictureId) {
        debugger;
        const result = await deletPictureController(pictureId)
        console.log(result)
        alert('picture deleted')
        getAllPictures()

    }



    return (

        <div>
            <h1 className="text-warning">hello {user.name} your pictures:</h1>
            
            <Link className="btn btn-secondary" to="/addPicture">add picture</Link>

            {imgs !== [''] ?
                <>
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div className="col-1 h3 text-secondary">delete</div>
                            <div className="col-1 text-secondary h3">date</div>
                            <div className="col text-secondary h3">explanation</div>
                            <div className="col text-secondary h3">show</div>
                            <div className="col-1 text-secondary h3">title</div>
                        </div>
                        {imgs.map(imgSrc => (
                            <div className="row border border-secondary mt-2" key={imgSrc.url} style={{ direction: "rtl" }}>
                                <div className="col-1">
                                    <label>{imgSrc.title}</label>
                                </div>
                                <div className="col">
                                    {imgSrc.media_type === 'video' ?
                                        <video style={{ borderColor: 'red' }} width="420" height="240" controls allow='autoplay; encrypted-media'
                                            allowfullScreen>
                                            <source src={imgSrc} type="video/ogg"></source>
                                            <source src={imgSrc.url} type="video/mp4"></source>

                                        </video>

                                        :
                                        <img width="420" height="240" src={imgSrc.url}></img>}
                                </div>
                                <div className="col">
                                    <p className="font-weight-bold">{imgSrc.explanation}</p>
                                </div>
                                <div className="col-1">
                                    <p>{imgSrc.date}</p>
                                </div> 
                                <div className="col-1">
                                    <button className="btn btn-warning" onClick={() => deletPicture(imgSrc._id)} >delete</button>
                                </div>
                            </div>))
                            }
                    </div>
          
</>
:"loading"}
          </div>
       

    )


})