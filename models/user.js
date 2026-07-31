import mongoose from 'mongoose';

//user schema
const userSchema = new mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required: true,
            maxlength: 50,
        },
        middleName:{
            type:String,
            maxlength:50,
        },
        lastName:{
            type:String,
            maxlength: 50,
        }
    },
    mobileNo:{
        type:String,
        unique:true,
        sparse: true,
        minlength:10,
        maxlength:13,
        match: /^(\+?[0-9]{1,3})?[0-9]{10}$/,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        unique:true,
        sparse: true,
        lowercase:true,
        trim:true,
    },
    address:{
        houseNoOrGullyName:{
            type:String,
        },
        city:{
            type:String,
        },
        pin:{
            type:String,
        },
        state:{
            type:String,
        }

    },
    gender:{
        type:String,
        enum:['male','female','other'],
        default:'male',
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    otp: {
        type: String,
    },
    otpExpires: {
       type: Date,
    },

    // cart:[{
    //     productId:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Product",
    //         required:true,
    //     },
    //     quantity:{
    //         type:Number,
    //         default:1,
    //         min:1,
    //     },
    // }],
    
},{timestamps:true});

//comapre password function
userSchema.methods.comparePassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User',userSchema);

export default User;