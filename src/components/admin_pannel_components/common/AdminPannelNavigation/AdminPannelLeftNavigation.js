import Image from "next/image";
import Logo from "../../../../images/logo/logo_black.webp";

export default function AdminPannelLeftNavigation() {
  return (
    <div className="admin_pannel_navigation_wrapper">
      <div className="admin_pannel_brand px-2 py-1.3 border-b-1 border-b-slate-200">
        <Image src={Logo} alt="site logo" />
      </div>
      <div className="admin_pannel_navigation_link"></div>
    </div>
  );
}
