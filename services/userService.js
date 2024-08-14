const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { parseError } = require('../utils/parser');

const secret = "skajfgjfaldksjfk'SLKFJKs";
const tokenBlackList = new Set();

//OK -------------------     LOGIN     -------------------------
async function login(username, password) {

    let user = await User.findOne({ username }).lean();

    if (!user) {
        throw new Error('Incorect username or password')

    }
    const match = await bcrypt.compare(password, user.hashedPassword);


    if (!match) {
        throw new Error('Incorect username or password');

    }

    user = createUser(user);
    return createToken(user)
}

//OK ----------------    REGISTER      ---------------
async function register(username, email, gender, password) {
    
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
   

    if (existingUsername) {
        throw new Error('Username has already used')
    }
    if (existingEmail) {
        throw new Error('Email has already used')
    }

    let user = await User.create({
        username,
        email,
        gender,
        hashedPassword: await bcrypt.hash(password, 10)// 
    });   
    user = createUser(user);
    return createToken(user)


}

//OK LOGOUT
async function logout(token) {
   
    tokenBlackList.add(token);

}
//OK
async function getProfile(userId) {



    const profile = await User.findOne({ _id: userId }).lean();
    const user = createUser(profile)

    if (!profile) {
        throw new Error('There is no such profile')
    }

    return createToken(user);

}
//OK
async function editProfile(userId, username, email, gender) {

 await User.findByIdAndUpdate(userId, { username: username, email: email, gender: gender });
    const profile = await User.findById(userId).lean();
    const user = createUser(profile)
    if (!profile) {
        throw new Error('There is no such profile')
    }

    return createToken(user);

}

//OK  FUNCTION TO CREATE TOKEN

function createToken(user) {
    

    const payload = {

        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender
    };

    const token = jwt.sign(payload, secret);
    
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        accessToken: token
    };

}

// OK PARSE TOKEN 

function parseToken(token) {

    if (tokenBlackList.has(token)) {
        throw new Error('Token is in Black list')
    }
    return jwt.verify(token, secret)
}
//OK CREATE USER
function createUser(obj) {

    return {
        _id: obj._id,
        username: obj.username,
        email: obj.email,
        gender: obj.gender
    }

}

module.exports = {
    login,
    register,
    logout,
    parseToken,
    getProfile,
    editProfile

}