import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../services/refresh";
import Header from "./Header";
import SideNav from "./SideNav";

function Layout({ children }) {
  const officerSidebar = useSelector((state) => state.scud.officerSideBar);

  typeof window !== "undefined" ? (document.body.style.overflow = "hidden") : null;

  const isLoggedIn = useSelector((state) => state.auth.isAdminIn);
  const user = useSelector((state) => state.auth.adminDetails);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === "false")
      router.push("/admin/auth", undefined, { shallow: true });

    if (isLoggedIn) getToken(true);
  }, []);
  if (!isLoggedIn || isLoggedIn === "false") return <></>;

  return (
    <div className={"w-full overflow-hidden"}>
      <div className="flex flex-col justify-between lg:flex-row space-y-3 lg:space-y-0 ">
        <div
          id="adminend"
          className={
            officerSidebar
              ? "w-full hidden lg:block shadow-md overflow-x-hidden  overflow-y-scroll fixed  border-r lg:h-full  lg:w-16 pb-2 bg-[#1E202B]"
              : "w-full hidden lg:block shadow-md  overflow-y-scroll fixed  border-r lg:h-full  lg:w-[18.5%] pb-2 bg-[#1E202B]"
          }
        >
          <SideNav />
        </div>
        <section
          id="adminbox"
          className={
            officerSidebar
              ? "lg:w-full flex flex-col space-y-0 w-full lg:ml-[4rem] 2xl:ml-[6rem] shadow-md  fixed  bg-[#FDFDFF]  "
              : "lg:w-5/6 w-full lg:ml-[14.6rem] 2xl:ml-[16rem] shadow-md  fixed  bg-[#FDFDFF]  "
          }
        >
          <Header />
          <div
            style={{ height: "calc(100vh - 4rem)" }}
            className={
              officerSidebar
                ? " p-3 md:p-5 pb-20 overflow-y-scroll h-screen lg:pr-20"
                : "p-3 md:p-5 pb-20 overflow-y-scroll h-screen lg:pr-12 "
            }
          >
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Layout;
