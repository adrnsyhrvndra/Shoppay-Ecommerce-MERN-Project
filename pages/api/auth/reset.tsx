import nc from "next-connect";
import db from "../../../utils/db";
import {validateEmail} from "../../../utils/validation";
import User from "../../../models/User";
import {createResetToken} from "../../../utils/token";
import {sendEmail} from "../../../utils/sendEmails";
import {resetEmailTemplate} from "../../../emails/resetEmailTemplate";

const handler = nc();
const bcrypt = require('bcrypt');

handler.post(async (req, res) => {

    try {

        // connectDb() sesuai yang di set di file utils/db.js
        await db.connectDb();
        const {user_id,password} = req.body;
        const user =  await User.findOne({ user_id });
        if(!user){
            return res.status(400).json({ message: "This Account does not exist." });
        }

        const cryptedPassword = await bcrypt.hash(password, 10);
        await user.updateOne({ password: cryptedPassword });

        res.json({
            email: user.email,
        });

        await db.disconnectDb();

        res.json({
            message: "An Email has been sent to your email.use it to reset your password.",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: error.message });

    }
});

export default handler;