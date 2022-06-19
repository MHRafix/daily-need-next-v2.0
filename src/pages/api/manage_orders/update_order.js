import nc from "next-connect";
import Order from "../../../../models/AllOrders";
import db from "../../../utilities/database";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const req_data = req.body;
  const single_order = await Order.findOne({ _id: req_data.order_id });

  if (single_order) {
    single_order.payment_info.payment_method = req_data.payment_method;
    single_order.payment_info.payment_status = req_data.payment_status;
    single_order.payment_info.customer_name = req_data.customer_name;
    single_order.payment_info.customer_email = req_data.customer_email;
    single_order.payment_info.customer_phone = req_data.customer_phone;
    single_order.payment_info.payment_amount = req_data.payment_amount;
    single_order.payment_info.card_name = req_data.card_name;
    single_order.payment_info.created = req_data.created;
    single_order.payment_info.last4 = req_data.last4;
    single_order.payment_info.transaction = req_data.transaction;
    single_order.payment_info.order_id = req_data.order_id;

    console.log("from update order", single_order);

    await single_order.save();
    await db.disconnect();
    res.send(single_order);
  } else {
    res.send({ error: "Opps, something wrong!" });
  }
});

export default handler;
