const { register, logout, login, getProfile, editProfile } = require('../services/userService');
const { body, validationResult, } = require('express-validator');
const { parseError } = require('../utils/parser');
const isGuest = require('../middlewares/guards/isGuest');
const isUser = require('../middlewares/guards/isUser');


const authController = require('express').Router();

//Ok REGISTER Guest
authController.post('/register', isGuest(),
    body('username').isLength({ min: 5 }).withMessage('Username should be at least 5 characters'),
    body('email').isEmail().withMessage('Invalid Email'),
    async (req, res) => {

        try {
            const { errors } = validationResult(req)

            if (errors.length > 0) {
                 throw errors;//Invalid Email

            }else {
                const user = await register(req.body.username, req.body.email, req.body.gender, req.body.password);
                res.status(200).json(user);
            }
           
        } catch (error) {

            const message = parseError(error);
            res.status(400).json({ message });

        }

});
//OK LOGIN Guest
authController.post('/login', isGuest(), async (req, res) => {


        try {
            const token = await login(req.body.username, req.body.password);
            res.status(200).json(token)
    
    
        } catch (error) {
    
            const message = parseError(error);
            res.status(401).json({ message });//Unauthorized
    
        }
    
});
//OK LOGOUT USER
authController.get('/logout', isUser(), async (req, res) => {
  
    try {
        const token = req.token
        await logout(token)
        res.status(204).send({ message: "Logout" });

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

});
//OK GET PROFILE - BOTH
authController.get('/profile', async (req, res) => {
    
    let profile = null;

    try {
            if (req.token) {
            const userId = req.user._id
            profile = await getProfile(userId);

            }
       
        res.status(200).send(profile);


    } catch (error) {

        const message = parseError(error);
        res.status(401).json({ message });

    }

});
//OK - EDIT PROFILE USER
authController.put('/profile/:id', isUser(), async (req, res) => {

    try {
       
        const { username, email, gender } = req.body
        const profile = await editProfile(req.params.id, username, email, gender);
        res.status(200).json(profile);


    } catch (error) {

        const message = parseError(error);
        res.status(401).json({ message });

    }

});




module.exports = authController;