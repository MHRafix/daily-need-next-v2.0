import Image from "next/image";
import Logo from "../../../images/logo/logo_black.webp";

export default function FooterMain() {
  return (
    <>
      <div className="footer_main">
        <div className="container_wrapper">
          <div className="footer_main_grid_layout">
            <div className="brand_block">
              <div className="brand_wrapper">
                <Image src={Logo} alt="brnad_logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
