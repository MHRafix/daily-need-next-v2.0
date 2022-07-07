import Head from "next/head";
import AdminPannelNavigation from "../AdminPannelNavigation/AdminPannelNavigation";

export default function AdminPannelLayoutContainer({
  children,
  title,
  description,
}) {
  return (
    <div className="page_main_wrapper">
      <Head>
        <title>{title ? `Daily Needs - ${title}` : "Daily Needs"}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* app header is here */}
      <div className="dasboard_page_content_layout">
        <div className="layout_wrapper flex justify-between items-center">
          {/* admin pannel header here */}
          <header className="w-2/12 bg-white border-r-1 border-r-slate-200 h-screen">
            <div className="left_navigation">
              <AdminPannelNavigation />
            </div>
          </header>

          {/* admin pannel body is here */}
          <main className="w-10/12 bg-slate-50 border-r-1 border-r-slate-200 h-screen">
            <div className="right_content_body">
              <div className="grid gap-y-10">
                <div className="p-2.4 bg-white border-b-1 border-b-slate-200">
                  Header2
                </div>
                <div className="p-2">{children}</div>
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
