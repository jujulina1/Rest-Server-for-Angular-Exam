module.exports = () => (req, res, next) =>{
   
    if (req.user) {
        res.status(400).json({message: 'You are already Logged in'})
    }else {
       next();
    }
};