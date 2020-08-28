const Profile = require('../models/profile')
const User = require('../models/user')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProfileById = (req, res, next, id) => {
    Profile.findById(id)
    .populate("user")
    .exec((err, profile) => {
        if (err || !profile) {
            return res.status(400).json({
                error:"NO profile found",
            })
        }
        req.userprofile = profile;
        next();
    })
}

exports.getProfile = (req, res) => {
    //const { user, description, userpost} = profile
    return res.json(req.profile)
}

exports.createProfile = (req, res) => {

    let form = new formidable.IncomingForm();
  form.keepExtensions = true; 

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { user, description, userpost } = fields;

    if (!user && !description  ) {
      return res.status(400).json({
        error: "Please include at least one field"
      });
    }

    let profile = new Profile(fields)

    //handle file here

    if (file.photo) {
        if (file.photo.size>3000000) {
            return res.status(400).json({
                error: "File is too large"
            })
        }

        profile.photo.data = fs.readFileSync(file.photo.path)
        profile.photo.contentType = file.photo.type
    }

    //save to DB
    profile.save((err, profile) => {
        if (err) {
          res.status(400).json({
            error: "Saving profile failed"
          });
        }
        res.json(profile);
      });
    
})
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