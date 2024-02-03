import mongoose from "mongoose";

const blogSchena = new mongoose.Schema({
    title:{
        type: String
    },
    category:{
        type :mongoose.Schema.Types.ObjectId,
        refer:"categories"
    },
    description:{
        type: String
    },
    thumnail: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        refer:"users"
    }
})

const blogModel = mongoose.model("blogs",blogSchena)
export default blogModel