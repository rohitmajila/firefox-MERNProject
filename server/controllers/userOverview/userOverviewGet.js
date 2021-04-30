import userOverview from '../../models/userOverview.js';

export const userOverviewGet = async (ctx, next) => {
    try {
        const email = ctx.params.email
        const data = await userOverview.findOne({ email: email })
        if (!data) throw Error("No Data Found");

        ctx.res.status(200).json({ userData: data })
    } catch (error) {
        ctx.res.status(404).json({ msg: error.message })

    }

}