const mongoose=require('mongoose')
const validate=require('mongoose-validator')

const pictureSchema=mongoose.Schema({
    date:{
type:Date,
},
explanation:{
    type:String
           

},
hdurl:{
type:String
},
"media_type": {
    type:String
},
        "service_version": {
            type:String
        },
        "title": {
            type:String
        },
        "url":{
type:String
        },
userId:[{
type:mongoose.Types.ObjectId,
ref:'User'}]
})
// pictureSchema.pre('save', function(req,res,next){
//   //  console.log("saving: %s (%s)", this.date)
//  const pic= pictureSchema.findOne({hdurl:req.body.hdurl})
//  .then(pic=>{
//      if(pic&&pic.user.include()
    
//  })

//     next()
//   })
module.exports=mongoose.model('Picture',pictureSchema)