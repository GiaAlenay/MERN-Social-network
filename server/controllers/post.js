import Post from "../models/Post.js"
import User from "../models/User.js"
export const getFeedPost=async(req,res)=>{
    try {
        const allPosts= await Post.find()
        res.status(201).json(allPosts)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

export const getUserPosts=async(req,res)=>{
    try {
        const {id}=req.params;
        const allPosts= await Post.find({userId:id})
        res.status(201).json(allPosts)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

export const likePost=async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body
        const findPost= await Post.find(id)
        const isLiked= findPost.likes.get(userId) 

        if (isLiked) {
            findPost.likes.delete(userId);
        }else{
            findPost.likes.set(userId,true)
        }

        const updatedPost=await findByIdAndUpdate(
            id, {likes:findPost.likes},{new:true}

        )
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

export const createPost=async(req,res)=>{
    try {
        const {userId,description,picturePath}=req.body;
        const findUser= await User.findById(userId)
 
            const newPost= new Post({
                userId,
                firstname:findUser.firstname,
                lastname:findUser.lastname,
                location:findUser.location,
                userPicturePath:findUser.picturePath,
                description,
                picturePath,
                likes:{},
                comments:[]
            })            
        
        
        const savedPost= await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}