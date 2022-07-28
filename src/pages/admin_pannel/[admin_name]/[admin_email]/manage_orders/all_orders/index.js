import Cookie from "js-cookie";
import React from "react";
import Order from "../../../../../../../models/AllOrders";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AllOrdersMain from "../../../../../../components/admin_pannel_components/components/manage_orders/all_orders/AllOrdersMain";
import db from "../../../../../../utilities/database";

import ErrorPage from "../../../../../404";

export default function AllOrders({ all_orders }) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addAllProducts(all_products));
  // }, [all_products?.length]);

  // render error page
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (!userInfo?.user_admin) {
    return <ErrorPage />;
  }
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage orders of 'Daily Needs Grocery' web application admin pannel."
      >
        <AllOrdersMain all_orders={all_orders} />
      </AdminPannelLayoutContainer>
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
//   // all orders
//   const orders = await fetch(
//     `${process.env.ROOT_URI}/api/manage_orders/all_orders`
//   );
//   const all_orders = await orders.json();

//   return { props: { all_orders } };
// }
