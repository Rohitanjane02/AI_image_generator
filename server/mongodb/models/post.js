import mongoose from 'mongoose';

//creating a schema
const Post = new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
});

//create a model which name is Post
const PostSchema = mongoose.model('Post', Post);
export default PostSchema;

