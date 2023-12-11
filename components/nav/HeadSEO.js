import Head from "next/head";
import { WEBSITE_BASE_URL } from "../../api/base";

export default function Heads() {
  return (
    <Head>
      <title>Request a Ride 24/7 | Scud</title>
      <meta name="title" content="Request a Ride 24/7 | Scud" />
      <meta charSet="UTF-8" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/scudLogo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Sacramento&display=swap"
        rel="stylesheet"
      ></link>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap"
        rel="stylesheet"
      ></link>

      <meta
        prefix="og: http://ogp.me/ns#"
        name="title"
        property="og:title"
        content="Request a Ride 24/7 | Scud"
      />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="og:description"
        name="description"
        content="Get on the move within minutes by requesting a ride through Scud. Accessible in over 100 cities across 20+ states in Nigeria, simply download the Scud app on your iOS or Android device"
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
      <meta prefix="og: http://ogp.me/ns#" property="og:url" content={`${WEBSITE_BASE_URL}`} />
      <meta prefix="og: http://ogp.me/ns#" property="og:title" content="Scud " />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="og:description"
        content="Get on the move within minutes by requesting a ride through Scud. Accessible in over 100 cities across 20+ states in Nigeria, simply download the Scud app on your iOS or Android device"
      />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="og:image"
        content="https://res.cloudinary.com/findprosper/image/upload/v1688556428/meta2_oo5skq.png"
      />

      {/* <!-- Twitter --> */}
      <meta prefix="og: http://ogp.me/ns#" property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${WEBSITE_BASE_URL}`} />
      <meta property="twitter:title" content="Request a Ride 24/7 | Scud" />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="twitter:description"
        content="Get on the move within minutes by requesting a ride through Scud. Accessible in over 100 cities across 20+ states in Nigeria, simply download the Scud app on your iOS or Android device"
      />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/findprosper/image/upload/v1688556428/meta2_oo5skq.png"
      />
    </Head>
  );
}
