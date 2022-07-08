import Image from "next/image";
import Logo from "../../../../images/logo/logo_black.webp";
import AdminPannelLeftNav from "../../admin_pannel_utilities/AdminPannelLeftNav";
import { admin_pannel_navigation } from "../admin_pannel_fake_data/adminPannelFakeData";

export default function AdminPannelLeftNavigation() {
  return (
    <div className="admin_pannel_navigation_wrapper">
      <div className="admin_pannel_brand px-2 py-1.3 border-b-1 border-b-slate-200">
        <Image src={Logo} alt="site logo" />
      </div>
      <div className="admin_pannel_navigation_link px-2 py-1">
        {admin_pannel_navigation.map((nav) => (
          <AdminPannelLeftNav key={nav?._id} nav_data={nav} />
        ))}
      </div>
    </div>
  );
}

// "dashboard"
// "manage products" => ("all products", "sale products", "fixed products", "limited offers products", "stock-in products", "stock-out products"),
// ("authentication") => (
//   "admin login", ("create user") => ("create moderator", "create admin"), "forgot password", "lock screen", "unlock screen",
//   "signout now"
// ),
// "manage orders" => ("place custom order", "all orders", "pendding orders", "inprogress orders", "completed orders", "canceled orders"),
// "my profile" => ("my profile dashboard", "edit profile details")
// "notification list",
// "mail" => ("all mails", "mail inbox", "sent mail", "compose mail"),
// "users" => ("all users", "all customers", "all admin", "all moderator")
// "manage sliders" => ("all sliders", "add slider")
