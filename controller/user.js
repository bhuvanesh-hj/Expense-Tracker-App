exports.usersForm = (req, res, next) => {
  try {
    res.sendFile("index.html", { root: "views" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postSignUp = (req, res, next)=>{
    try {
        res.status(200).json({message:"Succesfully signedup"})
    } catch (error) {
        res.status(500).json({error:error});
    }
}
