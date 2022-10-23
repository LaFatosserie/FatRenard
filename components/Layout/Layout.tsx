import Nav from "./Nav";
import Head from "next/head";
import React, { Children } from "react";

export type TLayoutProps = {
  children: JSX.Element[] | JSX.Element;
  title: string;
};

const Layout = ({ title, children }: TLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title + " - Fat Renard"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main style={{ overflowX: "hidden", height: '100vh' }}>
        <Nav />
        {children}
        <div>

        </div>
      </main>
    </div>
  );
};

export default Layout;
