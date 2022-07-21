import React from "react";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import AdminDashboardContent from "./AdminDashboardContent";

export default function AdminDashboardMain() {
  return (
    <>
      {/* breadcrunb */}
      <AdminPannelBreadcrumb page_name="admin dashboard" />

      {/* others content  */}
      <AdminDashboardContent />
    </>
  );
}
