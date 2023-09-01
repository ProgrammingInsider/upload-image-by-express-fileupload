import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// Here we creating schema
const ProfileSchema = new mongoose.Schema({
    username:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true,
        unique:[true,"There is a registeration by this email"]
    },
    phonenumber:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    bio:{
        type:"String",
        maxlength:[70,"Maximum 70 character biography is required"]
    },
    profilepic:{
        type:"String",
    }
})

ProfileSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10); // Generating 10 random bytes
    this.password = await bcrypt.hash(this.password,salt);

    next();
})

// Create Model
const Profile = mongoose.model('Profile',ProfileSchema);

export default Profile;