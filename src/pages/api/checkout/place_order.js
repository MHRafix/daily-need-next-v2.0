import nc from "next-connect";
import Order from "../../../../models/AllOrders";
import db from "../../../utilities/database";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const order_data = req.body;
  const new_order = new Order(order_data);
  await new_order.save();
  await db.disconnect();
  res.send({
    success: "Your order successfully placed!",
    order_id: new_order._id,
  });
});

export default handler;
