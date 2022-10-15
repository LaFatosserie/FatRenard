import Head from "next/head";
import React from "react";
import { CloudIcon } from '@heroicons/react/24/outline'

const Offline = () => (
  <>
    <Head>
      <title>Offline - Peuple</title>
    </Head>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e2533",
        height: "100vh",
        paddingLeft: "5vw",
        paddingRight: "2vw",
      }}
    >
      <CloudIcon style={{ color: "#c17b19", height: "10vh", width: "10vh" }} />
      <div style={{ marginLeft: "5vw", color: "#e6e6e6" }}>
        <h2>Oh Oh... It&apos;s seems you&apos;re offline...</h2>
        <p>Connect to access full app</p>
      </div>
    </div>
  </>
);

export default Offline;
