import Image from "next/image";
import Logo from "../../../../images/logo/logo_black.webp";
import AdminPannelLeftNav from "../../admin_pannel_utilities/AdminPannelLeftNav";
import { admin_pannel_navigation } from "../admin_pannel_fake_data/adminPannelFakeData";

export default function AdminPannelLeftNavigation({ setNavigationOn }) {
  return (
    <div className="admin_pannel_navigation_wrapper">
      <div className="admin_pannel_brand flex justify-between items-center px-2 !py-1.65 border-b-1 border-b-slate-200">
        <Image src={Logo} alt="site logo" />
        <div className="header_action_icon2 lg:!hidden xs:block">
          <button
            onClick={() => setNavigationOn(false)}
            className="cross_admin_pannel_navigation"
          >
            ✖
          </button>
        </div>
      </div>
      <div className="admin_pannel_navigation_link pl-2 py-1">
        {admin_pannel_navigation.map((nav) => (
          <AdminPannelLeftNav key={nav?._id} nav_data={nav} />
        ))}
      </div>
    </div>
  );
}
