import Head from "next/head";
import Image from "next/image";
import React from "react";

const SplashScreen = () => {
  return (
    <div
        className="flex justify-center items-center flex-col h-screen"
      style={{ backgroundColor: "#1e2533" }}
    >
      <Head>
        <title>Fat Renard Loading...</title>
      </Head>
      <img
        src="/fox_logo.svg"
        alt="logo"
          width={550}
          height={550}
      />
      <div className="text-2xl text-white">Loading...</div>
      <div style={{ position: "absolute", bottom: 10, textAlign: "center", color: 'white' }}>
        <div>
          Fat Renard
        </div>
        <div>
          V1.0
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
