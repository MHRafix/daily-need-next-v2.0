import Head from "next/head";
import { useState } from "react";
import AdminPannelLeftNavigation from "../AdminPannelNavigation/AdminPannelLeftNavigation";
import AdminPannelTopNavigation from "../AdminPannelNavigation/AdminPannelTopNavigation";

export default function AdminPannelLayoutContainer({
  children,
  title,
  description,
}) {
  const [navigationOn, setNavigationOn] = useState(false);

  return (
    <div className="page_main_wrapper">
      <Head>
        <title>{title ? `Daily Needs - ${title}` : "Daily Needs"}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* app header is here */}
      <div className="dasboard_page_content_layout">
        <div className="layout_wrapper flex justify-between">
          {/* admin pannel header here */}
          <header
            className={
              navigationOn
                ? "admin_pannel_left_header_none"
                : "admin_pannel_left_header_half"
            }
          >
            <div className="left_navigation">
              <AdminPannelLeftNavigation setNavigationOn={setNavigationOn} />
            </div>
          </header>

          {/* admin pannel body is here */}
          <main
            className={
              navigationOn ? "admin_pannel_body_full" : "admin_pannel_body_half"
            }
          >
            <div className="right_content_body">
              <div className="grid">
                <div className="!p-1.4 bg-white border-b-1 border-b-slate-200">
                  <AdminPannelTopNavigation
                    setNavigationOn={setNavigationOn}
                    navigationOn={navigationOn}
                  />
                </div>
                <div className="p-1.4 text-normal">{children}</div>
                {/* <div className="p-2">
                //   admin pannel footer is here
                  <footer className="bg-slate-50 text-center">
                    Footer here
                  </footer>
                </div> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
