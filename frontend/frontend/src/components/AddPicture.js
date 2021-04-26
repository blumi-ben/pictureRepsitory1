import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { saveMyPicture} from './connectServer/userController'



export default withRouter(function AddPicture(props) {
    const { user } = props
    const [imgs, setImgs] = useState([{}])
    


    useEffect(function () {
        fetch('https://api.nasa.gov/planetary/apod?api_key=vae7AaeOdC3D73amFB3K12TemhIeOlSqHt07kqSq&hd=true&count=60')
            .then((data) => {
                data.json()
                    .then((res) => {
                        console.log(res);
                        imgs.push(res)
                        setImgs([...res])
                        console.log(imgs);



                    })
            })
            .catch(err => console.log(err))
    }, [])



    
    async function save(img) {
        debugger;

        try {
            const res = await saveMyPicture(user._id,img)
         if(res.status==200)
         alert('picture saved')
         else
         alert('can not save')


        }


        catch {
            console.log("error!!!!")
        }

    }
    return (

  
<>



<div>
            <h1 className="text-warning">hello {user.name} you can choose picture:</h1>

            {imgs != [''] ?
                <>
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div className="col-1 h3 text-secondary">save</div>
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
                                    <button className="btn btn-warning" onClick={() => save(imgSrc._id)} >save</button>
                                </div>
                            </div>))
                            }
                    </div>

                    </>
:"loading"}
          </div>
       


    
</>
    )


})

