import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try{
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      console.log('All fields are required');
      return res.status(400).json({message:"All fields are required"});

      
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({message:"Username or email is already exist."});
      console.log('Username or email already exists');
    }
  
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  
    try {
      await newUser.save();
      res.json('Signup successful');
    } catch (error) {
      next(error);
    }
  }
  catch(error){
    console.log("Error in signup controller",error)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return res.status(400).json({message:"All fields are required"});
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({message:"User not found"});
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign(
      { id: validUser._id},
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
