import { model, models, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true } );

CommentSchema.plugin(mongoosePaginate);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
