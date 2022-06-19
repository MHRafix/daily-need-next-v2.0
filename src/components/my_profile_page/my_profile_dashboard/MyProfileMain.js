import Cookie from "js-cookie";
import Breadcrumb from "../../commons/Breadcrumb/Breadcrumb";
import ProfileContentContainer from "./ProfileContentContainer";
import ProfileDashboardContent from "./ProfileDashboardContent";
export default function MyProfileMain({ my_orders }) {
  // breadcrunb navigation
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (userInfo?.user_name) {
    var bread_string = `My Profile/${userInfo?.user_name}/Dashboard`;
  }

  return (
    <>
      <Breadcrumb bread_nav={bread_string} />
      <ProfileContentContainer>
        <ProfileDashboardContent my_orders={my_orders} />
      </ProfileContentContainer>
    </>
  );
}
