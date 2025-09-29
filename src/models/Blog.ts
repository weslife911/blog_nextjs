import { model, models, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

const BlogSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
    blogImage: {
        type: String
    },
    blogAuthorID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blogCategory: {
        type: String,
        required: true
    },
    blogTags: {
        type: [String],
        default: []
    },
    blogViews: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

BlogSchema.plugin(mongoosePaginate);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
