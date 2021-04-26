const mongoose=require('mongoose')
const validate=require('mongoose-validator')

const userSchema=mongoose.Schema({
    name:{
type:String,
    required:true
},
    password:{
        type:String,
required:true,
min:8,
max:10
    },
        email:{
            type:String,
            validate: validate({
            validator:function(v){
                   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);

            },
            message:'email is not valid'
                })

},
picture:[{
type:mongoose.Types.ObjectId,
ref:'Picture'}]
});
module.exports=mongoose.model('User',userSchema)



    