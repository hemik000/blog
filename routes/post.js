const express = require('express')
const router = express.Router()

const {getPostById, createPost, getAllPosts, deletePost, myPost, updatePost} = require('../controllers/post')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

//params 
router.param("userId",getUserById)
router.param("postId",getPostById)

//My Routes

//Create Post
router.post("/post/create/:userId", isSignedIn, isAuthenticated, createPost)

//My post
router.get("/post/:userId/mypost",isSignedIn, isAuthenticated, myPost)

//Delete post
router.delete("/post/delete/:postId/:userId", isSignedIn, isAuthenticated, deletePost)

//update post
router.put("/post/:postId/:userId", isSignedIn, isAuthenticated, updatePost)

//get all post for admin only
router.post("/posts", getAllPosts)

module.exports = router