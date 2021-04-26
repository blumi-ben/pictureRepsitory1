const User = require('../models/user')
const Picture = require('../models/picture')
const request = require('request')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
let currentPicture2 = new Picture({})
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
function sendmailWelcome(email, name) {


    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'wellcom',
        // text:'hello'
        text: `hello ${name}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
// function sendMailPassword(email,name,password){
//     var mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: 'your password',
//         text: `${name} your password is ${password}`
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }
function sendMailPassword(name, mail, password) {
    console.log(name + ":" + mail + ":" + password);
    const mailOption = {
        from: process.env.EMAIL,
        to: mail,
        subject: 'Your password',
        text: `${name},\n Your password is: ${password}`
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log('error send mail: \n', err);

        }
        else { console.log('send mail success!'); }
    })

}

const login = (req, res) => {
    User.findOne({ name: req.query.name, password: req.query.password })
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET)
            res.status(200).json({ user, token })
        })
        .catch(err => res.status(404).send('not found user'))

}
const signUp = (req, res) => {
    const newUser = new User(req.body)
    console.log(req.body)
    newUser.save()
        .then(user => {
            console.log(user)
            res.status(200).send(user)
            sendmailWelcome(req.body.email, req.body.name)
        })
        .catch(err => {
            console.log(err)
        })





}
const requestApi = () => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: 'https://api.nasa.gov/planetary/apod?api_key=rTDrxyy82JvGffYsFNpHeR6JRY8nfSPhabDYC2KV'
        }
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })

}

const getAllPictures = (req, res) => {
    User.findById(req.params.userId)
        .populate({ path: 'picture' })
        .then(user => {
            //console.log(user.picture)
            res.status(200).json({ picture: user.picture })
        }).catch(err => {
            res.status400()
            console.log(err)
        })
    //console.log("getAllPictures")
}

const getPicture = async (req, res) => {
    requestApi().then(data => {
        const dataJson = JSON.parse(data)
        //  currentPicture= ({date:dataJson.date,explanation:dataJson.explanation,hdurl:dataJson.hdurl,media_type:dataJson.media_type,
        //  service_version:dataJson.service_version,title:dataJson.title,url:dataJson.url ,userId:req.params.userId})
        // console.log(dataJson)
        const currentPicture = new Picture({
            date: dataJson.date, explanation: dataJson.explanation, hdurl: dataJson.hdurl, media_type: dataJson.media_type,
            service_version: dataJson.service_version, title: dataJson.title, url: dataJson.url, userId: req.params.userId
        })
      //  אם התמונה לא קיימת בכלל-מוסיפים אותה
        Picture.findOne({ url: dataJson.url, date: dataJson.date }).then(pic => {
            if (!pic) {
                currentPicture.save()
                    .then(picture => {
                        User.findByIdAndUpdate({ _id: req.params.userId },
                            { $push: { 'picture': picture._id } })

                            .then(user => {
                                Picture.findByIdAndUpdate({_id:picture._id},{$push:{'userId':user._id}})
                                .then(p=>{
console.log(p);
                                })
                                .catch(err=>{
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
    
              let exist= pic.userId.includes(req.params.userId)
              console.log(exist);
      if(!exist)
      
            {  Picture.findOneAndUpdate({ _id: pic._id },{ $push: { 'userId': req.params.userId } })
              //  Picture.findByIdAndUpdate({ _id: pic._id }, { $push: { 'userId': req.params.userId } })
                    //  Picture.updateOne({$push:{'userId':req.params.id}})
                    .then(pict=> {
                    //     if(!pict)
                       {  User.findByIdAndUpdate({ _id: req.params.userId }, { $push: { 'picture': pict._id } })
                            .then(user => {
                              //  Picture.findByIdAndUpdate({ _id: pic._id }, { $push: { 'userId': req.params.userId } })
                                console.log(user.picture);
                                // res.status(200).send( 'picture saved')
                            })
                        }
                        // res.send('user exist')

                         console.log('exist'+pict);

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
            console.log(currentPicture)
            res.status(200).send({ picture: currentPicture })

        })
    })
        .catch(err => {
    
            console.log(err)
        })
}


const forgotPassword = (req, res) => {
    console.log(req.body.email);
    User.findOne({ name: req.body.name, email: req.body.email })
        .then(user => {
            // console.log(user)
            sendMailPassword(user.name, user.email, user.password)
            res.status(200).send('success')
           
                
            
           
        }).catch(err => {
            res.status(400).send(err)
        })
}
const deletPicture = async (req, res) => {
    try {

        const myPicture = await Picture.findById(req.params.pictureId);
        console.log(myPicture)
        const user = await User.findByIdAndUpdate(myPicture.userId, { $pull: { picture: myPicture._id } })
        await Picture.findByIdAndDelete(req.params.pictureId)
        res.json({ user: user });
        //  res.json({picture:myPicture})
        res.status(200).send({ picture: myPicture })
    } catch (err) {
        console.log(err)
    }


}

const savePicture = (req, res) => {

}

module.exports = { signUp, getPicture, getAllPictures, login, forgotPassword, deletPicture, savePicture }