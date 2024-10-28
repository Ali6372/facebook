const asyncHandler = require ('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require ('bcrypt');
const nodemailer = require ('nodemailer');



const generateOTP = () => {
    const random = Math.random() * 999999
    const round = Math.round(random);
    return round;
}

const sendMail = (email,otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,  // Optional: Bypass self-signed certificate issues
    },
});


const option = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: 'Your OTP for Account verification',
    html:`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header img {
        width: 100px; /* Adjust size as needed */
        margin-bottom: 15px;
      }
      .header h2 {
        color: #0766FF;
        margin: 0;
      }
      .otp-box {
        background: #0766ff;
        color: white;
        text-align: center;
        padding: 15px;
        border-radius: 8px;
        font-size: 24px;
        margin: 10px 0;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
      }
      @media (max-width: 600px) {
        .container {
          padding: 15px;
        }
        .otp-box {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://logos-world.net/wp-content/uploads/2020/05/Facebook-Logo.png" alt="Facebook Logo">
        <h2>Welcome to Facebook!</h2>
        <p>We're glad to have you with us. Please verify your account.</p>
      </div>
      <div class="otp-box">${otp}</div>
      <div class="footer">
        <p>Where Facebook Verification OTP code is <strong>${otp}</strong>, please do not share it with anyone.</p>
      </div>
    </div>
  </body>
</html>
`
};


transporter.sendMail(option, (err , info) => {
    if(err){
        console.log(err.message)
    }else{
        console.log('Email send successfully');
    }
})
}



const registerUser = asyncHandler(async(req , res) => {
    const {f_name, l_name, dob, gender, m_mail, password } =req.body;
    if(!f_name || !l_name || !dob || !gender || ! m_mail || !password) {
        res.status(400)
        throw new Error('Please enter the relevent field')
    }

   

    const hashedPassword = await bcrypt.hash(password,10);


    const checkEmail = await userModel.findOne({
        m_mail,
    });

    if(checkEmail) {
        res.status(401);
        throw new Error('Email already taken..');
    }


    const otp = generateOTP()
     
    
    


    const createdUser = await userModel.create({
        f_name,
        l_name,
        dob,
        gender,
        m_mail,
        password : hashedPassword,
        otp,

    });

    sendMail(m_mail,otp);




    res.send(createdUser);
});

module.exports = {
    registerUser,
}