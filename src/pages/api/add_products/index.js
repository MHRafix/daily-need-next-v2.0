import nc from "next-connect";
import AllProducts from "../../../../models/AllProducts";
import db from "../../../utilities/database";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  if (req.body) {
    // create product
    const newProduct = new AllProducts(req.body);
    const added = await newProduct.save();
    await db.disconnect();

    // conditionaly send response
    if (added) {
      res.status(201).send({ success: "Product added successfully!" });
    } else {
      res.send({ error: "Opps, something wrong!" });
    }
  }
});

export default handler;
