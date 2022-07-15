import Cookie from "js-cookie";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { profile_navigation } from "../../../fake_data/all_fakedata";
import UserPic from "../../../images/logo/1642355899259.jpg";
import ProfileNav from "../../../utilities/ProfileNav";

export default function ProfileNavigation() {
  // user info
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  // handle logout and remove user information cookie from the browser
  const history = useRouter();

  const handleLogout = () => {
    history.push("/my_account/my_acc");
    Cookie.remove("user_information");
    Cookie.remove("user_verify");
  };

  return (
    <div className="profile_details_wrapper">
      <div className="profile_details">
        <Image
          className="rounded-full my-5"
          src={UserPic}
          alt="Profile Picture"
          width={90}
          height={90}
        />
        <h3 className="text-deep_cyan font-semibold tracking-wide text-normal capitalize">
          {userInfo?.user_name}
        </h3>
        <button
          className="!text-sm tracking-wide"
          id="cart_btn"
          onClick={handleLogout}
        >
          Logout Now &nbsp; <MdLogout className="!text-normal" />
        </button>
      </div>
      <div className="profile_navigation_wrapper">
        {profile_navigation.map((nav) => (
          <ProfileNav key={nav._id} menu_data={nav} />
        ))}

        {userInfo?.user_admin && (
          <NextLink
            href={`/admin_pannel/${userInfo?.user_email}/${userInfo?.user_name}/admin_dashboard`}
            passHref
          >
            <div id="profile_nav_normal">
              <RiAdminFill /> &nbsp; Admin Pannel
            </div>
          </NextLink>
        )}
      </div>
    </div>
  );
}
