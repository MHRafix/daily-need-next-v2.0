import nc from "next-connect";
import User from "../../../../../models/Users";
import db from "../../../../utilities/database";

// products getting function here
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const all_users = await User.find({});
  await db.disconnect();
  res.status(401).send(all_users);
});

// function export here
export default handler;
