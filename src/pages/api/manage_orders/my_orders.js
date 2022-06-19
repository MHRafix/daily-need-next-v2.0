import nc from "next-connect";
import Order from "../../../../models/AllOrders";
import db from "../../../utilities/database";

const handler = nc();
handler.get(async (req, res) => {
  await db.connect(); // database connect here

  // find my order here
  const my_orders = await Order.find({
    user_email: "mehedi@gmail.com",
  });

  // conditionaly send data
  if (my_orders.length) {
    await db.disconnect(); // database disconnect here
    res.send(my_orders); // send data
  } else {
    // throw error here
    res.send({ error: "Opps, something wrong!" });
  }
});

export default handler;
