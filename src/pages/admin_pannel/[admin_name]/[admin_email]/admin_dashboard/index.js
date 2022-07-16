import Cookie from "js-cookie";
import AdminPannelLayoutContainer from "../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AdminDashboardMain from "../../../../../components/admin_pannel_components/components/admin_dashboard/AdminDashboardMain";
import ErrorPage from "../../../../../pages/404";

export default function AdminDashboard() {
  // error page
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
        <AdminDashboardMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
