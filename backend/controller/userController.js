const registerUser = (req , res) => {
    const {f_name, l_name, dob, gender, m_mail, password } =req.body;
    if(!f_name || !l_name || !dob || !gender || ! m_mail || !password) {
        res.status(400)
        throw new Error('Please enter the relevent field')
    }
    res.json({
        f_name, l_name, dob, gender, m_mail, password
    });
};

module.exports = {
    registerUser,
}