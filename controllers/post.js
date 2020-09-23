const Post = require('../models/post')
const User = require('../models/user')
const Profile = require('../models/profile')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')



exports.getPostById = (req,res,next,id) => {
    Post.findById(id).exec((err,post) => {
        if (err || !post) {
            return res.status(400).json({
                error:"NO Post found"
            })
        }
        req.post = post
    })
}

exports.createPost = (req, res) => {

  const { description} = req.body

  if ( !description ){
    return res.status(400).json({
      error:"Please add fields"
    })
  }

  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.posts = undefined;
  req.profile.role = undefined;

  const post = new Post({
    postedBy: req.profile,
    description,  

  })
  post.save((err, post) => {
    if(err){
      console.log(err);
      return res.status(400).json({
        error:"Failed to save post"
      })
    } 
    res.json(post)
  })
}

exports.myPost = (req, res) => {
  Post.find({postedBy: req.profile})
  .populate("postedBy","_id username")
  .exec((err, myPost) => {
    if (err || !myPost){
      return res.status(400).json({
        error:"No post found"
      })
    }
    res.json(myPost)
  })
}

exports.getAllPosts = (req, res) => {
  Post.find()
  .populate("postedBy","_id username")
  .exec((err, posts) => {
    if(err || !posts){
      return res.status(400).json({
        error:"No Post found"
      })
    }
    res.json(posts)
  })
}

exports.deletePost = (req, res) => {
  let post = Post.findById(id)
  post.remove((err, deletePost)=>{
    if(err){
      return res.status(400).json({
        error:"Failed to delete post"
      })
    }
    res.json({
      message: "Post deleted",
      deletePost
    })
  })
}

exports.updatePost = (req, res) => {

}