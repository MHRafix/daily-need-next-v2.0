import Cookie from "js-cookie";
import React from "react";
import Order from "../../../../models/AllOrders";
import LayoutContainer from "../../../components/commons/layout/LayoutContainer";
import MyAllOrdersMain from "../../../components/my_profile_page/my_all_orders_page/MyAllOrdersMain";
import db from "../../../utilities/database";

export default function MyAllOrders({ all_orders }) {
  // filter out my orders
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  const my_orders = all_orders.filter(
    (order) => order.user_email === userInfo?.user_email
  );

  return (
    <>
      <LayoutContainer
        title="Manage orders"
        description="This is my all orders page of 'Daily Needs Grocery' web application."
      >
        <MyAllOrdersMain my_orders={my_orders} />
      </LayoutContainer>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const all_orders = await Order.find({});
  await db.disconnect();
  return {
    props: {
      all_orders,
    },
  };
}

// export async function getServerSideProps() {
//   const res = await fetch(
//     `${process.env.ROOT_URI}/api/manage_orders/my_orders`
//   );
//   const all_orders = await res.json();

//   return { props: { all_orders } };
// }
