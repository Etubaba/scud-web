import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSignupLevel } from "../../features/scudSlice";
import { getToken } from "../services/refresh";
import ProfileHeader from "./ProfileHeader";
import SideNav from "./SideNav";

function Layout({ children }) {
  typeof window !== "undefined" ? (document.body.style.overflow = "hidden") : null;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isDriverLoggedIn);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === "false") {
      dispatch(handleSignupLevel(1));
      router.replace("/signin/driver-signin", undefined, {
        shallow: true
      });
    }
    if (isLoggedIn || isLoggedIn === "true") {
      if (
        userDetails?.firt_name === null ||
        userDetails?.last_name === null ||
        userDetails?.email === null ||
        userDetails?.gender === null
      ) {
        dispatch(handleSignupLevel(3));
        enqueueSnackbar("Complete Your profile to continue", {
          variant: "info"
        });
        router.push("/signin/driver-signin", undefined, { shallow: true });
      }
    }
    getToken();
  }, []);

  if (!isLoggedIn || isLoggedIn === "false") return <></>;

  return (
    <div className={"w-full overflow-hidden"}>
      <ProfileHeader />
      <div className="flex flex-col justify-between lg:flex-row space-y-3 lg:space-y-0 ">
        <div
          id="driver"
          className="w-full hidden lg:block shadow-md  overflow-y-scroll fixed  border-r lg:h-full  lg:w-1/6 pb-24 bg-white"
        >
          <SideNav />
        </div>
        <section className="lg:w-5/6 w-full lg:ml-[13.3rem] 2xl:ml-[16rem] shadow-md  fixed p-5 bg-[#FDFDFF] h-full pb-24 overflow-y-scroll">
          {children}
        </section>
      </div>
    </div>
  );
}

export default Layout;
