import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = PostModel(post)
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Post with such id not found')
    }

    const updatedPost = await PostModel.findByIdAndUpdate(_id, {...post, _id}, { new: true});
    
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Post with such id not found');
    }

    await PostModel.findByIdAndRemove(_id);

    res.json('Post deleted');
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Post with such id not found');
    }

    const post = await PostModel.findById(_id);
    const updatedPost = await PostModel.findByIdAndUpdate(_id, { likes: post.likes + 1 }, { new: true })
    res.json(updatedPost);
}