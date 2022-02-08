import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    creatorName: String,
    createdBy: String,
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostModel = mongoose.model('Posts', postSchema);

export default PostModel;