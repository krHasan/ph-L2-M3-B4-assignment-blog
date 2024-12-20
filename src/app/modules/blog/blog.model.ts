import { Schema, model } from "mongoose";
import { BlogModel, TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog, BlogModel>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: {
            type: Schema.Types.ObjectId,
            required: [true, "User is required"],
            ref: "User",
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                return {
                    _id: ret._id,
                    title: ret.title,
                    content: ret.content,
                    author: ret.author,
                };
            },
        },
    },
);

//query middleware
blogSchema.pre("find", function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});

blogSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({
        $match: { isPublished: { $ne: false } },
    });
    next();
});

blogSchema.pre("findOne", function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});

//creating a custom static method
blogSchema.statics.isBlogExists = async function (id: string) {
    const existingBlog = await Blog.findById(id);
    return existingBlog;
};

export const Blog = model<TBlog, BlogModel>("blog", blogSchema);
