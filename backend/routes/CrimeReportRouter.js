const express  = require('express')
const { 
    getCrime, 
    postCrime, 
    updateCrime,
    deltCrime,
    getOneCrime,
    deltMultiCrime,
    updateCrimeStatus,
    getMultiCrime
} = require('../controllers/CrimeReportController')
const router = express.Router()

router.route('/').get(getCrime).post(postCrime)

router.route('/:id').put(updateCrime).delete(deltCrime).get(getOneCrime)

router.route('/:ids').delete(deltMultiCrime).get(getMultiCrime)

router.route('/:id/action-status').put(updateCrimeStatus);

module.exports = router