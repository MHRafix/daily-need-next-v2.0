import nc from "next-connect";
import AddProduct from "../../../../models/PostProducts";
import db from "../../../utilities/database";

// products getting function here
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await AddProduct.find({});
  await db.disconnect();
  res.send(products);
});

// function export here
export default handler;
