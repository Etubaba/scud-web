import { BiLogOut } from "react-icons/bi";
import SideNavLink from "./SideNavLink";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { officerManagerNavList, acctOfficerNavList } from "./list";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { handleAdminLogin, handleAdminProps } from "../../features/authSlice";
import { handleSignupLevel } from "../../features/scudSlice";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

const SideNav = () => {
  const officerSidebar = useSelector((state) => state.scud.officerSideBar);
  const [currentIndex, setIndex] = useState(0);
  const [showMenu, setMenu] = useState(false);
  const [onLine, setOnline] = useState(false);
  const [roleOption, setRoleOption] = useState(false);
  const user = useSelector((state) => state.auth.adminDetails);
  const [acctOfficer, setAcctOfficer] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const sideNavList = router.pathname.includes("account_officer")
    ? acctOfficerNavList
    : officerManagerNavList;

  useEffect(() => {
    typeof window !== "undefined" && navigator.onLine ? setOnline(true) : setOnline(false);
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAdminLogout = () => {
    dispatch(handleAdminProps(null));
    dispatch(handleAdminLogin(false));
    dispatch(handleSignupLevel(0));
    Cookies.remove("adminAccessToken");
    enqueueSnackbar("logged out successfully", {
      variant: "success"
    });
    router.push("/admin/auth");
  };

  const capitalize = (str) => {
    const strArr = str.split("-");
    const first = strArr[0].charAt(0).toUpperCase() + strArr[0].slice(1);
    if (strArr.length < 2) return first;
    const second = strArr[1].charAt(0).toUpperCase() + strArr[1].slice(1);
    return first + " " + second;
  };

  const role = user.roles[0];
  const profilepic = user?.picture;

  const switchRole = (role) => {
    if (role === "super-admin") {
      router.push("/admin");
    } else if (role === "account-officer") {
      router.push("/officer_profile/account_officer");
    } else if (role === "supervisor") {
      router.push("/officer_profile/officers_manager");
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <div className="py-4 flex justify-between items-center pl-3 md:pl-4 bg-[#1E202B]  pr-3 ">
        <img
          src="/scudLogo.png"
          className={officerSidebar ? "w-8 h-8 md:mt-0.5" : "w-10 h-10 md:mt-0.5"}
          alt="Scud Logo"
        />
        {user.roles.length > 1 && (
          <span
            onClick={() => setRoleOption(!roleOption)}
            className={`flex items-center relative space-x-1 ${
              roleOption ? "text-scudGreen" : "text-white"
            }`}
          >
            <p className="text-sm">Switch role</p>
            <MdOutlineKeyboardArrowDown />
            {roleOption && (
              <span className="absolute p-2 mt-24 right-1 max-h-80 overflow-y-auto bg-white max-w-[200px] min-w-[100px] rounded border transition duration-300 ease-in z-40 shadow-xl">
                {user?.roles?.map((item) => (
                  <p
                    onClick={() => switchRole(item)}
                    className="py-1 text-xs text-textColor hover:bg-adminbg "
                  >
                    {item}
                  </p>
                ))}
              </span>
            )}
          </span>
        )}
      </div>
      <div className="flex space-x-3 bg-[#23293B] p-5">
        <div>
          <img
            className=" w-10 h-10 rounded-full"
            loading="lazy"
            src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
          />
        </div>
        {officerSidebar ? null : (
          <div className="space-y-0.5">
            <h1 className="text-yellow-500 font-bold text-lg">{capitalize(role)}</h1>
            <p className="text-white text-sm">{user.first_name + " " + user.last_name}</p>
            <span className="flex space-x-2">
              {onLine ? (
                <div className="w-2 h-2 mt-[9px] rounded-full bg-green-700"></div>
              ) : (
                <div className="w-2 h-2 mt-[9px] rounded-full bg-gray-500"></div>
              )}
              {onLine ? (
                <p className="text-green-700">online</p>
              ) : (
                <p className="text-red-500">offline</p>
              )}
            </span>
          </div>
        )}
      </div>
      <div
        id="adminend"
        className="bg-[#1E202B] py-4  md:pl-3 pl-3 overflow-y-scroll lg:overflow-y-hidden  h-screen lg:h-auto pb-[320px] lg:pb-10  md:pr-4 static"
      >
        <div>
          {sideNavList.map((sideNav, index) => (
            <SideNavLink
              iconName={sideNav.iconName}
              text={sideNav.text}
              href={`/officer_profile${sideNav.href}`}
              setIndex={setIndex}
              currentIndex={currentIndex}
              setMenu={setMenu}
              index={index}
              key={sideNav.id}
            />
          ))}

          <div
            onClick={handleAdminLogout}
            className={
              officerSidebar
                ? "border-t border-[#23293B] pl-1 cursor-pointer pt-6 flex space-x-3 "
                : "border-t border-[#23293B] pl-4 cursor-pointer pt-6 flex space-x-3 "
            }
          >
            <BiLogOut className="text-[#FF6C6C] hover:text-red-700 text-lg mt-1 " />
            {officerSidebar ? null : (
              <p className="text-[#FF6C6C] hover:text-red-700">Logout</p>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
