import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
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
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
});

const SubCategory =
    mongoose.model.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;
