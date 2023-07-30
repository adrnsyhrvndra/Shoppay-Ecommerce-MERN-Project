import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: [2, "Please enter at least 2 characters"],
            maxLength: [2, "Please enter at most 2 characters"],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category =
    mongoose.model.Category || mongoose.model("Category", productSchema);

export default Category;
