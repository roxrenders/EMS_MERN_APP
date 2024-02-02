import User from '../models/userModel.js'
import  Jwt  from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  
  try {
    const {
      firstName,
      lastName,
      location,
      jobTitle,
      email,
      password,
    } = req.body;

    const userExist = await User.findOne({email});

    if (userExist){
      return res.status(400).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      location,
      jobTitle,
      email,
      password:passwordHash,
      
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY);
    delete user.password;

    res.status(200).json({success:'true', token, user });

  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};



export const logout = (req, res) => {
  res
    .status(200)
    .clearCookie('token', { httpOnly: true })
    .json({ success: true, message: 'Logged Out' });
};


export const userProfile = async(req, res,next) => {

 const user = await User.findById(req.user.id)
 delete user.password;

 res.status(200).json({
  success:true,
  user
 })

};
