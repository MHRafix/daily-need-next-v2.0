import nc from "next-connect";
import AddProduct from "../../../../models/PostProducts";
import db from "../../../utilities/database";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  if (req.body) {
    // create user
    const newProduct = new AddProduct(req.body);
    const added = await newProduct.save();
    await db.disconnect();
    if (added) {
      res.send({ success: "Product added successfully!" });
    } else {
      res.send({ error: "Opps, something wrong!" });
    }
  }
});

export default handler;
