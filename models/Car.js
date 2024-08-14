const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 12
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: value => value >= 1990 && value <=2023,
            message: 'Year must be between 1990 and 2023'
        }
    },
    image: {
        type: String,
        required: true,
        validate: /^https?/
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be possitive number']
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
  
});

module.exports = mongoose.model('Car', carSchema);