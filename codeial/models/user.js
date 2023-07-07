import mongoose  from "mongoose";

import multer from "multer"
import path from "path" 

const Avatar_Path=path.join('/uploads/users/avatar');
const __dirname = path.resolve();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type:String,
    }
}, {
    timestamps: true
});
console.log("******palasjh ",__dirname,"******palasjh ")
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("******palasjh ",__dirname,"******palasjh ")
      cb(null,path.join(__dirname,'.', Avatar_Path))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.fieldname)
    }
  })

  // static 
  userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
  userSchema.statics.avatarPath=Avatar_Path;

const User = mongoose.model('User', userSchema);

export default User;