import Cookie from "js-cookie";
import React from "react";
import ErrorPage from "../../../../pages/404";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function AdminDashboardMain() {
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (!userInfo?.user_admin) {
    return <ErrorPage />;
  }
  const bread_nav = "admin dashboard";
  return (
    <>
      <AdminPannelBreadcrumb page_name="admin dashboard" />
      Admin pannel dashboard....!
    </>
  );
}
