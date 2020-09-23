const express = require('express');
const router = express.Router()

const {} = require('../models/user')
const {} = require ('../models/profile')
const { getProfileById, userProfile, getProfile, getAllProfiles } = require ('../controllers/profile');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//params
router.param("userId", getUserById)
router.param("profileId",getProfileById)

//Actual routes
router.get('/profile/:profileId', isSignedIn, isAuthenticated, getProfile)
router.post('/profile/create/:userId', isSignedIn, isAuthenticated, userProfile)
router.get('/profiles',getAllProfiles)

module.exports = router;