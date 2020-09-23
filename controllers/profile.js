const Profile = require('../models/profile')
const User = require('../models/user')


exports.getProfileById = (req, res, next, id) => {
    Profile.findById(id)
    .populate("user")
    .exec((err, profile) => {
        if (err || !profile) {
            return res.status(400).json({
                error:"NO profile found",
            })
        }
        req.profile = profile;
        next();
    })
}

exports.getProfile = (req, res) => {
    //const { user, description, userpost} = profile
    return res.json(req.profile)
}

exports.userProfile = (req, res) => {

  const { user, description, userpost} = req.body
  

    
}

exports.getAllProfiles = (req, res) => {
  Profile.find().exec((err, profiles)=>{
    if (err || !profiles) {
      return res.status(400).json({
        error: "No profiles found"
      })
    }
    res.json(profiles)
  })
}