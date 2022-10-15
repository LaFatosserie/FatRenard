import React from 'react'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles: React.Children.toArray([initialProps.styles]) };
  }

  render() {
    return (
      <Html>
        <Head>
          {CssBaseline.flush()}
          <meta name="application-name" content="Fat Renard" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="FatRenard" />
          <meta name="description" content="Fat Renard - Chasse a l homme" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#1e2533" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1e2533" />

          <link
            rel="apple-touch-icon"
            href="/static/icons/touch-icon-iphone.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/icon-512.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/icon-32.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Fat Renard" />
          <meta
            property="og:description"
            content="Fat Renard - Chasse a l homme"
          />
          <meta property="og:site_name" content="Fat Renard" />
          <meta property="og:url" content="https://fatrenard.walsharthur.fr" />
        </Head>
        <body style={{ height: '100vh' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
