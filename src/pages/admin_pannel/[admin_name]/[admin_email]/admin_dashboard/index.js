import AdminPannelLayoutContainer from "../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AdminDashboardMain from "../../../../../components/admin_pannel_components/components/admin_dashboard/AdminDashboardMain";

export default function AdminDashboard() {
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
