const isGuest = require('../middlewares/guards/isGuest');
const isUser = require('../middlewares/guards/isUser');
const {  getAll, getById, createCar, deleteById, update, getAllCarByYear, getMyCars} = require('../services/carService');
const { parseError } = require('../utils/parser');


const dataController = require('express').Router();

//OK GETCARS both
dataController.get('/cars', async(req, res)=> { //OK
    try {

        let cars = await getAll();
        res.status(200).json(cars)
 
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({message});
    
    }
    
});
//GET MY CARS only User
dataController.get('/mycars',isUser(), async(req, res)=> { //OK
    try {
       
        if (req.user) {
            let userId = req.user._id
            let cars = await getMyCars(userId);
            res.status(200).json(cars)
        }else{
            throw new Error({message: 'There is no User'})
        }
       
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({message});
    
    }
    
});
//CREATE CAR only User
dataController.post('/cars', isUser(),async(req, res)=> {
    try {

        const data = Object.assign({ userId: req.user._id}, req.body)
        const car = await createCar(data);
        res.status(200).json(car);
        
        
    } catch (error) {
       
        const message = parseError(error);
        res.status(400).json({message});
    }
    
});
//GET CAR BY YEARS both
dataController.get('/cars/year', async(req, res)=> { //OK
    try {
        
        let cars = await getAllCarByYear();
        res.status(200).json(cars);
 
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({message});
    
    }
    
});
//OK GET CAR BY ID both
dataController.get('/cars/:id', async(req, res)=> {
    try {

        const carId = req.params.id
        const car = await getById(carId);
        res.status(200).json(car);
        
        
    } catch (error) {
       
        const message = parseError(error);
        res.status(400).json({message});
    }
    
});
//OK EDIT only user
dataController.put('/cars/:id', isUser(), async(req, res)=> {
    try {

        const carId = req.params.id;
        const car = await update(carId, req.body);
        res.status(200).json(car);
        
        
    } catch (error) {
        
        const message = parseError(error);
        res.status(400).json({message});
    }
    
});
//OK DELETE only User
dataController.delete('/cars/:id',isUser(), async(req, res)=> {
    try {

        const carId = req.params.id
        const car = await deleteById(carId);
        res.status(200).json(car);
        
        
    } catch (error) {
       
        const message = parseError(error);
        res.status(400).json({message});
    }
    
});

module.exports = dataController;