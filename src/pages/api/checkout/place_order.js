import nc from "next-connect";
import Order from "../../../../models/AllOrders";
import db from "../../../utilities/database";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect(); // database connect here

  const order_data = req.body; // requested data here

  // order save to database using mongoose data model
  const newOrder = new Order(order_data);
  const placed = await newOrder.save();

  await db.disconnect(); // database disconnect here

  // conditionaly send data here
  if (placed) {
    console.log("newOrder");
    res.send({
      success: "Your order successfully placed!",
      order_id: newOrder._id,
    });
  } else {
    // error throw here
    res.send({ error: "Opps, something wrong!" });
  }
});

export default handler;
