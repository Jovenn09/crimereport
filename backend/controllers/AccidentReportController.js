const asyncHandler = require('express-async-handler')
const Accident = require('../models/AccidentReportModel')

//Get All Accident Report
//@route GET /api/accident-report
//@access Public
const getAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.find({Accident})
    res.status(200).json(accidentRecord)
})

//Get One Accident Report
//@route GET /api/accident-report/:id
//@access Public
const getOneAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }
    
    res.status(200).json(accidentRecord)
})

//Get Multiple Accident Report
//@route GET /api/accident-report/:ids
//@access Public
const getMultiAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.find({Accident})
    res.status(200).json(accidentRecord)
})


//Post an Accident Report
//@route POST /api/accident-report
//@access Public
const postAccident = asyncHandler (async (req, res) => {
    const { 
        date,
        location,
        description,
        fatalities,
        injured,
        vehicle_type
     } = req.body

    if(!date && !location && !description && !vehicle_type){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Accident Report exist
    const accidentRecordExist = await Accident.findOne({date, location, vehicle_type})

    if(accidentRecordExist){
        res.status(400)
        throw new Error('Accident Report already exist')
    }

    const accidentRecord = await Accident.create({
        date,
        location,
        description,
        fatalities,
        injured,
        vehicle_type
    })

    if(accidentRecord){
        res.status(201).json({
            _id: accidentRecord.id,
            date: accidentRecord.date,
            location: accidentRecord.location,
            description: accidentRecord.description,
            fatalities: accidentRecord.fatalities,
            injured: accidentRecord.injured,
            vehicle_type: accidentRecord.vehicle_type
        })
    } else {
        res.status(400)
        throw new Error('Cant add Accident Report')
    }
})


//Update an Accident Report
//@route PUT /api/accident-report/:id
//@access Public
const updateAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    const updatedAccidentRecord = await Accident.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedAccidentRecord)
})


//Delete an Accident Report
//@route DELETE /api/accident-report/:id
//@access Public
const deltAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    await accidentRecord.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Accident Report
//@route DELETE /api/accident-report/:ids
//@access Public
const deltMultiAccident = asyncHandler (async (req, res) => {
    const accidentRecord = await Accident.findById(req.params.id)

    if(!accidentRecord){
        res.status(400)
        throw new Error('Accident Report not found')
    }

    await accidentRecord.deleteMany()

    res.status(200).json({ id: req.params.id})
})

// status ito
const updateActionStatus = asyncHandler(async (req, res) => {
    try {
        const accidentRecord = await Accident.findById(req.params.id);

        if (!accidentRecord) {
            res.status(404).json({ error: 'Accident Report not found' });
            return;
        }

        accidentRecord.action_status = req.body.actionStatus; 

        
        await accidentRecord.save();

        res.status(200).json(accidentRecord);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update action status' });
    }
});

module.exports = {
    getAccident,
    getOneAccident,
    getMultiAccident,
    postAccident,
    updateAccident,
    deltAccident,
    updateActionStatus,
    deltMultiAccident
}