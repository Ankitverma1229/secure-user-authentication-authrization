import quizz from "../models/createQuiz.js";

export const createQuiz = async (req, res) => {
  const { question, options } = req.body;
  const user = req.user;

  try {
    if (user.role !== "admin") {
      return res
        .status(409)
        .json({ error: "This feature is only available for admin...!" });
    }
    if (!question) {
      return res
        .status(400)
        .json({ error: "Add any question first to create quiz" });
    }
    const existingQuestion = await quizz.findOne({question});
    if(existingQuestion){
        return res.status(400).json({error: "This quiz is already created"});
    }
    if (!options || options.length !== 4) {
      return res.status(400).json({ error: "options length must be 4" });
    }

   const newQuiz = await quizz.create({
      question,
      options,
    });

    return res
      .status(201)
      .json({ message: "Congratulation new quiz created successfully",  newQuiz });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getQuiz = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({error: 'Unable to find the quiz..!'});
    }
    try {
        const findQuiz = await quizz.findOne({_id:id});
        if(!findQuiz){
        return res.status(400).json({error: 'Unable to find the quiz..!'});

        }
        return res.status(200).json(findQuiz);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}