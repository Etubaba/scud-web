import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { handleAdminSideBar } from "../../features/scudSlice";

const SideNavLink = ({ title, child, setIndex, index, keyz }) => {
  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);
  const windowWidth = typeof window !== undefined && window.innerWidth;
  // const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (evt, href) => {
    evt.preventDefault();
    evt.stopPropagation();

    // setMenu((prevState) => !prevState);
    setIndex(index);

    if (href === "/logout") {
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
      router.push("/admin" + href);
      windowWidth > 1000 ? null : dispatch(handleAdminSideBar(!adminSidebar));
    }
  };

  return (
    <div key={keyz} className="mb-6">
      {adminSidebar ? null : (
        <p className="text-sm tracking-wider mb-3 text-[#3D4151] my-2">{title}</p>
      )}{" "}
      {child.map((item, index) => (
        <div
          key={index}
          className={
            router.pathname === "/admin" + item?.href
              ? "hover:cursor-pointer rounded-md p-2 md:p-1  md:my-1.5 md:block text-scudGreen  hover:text-blue-600 "
              : "hover:cursor-pointer rounded-md p-2 md:p-1  md:my-1.5 md:block  text-gray-700 hover:text-scudGreen font-light"
          }
          onClick={(evt) => {
            handleClick(evt, item?.href);
          }}
        >
          {keyz === 0 ? (
            <div className="flex space-x-2 items-center mb-3 ">
              <div
                className={
                  router.pathname === "/admin" + item?.href
                    ? "bg-scudGreen rounded-md p-1 text-[#ffffff]"
                    : "bg-[#23293B] hover:bg-white rounded-md p-1 text-[#a6a9b7]"
                }
              >
                {item?.iconName}
              </div>
              {adminSidebar ? null : (
                <div
                  className={
                    router.pathname === "/admin" + item?.href
                      ? "capitalize text-sm  hover:text-scudGreen text-[#ffffff]"
                      : "capitalize text-sm  hover:text-white text-[#a6a9b7]"
                  }
                >
                  {item?.text}
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2 items-center ">
              <div
                className={
                  router.pathname === "/admin" + item?.href
                    ? "bg-scudGreen rounded-md p-1 text-[#ffffff]"
                    : "bg-[#23293B] rounded-md p-1 text-[#a6a9b7]"
                }
              >
                {item?.iconName}
              </div>
              {adminSidebar ? null : (
                <div
                  className={
                    router.pathname === "/admin" + item?.href
                      ? "capitalize text-sm  hover:text-scudGreen text-[#ffffff]"
                      : "capitalize text-sm hover:text-white text-[#a6a9b7]"
                  }
                >
                  {item?.text}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNavLink;
