const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
    f_name:{
        type:String,
        require:true
    },
    l_name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    m_mail:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:false,
        default:null
    },
    otp:{
        type:Number,
        require:false,
        dafault:null,
    }
},{
    timestamps:true,
});


module.exports = mongoose.model('Users',userSchema);