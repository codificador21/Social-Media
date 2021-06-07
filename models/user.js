const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    },
    avatar: {
        type: String,
        default: "https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
    }
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null , path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//static
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;