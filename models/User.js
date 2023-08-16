const {Schema, model, default: mongoose} = require('mongoose')


const userSchema = new Schema ({
    username: {
        type:String,
        required: true, 
        unique: true, 
        minlength: [5, 'Username should be at least 5 characters']
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    gender: {
        type: String, 
        required: true
    },
    hashedPassword: {
        type: String, 
        required: true}
    }
)
userSchema.index({email:1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})



module.exports =  mongoose.model('User', userSchema);