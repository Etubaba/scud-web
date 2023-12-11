import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

const SideNavLink = ({ iconName, text, href, setIndex, index }) => {
  const adminSidebar = useSelector((state) => state.scud.officerSideBar);

  // const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (evt, href) => {
    evt.preventDefault();
    evt.stopPropagation();

    // console.log("href", href);
    // console.log(router.pathname, "path");
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
    }
  };

  return (
    <div
      key={index}
      className={
        router.pathname === href
          ? "hover:cursor-pointer rounded-md p-2 md:p-1  md:my-1.5 md:block text-scudGreen  hover:text-blue-600 "
          : "hover:cursor-pointer rounded-md p-2 md:p-1  md:my-1.5 md:block  text-gray-700 hover:text-scudGreen font-light"
      }
      onClick={(evt) => {
        handleClick(evt, href);
      }}
    >
      <div className="flex space-x-2 items-center mb-3 ">
        <div
          className={
            router.pathname === href
              ? "bg-scudGreen rounded-md p-1 text-[#ffffff]"
              : "bg-[#23293B] hover:bg-white rounded-md p-1 text-[#a6a9b7]"
          }
        >
          {iconName}
        </div>
        {adminSidebar ? null : (
          <div
            className={
              router.pathname === href
                ? "capitalize text-sm  hover:text-scudGreen text-[#ffffff]"
                : "capitalize text-sm  hover:text-white text-[#a6a9b7]"
            }
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavLink;
