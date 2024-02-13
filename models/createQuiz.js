import mongoose from "mongoose";

const newQuiz = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options: {
        type:[{}],
        required: true
    }
},
{
    timestamps:true
})

export default mongoose.model('quizz', newQuiz);