import Cookie from "js-cookie";
import { MyProfileErrMssg } from "../../../utilities/AlertMessage";
import Breadcrumb from "../../commons/Breadcrumb/Breadcrumb";
import ProfileContentContainer from "../my_profile_dashboard/ProfileContentContainer";
import EditAccountContent from "./EditAccountContent";

export default function EditAccountDetailsMain() {
  // user info
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (userInfo?.user_name) {
    var bread_string = `My Profile/${userInfo?.user_name}/edit account details`;
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
        <EditAccountContent />
      </ProfileContentContainer>
    </>
  );
}
