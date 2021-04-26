const User = require('../models/user')
const Picture = require('../models/picture')
const request = require('request')
const jwt = require('jsonwebtoken')
//const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
//let path = require('path');

const upload = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images');
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    let upload = multer({ storage, fileFilter });

    // router.route('/add').post(upload.single('photo'), (req, res) => {
    //     const name = req.body.name;
    //     const birthdate = req.body.birthdate;
    //     const photo = req.file.filename;

    //     const newUserData = {
    //         name,
    //         birthdate,
    //         photo
    //     }


}

const deletPicture = async (req, res) => {
    //  try {

    //       const myPicture = await Picture.findById(req.params.pictureId);
    //   //const user=await User.findByIdAndUpdate(myPicture.userId, { $pull: { picture: myPicture._id } })
    // //         await Picture.findByIdAndDelete(req.params.pictureId)
    // //        res.json({user:user});
    // //    res.json({picture:myPicture})
    // //    //res.send({picture:myPicture})
    // console.log('success')
    //     } catch (err) {
    //         console.log(err)
    //     }

    // console.log('l;')
    try {
        console.log('try to delete');
        const myPicture = await Picture.findById(req.params.pictureId);
        console.log(myPicture)
        const user = await User.findByIdAndUpdate(myPicture.userId, { $pull: { picture: myPicture._id } })
        await Picture.findByIdAndDelete(req.params.pictureId)
        // res.json({ user: user });
        //  res.json({picture:myPicture})
        res.status(200).send({ picture: myPicture })
    } catch (err) {

        console.log(err)
        res.status(400).send(err)
    }

    // try {

    //     const myWeather = await Weather.findById(req.params.weatherId);
    //   const user=await User.findByIdAndUpdate(myWeather.userId, { $pull: { weather: myWeather._id } })
    //     await Weather.findByIdAndDelete(req.params.weatherId)
    //   // res.json({user:user});
    // //  res.json({weather:myWeather})
    // res.send({weather:myWeather})
    //    console.log('success')
    // } catch (err) {
    //     console.log(err)
    // }



}
const saveMyPicture = async (req, res) => {

    console.log('try to save');
    console.log(req.body);
    const myPicture = new Picture({
        date: req.body.date, explanation: req.body.explanation, hdurl: req.body.hdurl, media_type: req.body.media_type,
        service_version: req.body.service_version, title: req.body.title, url: req.body.url, userId: req.params.userId
    })
    console.log("pict" + myPicture);
    //  אם התמונה לא קיימת בכלל-מוסיפים אותה
    Picture.findOne({ url: myPicture.url, date: myPicture.date }).then(pic => {
        console.log('the pic' + pic);
        if (!pic) {
            console.log('no pic');
            myPicture.save()
                .then(picture => {
                    User.findByIdAndUpdate({ _id: req.params.userId },
                        { $push: { 'picture': picture._id } })

                        .then(user => {
                            Picture.findByIdAndUpdate({ _id: picture._id }, { $push: { 'userId': user._id } })
                                .then(p => {
                                    console.log(p);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            console.log(user)
                        })
                        .catch(err => {
                            console.log('error from update' + err)
                        })
                    console.log('saved');
                    // console.log(currentPicture)
                    //               res.send({picture:currentPicture})

                })
                .catch(err => {
                    res.status(400).send('error from save' + err)
                })
        }
        else {
            //  אם היא כן קיימת לבדוק האם יש לה את המשתמש

            let exist = pic.userId.includes(req.params.userId)
            console.log(exist);
            if (!exist) {
                Picture.findOneAndUpdate({ _id: pic._id }, { $push: { 'userId': req.params.userId } })
                //  Picture.findByIdAndUpdate({ _id: pic._id }, { $push: { 'userId': req.params.userId } })
                //  Picture.updateOne({$push:{'userId':req.params.id}})
                .then(pict => {
                    //     if(!pict)
                    {
                        User.findByIdAndUpdate({ _id: req.params.userId }, { $push: { 'picture': pict._id } })
                        .then(user => {
                            //  Picture.findByIdAndUpdate({ _id: pic._id }, { $push: { 'userId': req.params.userId } })
                            console.log(user.picture);
                            // res.status(200).send( 'picture saved')
                        })
                    }
                    // res.send('user exist')

                    console.log('exist' + pict);

                })
                .catch(err => {
                    res.status(400)
                    console.log('error in arr' + err);
                })

            }
        }


        // .then(p=>{
        //     console.log(p)
        // })
        console.log(myPicture)
        res.status(200).send({ picture: myPicture })

    })

        .catch(err => {

            console.log(err)
        })





}
module.exports = { deletPicture, saveMyPicture, upload }