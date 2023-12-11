import { FaFileInvoice, FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import {
  MdArrowForwardIos,
  MdPayment,
  MdOutlineAllInclusive,
  MdOutlineDashboard
} from "react-icons/md";
import { RiLogoutCircleRFill, RiSecurePaymentFill } from "react-icons/ri";
import { AiOutlineCar, AiOutlineUsergroupAdd, AiOutlineGift } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { TbCar, TbWallet } from "react-icons/tb";
import SideNavLink from "./SideNavLink";
import { useState } from "react";
import classNames from "classnames";
import { CgProfile } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { handleDriverLogin, handleLogin, handleUserProps } from "../../features/authSlice";
import { handleSignupLevel } from "../../features/scudSlice";
import { useSnackbar } from "notistack";
//import { useRouter } from "next/router";

const SideNav = ({ show, setShow }) => {
  //const router = useRouter();
  const [currentIndex, setIndex] = useState(0);
  const [showMenu, setMenu] = useState(false);
  const handleClick = () => {
    setMenu((prevState) => !prevState);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sideNavList = [
    {
      id: 1,
      iconName: <MdOutlineDashboard />,
      text: "Dashboard",
      href: ""
    },
    {
      id: 2,
      iconName: <CgProfile />,
      text: "Profile",
      href: "/profile"
    },
    {
      iconName: <HiOutlineDocumentText />,
      text: "Documents",
      href: "/driver_document"
    },
    {
      id: 3,
      iconName: <TbCar />,
      text: "My Trips",
      href: "/driver_trips"
    },
    // {
    //   id: 4,
    //   iconName: <AiOutlineCar />,
    //   text: "Vehicle",
    //   href: "/vehicle_info"
    // },
    {
      id: 5,
      iconName: <TbWallet />,
      text: "Earnings",
      href: "/earnings"
    },
    {
      id: 6,
      iconName: <AiOutlineGift />,
      text: "Incentives",
      href: "/driver_incentives"
    },
    {
      id: 7,
      iconName: <MdPayment />,
      text: "Payment",
      href: "/driver_payment"
    },

    // {
    //   id: 8,
    //   iconName: <FaFileInvoice />,
    //   text: "Invoice",
    //   href: "/driver_invoice",
    // },
    // {
    //   iconName: <MdOutlineAllInclusive />,
    //   text: "My Trips",
    //   href: "/driver_trips",
    // },
    // {
    //   id: 9,
    //   iconName: <RiSecurePaymentFill />,
    //   text: "Payout",
    //   href: "/payout_preferences",
    // },
    {
      id: 10,
      iconName: <AiOutlineUsergroupAdd />,
      text: "Referrals",
      href: "/driver_referral"
    },
    {
      id: 11,
      iconName: <BiSupport />,
      text: "Support",
      href: "/support"
    }
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleUserProps(null));
    dispatch(handleDriverLogin(false));
    dispatch(handleSignupLevel(1));
    enqueueSnackbar("logged out successfully", {
      variant: "success"
    });
    Cookies.remove("accessToken");
    router.push("/signin/driver-signin");
  };

  return (
    <div className="py-4 md:pl-4  pr-4 relative md:static">
      <div
        className="rounded-md md:hidden p-2 md:my-5 bg-chplsBlue text-white hover:cursor-default"
        onClick={handleClick}
      >
        <div className="flex items-center text-md lg:text-lg">
          <div className="flex space-x-2 items-center">
            <div>{sideNavList[currentIndex]?.iconName}</div>
            <div className="capitalize">{sideNavList[currentIndex]?.text}</div>
          </div>
          <div
            className={classNames("ml-auto rotate-90", {
              hidden: showMenu
            })}
          >
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
      <div>
        {/* <div className="flex w-24 justify-center items-center ml-6 space-x-1 p-[2px] rounded-md bg-red-300/30">
          <FcCancel className="" />
          <p className="text-xs text-red-600">Not Verified</p>
        </div> */}

        {sideNavList.map((sideNav, index) => (
          <SideNavLink
            iconName={sideNav.iconName}
            text={sideNav.text}
            href={`/driver_profile${sideNav.href}`}
            setIndex={setIndex}
            currentIndex={currentIndex}
            setMenu={setMenu}
            index={index}
            key={sideNav.id}
            setShow={setShow}
            show={show}
          />
        ))}

        <div onClick={handleLogout} className="border-t pl-4 cursor-pointer pt-6 flex space-x-3 ">
          <BiLogOut className="text-red-600 hover:text-red-700 text-lg mt-1 " />
          <p className="text-red-600 hover:text-red-700">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
