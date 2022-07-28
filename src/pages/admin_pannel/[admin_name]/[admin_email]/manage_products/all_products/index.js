import Cookie from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AllProducts from "../../../../../../../models/AllProducts";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AllProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/all_products/AllProductsMain";
import { addAllProducts } from "../../../../../../redux/all_data/action";
import db from "../../../../../../utilities/database";
import ErrorPage from "../../../../../404";

export default function AllProductsPage({ all_products }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addAllProducts(all_products));
  }, [all_products?.length]);

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
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <AllProductsMain all_products={all_products} />
      </AdminPannelLayoutContainer>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const all_products = await AllProducts.find({});
  await db.disconnect();

  return {
    props: {
      all_products,
    },
  };
}

// export async function getServerSideProps() {
//   // all products
//   const products = await fetch(`${process.env.ROOT_URI}/api/allproducts`);
//   const all_products = await products.json();

//   return { props: { all_products } };
// }
