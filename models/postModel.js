import mongose from 'mongoose';

const postSchema = mongose.Schema({
    title: String,
    description: String,
    createdBy: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostModel = mongose.model('Posts', postSchema);

export default PostModel;