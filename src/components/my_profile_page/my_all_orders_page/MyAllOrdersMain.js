import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { MyProfileErrMssg } from "../../../utilities/AlertMessage";
import Breadcrumb from "../../commons/Breadcrumb/Breadcrumb";
import ProfileContentContainer from "../my_profile_dashboard/ProfileContentContainer";
import MyAllOrdersContent from "./MyAllOrdersContent";

export default function MyAllOrdersMain() {
  // breadcrunb navigation
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  const history = useRouter();

  if (userInfo?.user_name) {
    var bread_string = `My Profile/${userInfo?.user_name}/manage all orders`;
  } else {
    // prevent fake user
    const bread_string = "fake user";

    return (
      <MyProfileErrMssg
        bread_string={bread_string}
        message="You are not logged in. Please login to explore more!"
      />
    );
  }

  return (
    <>
      <Breadcrumb bread_nav={bread_string} />
      <ProfileContentContainer>
        <MyAllOrdersContent />
      </ProfileContentContainer>
    </>
  );
}
