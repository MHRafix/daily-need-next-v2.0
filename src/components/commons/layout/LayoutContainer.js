import Head from "next/head";
import FooterFeaturesCard from "../Footer/FooterFeaturesCard";
import FooterMain from "../Footer/FooterMain";
import HeaderMain from "../Header/HeaderMain";

export default function LayoutContainer({ children, title, description }) {
  return (
    <div className="page_main_wrapper">
      <Head>
        <title>{title ? `Daily Needs - ${title}` : "Daily Needs"}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* app header is here */}
      <header>
        <HeaderMain />
      </header>
      {/* app body is here */}
      <main>
        <div className="container_wrapper">{children}</div>
      </main>

      {/* app footer is here */}
      <footer className="bg-slate-100">
        <FooterFeaturesCard />
        <FooterMain />
      </footer>
    </div>
  );
}
