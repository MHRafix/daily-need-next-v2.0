import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MyProfileErrMssg } from "../../../utilities/AlertMessage";
import Breadcrumb from "../../commons/Breadcrumb/Breadcrumb";
import ProfileContentContainer from "../my_profile_dashboard/ProfileContentContainer";
import EditAccountContent from "./EditAccountContent";
export default function EditAccountDetailsMain() {
  const router = useRouter();

  // user info
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  const user_isverified =
    Cookie.get("user_verify") && JSON.parse(Cookie.get("user_verify"));

  // if is not logged in then redirect to login page
  useEffect(() => {
    if (!user_isverified) {
      router.push("/my_account/my_profile/verify_user");
    }
  });

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
