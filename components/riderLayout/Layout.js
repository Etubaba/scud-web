import React from "react";
import ProfileHeader from "./ProfileHeader";
import SideNav from "./SideNav";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { handleSignupLevel } from "../../features/scudSlice";
import { getToken } from "../services/refresh";

function Layout({ children }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const show = useSelector((state) => state.scud.resizeDiv);
  const isLoggedIn = useSelector((state) => state.auth.isRiderLoggedIn);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const router = useRouter();
  typeof window !== "undefined" ? (document.body.style.overflow = "hidden") : null;
  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === "false") {
      dispatch(handleSignupLevel(1));
      router.push("/signin/rider-signin", undefined, { shallow: true });
    }

    if (
      userDetails?.firt_name === null ||
      userDetails?.last_name === null ||
      userDetails?.email === null
    ) {
      enqueueSnackbar("Complete Your profile to continue", {
        variant: "info"
      });
      router.push("/signup/rider-signup");
      dispatch(handleSignupLevel(3));
    }
    getToken();
  }, []);

  if (!isLoggedIn || isLoggedIn === "false" || userDetails?.firt_name === null) return <></>;
  return (
    <div className={"w-full overflow-hidden"}>
      <ProfileHeader />
      <div className="flex flex-col justify-between lg:flex-row md:space-y-3 lg:space-y-0 ">
        {show && (
          <div
            id="rider adminend"
            className="w-full animate__animated hidden md:block  shadow-md  fixed  border-r lg:h-full  lg:w-1/6 pb-24 bg-white"
          >
            <SideNav />
          </div>
        )}
        <section
          id="adminbox"
          className={
            show
              ? "w-full md:w-5/6    2xl:ml-[16rem] shadow-md md:ml-[13.3rem] md:fixed  bg-[#FDFDFF] h-full pb-24 overflow-y-scroll"
              : "w-full   shadow-md   fixed  bg-[#FDFDFF] h-full pb-24 overflow-y-scroll"
          }
        >
          {children}
        </section>
      </div>
    </div>
  );
}

export default Layout;
