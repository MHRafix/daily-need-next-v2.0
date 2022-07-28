import Cookie from "js-cookie";
import Order from "../../../../../../models/AllOrders";
import AllProducts from "../../../../../../models/AllProducts";
import User from "../../../../../../models/Users";
import AdminPannelLayoutContainer from "../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AdminDashboardMain from "../../../../../components/admin_pannel_components/components/admin_dashboard/AdminDashboardMain";
import ErrorPage from "../../../../../pages/404";
import db from "../../../../../utilities/database";

export default function AdminDashboard({
  all_orders,
  all_users,
  all_products,
}) {
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
        title="Admin Dashboard"
        description="This is admin dashboard of 'Daily Needs Grocery' web application."
      >
        <AdminDashboardMain
          all_orders={all_orders}
          all_users={all_users}
          all_products={all_products}
        />
      </AdminPannelLayoutContainer>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const all_orders = await Order.find({});
  const all_users = await User.find({});
  const all_products = await AllProducts.find({});
  await db.disconnect();

  return {
    props: {
      all_orders,
      all_users,
      all_products,
    },
  };
}

// export async function getServerSideProps() {
//   // all orders
//   const orders = await fetch(
//     `${process.env.ROOT_URI}/api/manage_orders/all_orders`
//   );
//   const all_orders = await orders.json();

//   // all products
//   const products = await fetch(`${process.env.ROOT_URI}/api/allproducts`);
//   const all_products = await products.json();

//   // all users
//   const users = await fetch(`${process.env.ROOT_URI}/api/all_users`);
//   const all_users = await users.json();

//   return { props: { all_orders, all_products, all_users } };
// }
