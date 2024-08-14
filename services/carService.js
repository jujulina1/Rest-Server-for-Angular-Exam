const Car = require("../models/Car");


//BASE


//OK GETALL
async function getAll() {
        return await Car.find({}).lean();
}
//GET MY CARS
async function getMyCars(id) {
        return await Car.find({ userId: id }).lean();
}
//GET CAR BY ID
async function getById(id) {
        return await Car.findById(id)
}
//OK CREATE CAR
async function createCar(car) {
        return await Car.create(car);
}
//OK EDIT CAR
async function update(carId, car) {

        const { brand, model, description, year, image, price } = car
        await Car.findByIdAndUpdate(carId, { brand, model, description, year, image, price });
        car = await Car.findById(carId).lean();
        return car;


}
//OK DELETE CAR
async function deleteById(carId) {
        return await Car.findByIdAndDelete(carId).lean()

}
//GET CARs BY YEAR
async function getAllCarByYear() {
        return await Car.find().sort({ year: -1 }).lean();
}

module.exports = {

        getAll,
        getById,
        update,
        createCar,
        deleteById,
        getAllCarByYear,
        getMyCars
}