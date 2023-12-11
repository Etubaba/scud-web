import { Provider } from "react-redux";
import { Footer } from "../components/footer/Footer";
import MobileFooter from "../components/footer/MobileFooter";
import Header from "../components/nav/Header";
import HeadSEO from "../components/nav/HeadSEO";
import MobileHeader from "../components/nav/MobileHeader";
import { store } from "../features/store";
import { useRouter } from "next/router";
import { adminPaths } from "../components/common/adminpaths";
import { SnackbarProvider } from "notistack";
import "react-quill/dist/quill.snow.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const Layout = Component.getLayout || (({ children }) => <>{children}</>);

  const router = useRouter();

  const checkPath = () => {
    return adminPaths.includes(`${router.pathname}`);
  };

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <HeadSEO />
        <div className="font-gilroyRegular">
          {!checkPath() && (
            <>
              {" "}
              <MobileHeader />
              <Header />
            </>
          )}
          <Layout>
            <Component {...pageProps} />
          </Layout>

          {!checkPath() && (
            <>
              <Footer />
              <MobileFooter />
            </>
          )}
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default MyApp;
