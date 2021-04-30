import userOverview from '../../models/userOverview.js';


export const userOverviewPost = async (req, res) => {
    const email = req.params.email
    const checkUser = userOverview.findOne({ email: email })
    try {
        if (!checkUser) {
            const userOverviewData = new userOverview({
                introduction: req.body.introduction,
                language: req.body.language,
                discipline: req.body.discipline,
                skills: req.body.skills,
                email: req.body.email
            })

            const userData = await userOverviewData.save();
            if (!userData) throw Error("Something Went Wrong while Posting the data");

            res.status(200).json({
                message: "Data Post Sucessfully",
                id: userData.id,
                email: userData.email
            })
        }

        else {

            const userData = await userOverview.findOneAndUpdate({
                introduction: req.body.introduction,
                language: req.body.language,
                discipline: req.body.discipline,
                skills: req.body.skills,
                email: req.body.email
            })

            res.status(200).json({
                message: "Data Update Sucessfully",
                id: userData.id,
                email: userData.email
            })
        }
    }
    catch (error) {
        res.status(505).json({ message: error.message })
    }

}

