import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../../models/Users";
import { signToken } from "../../../utilities/auth";
import db from "../../../utilities/database";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ user_email: req.body.user_email });

  if (
    user &&
    bcrypt.compareSync(req?.body?.user_password, user?.user_password)
  ) {
    // generate jwt token here
    const token = signToken(user);
    console.log(user);
    res.send({
      token,
      _id: user._id,
      user_name: user.user_name,
      user_email: user.user_email,
      user_admin: user.user_admin,
      success: "Login successfull!",
    });
  } else {
    res.send({ error: "Invalid email or password!" });
  }
  await db.disconnect();
});

export default handler;
