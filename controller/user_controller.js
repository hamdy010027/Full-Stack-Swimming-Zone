
const user = require('../models/user.models.js');
const { validationResult } = require("express-validator");
const status = require('../utils/statusTest');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const users = await user.find({},{"__v": false});
  res.json({status: status.success, data: {users}});
};

const registerUser = async (req, res) => {
    console.log(req.body);
    const {name,  email, password} = req.body; 

    const oldUser = await user.findOne({email: email});
    if (oldUser){
    return res.status(404).json({ status: status.fail, data: "user already found" });
}

    const newUser = new user({
        name,
        email,
        password: await bcrypt.hash(password, 10)
    });

    await newUser.save();

    res.status(201).json({status: status.success, data: {user: newUser}});
          
  };

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password) {
      return next(res.status(400).json({ status: status.fail, data: "Please provide email and password" }));
    }

    const FindUser = await user.findOne({ email: email });
        if (!FindUser){
      return next(res.status(404).json({ status: status.fail, msg: "User not found" }));
    }

    const matchedPassword = await bcrypt.compare(password, FindUser.password);

    if (FindUser && matchedPassword) {
      return next(res.status(200).json({ status: status.success, data: "Login successful" }));
    }
    else{
      return next ( res.status(500).json({ status: status.fail, data: "Password is incorrect" }));
    }


  };

  module.exports = {
    getAllUsers,
    registerUser,
    loginUser
  } ;