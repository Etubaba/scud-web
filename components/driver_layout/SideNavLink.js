import { useRouter } from "next/router";
import classNames from "classnames";
import { useDispatch } from "react-redux";
// import {
//   logout,
//   handleisAdminLoggedIn,
//   handleAdminDetails,
// } from "../../features/chplsSlice";
// import { useSnackbar } from "notistack";
//import { useState } from "react";

const SideNavLink = ({
  iconName,
  text,
  href,

  setIndex,
  index,
  show,
  setShow
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const display = typeof window !== "undefined" ? window.innerWidth : null;
  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    // setMenu((prevState) => !prevState);
    setIndex(index);

    if (href === "/logout") {
      console.log(href);
      if (typeof window !== undefined) {
        localStorage.removeItem("ScudDriverDetails");
        localStorage.removeItem("isScudDriver");
        // dispatch(handleisAdminLoggedIn(false));
        // dispatch(handleAdminDetails(null));
        // enqueueSnackbar("Logout Successfully", {
        //   variant: "success",
        // });
        console.log("logout");
        router.push("/signin/driver-signin");
      }
    } else {
      router.push(href);
      display >= 900 ? null : setShow(!show);
    }
  };

  return (
    <div
      key={index}
      className={
        router.pathname === href
          ? "hover:cursor-pointer rounded-md p-2 pl-4 md:pl-2 md:my-2 md:block text-scudGreen  hover:text-blue-600 font-semibold"
          : "hover:cursor-pointer rounded-md p-2 pl-4 md:pl-2 md:my-2 md:block  text-gray-700 hover:text-scudGreen font-light"
      }
      onClick={handleClick}
    >
      <div className="flex space-x-2 items-center mb-4">
        <div>{iconName}</div>
        <div className="capitalize tracking-wider">{text}</div>
      </div>
    </div>
  );
};

export default SideNavLink;
