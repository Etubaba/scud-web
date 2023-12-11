import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCar, AiOutlineMenu } from "react-icons/ai";
import { GiSteeringWheel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { drawerOpen, modalToggle } from "../../features/scudSlice";
import Modal from "../common/Modal";
import SignInModalCP from "../common/SignInModalCP";
import Drawer from "./Drawer";
import "animate.css";
import { BiMenuAltRight } from "react-icons/bi";
import SupportHeader from "./SupportHeader";
function MobileHeader() {
  const modalState = useSelector((state) => state.scud.signInModal);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.scud.menuDrawer);

  const router = useRouter();

  const { platform } = router.query;

  if (platform === "mobile") return null;

  const Paths = [
    "/signup/driver-signup",
    "/signup/rider-signup",
    "/signin/driver-signin",
    "/signin/rider-signin"
  ];
  const checkPath = () => {
    return Paths.includes(`${router.pathname}`);
  };

  const supportPaths = [
    "/support",
    "/support/issues/[id]",
    "/support/issues/details",
    "/support/issues/ticket"
  ];

  const isSupportPath = () => {
    return supportPaths.includes(`${router.pathname}`);
  };

  if (isSupportPath()) return null;

  return (
    <div className="p-4 flex md:hidden sticky top-0 bg-white z-40 justify-between items-center ">
      <div className="flex space-x-6 justify-center items-center">
        <img
          onClick={() => {
            router.push("/");
          }}
          src="/scudLogo.png"
          className={"w-[2rem] h-[2rem]  "}
          alt="Scud Logo"
        />
      </div>{" "}
      {!menu && !checkPath() && (
        <BiMenuAltRight
          onClick={() => dispatch(drawerOpen(!menu))}
          className="text-4xl transition-all animate__animated animate__fadIn font-bold cursor-pointer text-[#4c4949]"
        />
      )}
      {router.pathname == "/signup/driver-signup" ? (
        <span className="flex text-[#55575F] ">
          Already have account?
          <p
            onClick={() => router.push("/signin/driver-signin")}
            className="text-scudGreen font-bold ml-1"
          >
            Sign In
          </p>
        </span>
      ) : router.pathname == "/signin/driver-signin" ? (
        <span className="flex text-[#55575F] ">
          Don't have an account?
          <p
            onClick={() => router.push("/signup/driver-signup")}
            className="text-scudGreen font-bold ml-1"
          >
            Sign Up
          </p>
        </span>
      ) : router.pathname == "/signup/rider-signup" ? (
        <span className="flex text-[#55575F] ">
          Already have account?
          <p
            onClick={() => router.push("/signin/rider-signin")}
            className="text-scudGreen font-bold ml-1"
          >
            Sign In
          </p>
        </span>
      ) : router.pathname == "/signin/rider-signin" ? (
        <span className="flex text-[#55575F] ">
          Don't have an account?
          <p
            onClick={() => router.push("/signup/rider-signup")}
            className="text-scudGreen n font-bold ml-1"
          >
            Sign Up
          </p>
        </span>
      ) : null}
      <Modal open={modalState} onClose={() => dispatch(modalToggle(false))}>
        {/* Modal content */}

        <div className=" w-full">
          <p className="mb-10 text-center  font-semibold md:text-left ">You are signing in as?</p>

          <div className=" flex flex-col mb-6 md:flex-row space-y-5 md:space-y-0 md:space-x-10 justify-center items-center">
            <SignInModalCP
              title={"As a Driver"}
              content="massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat."
              Icon={GiSteeringWheel}
              button={true}
              text="Sign in as a Driver"
              onClick={() => {
                router.push("/signin/driver-signin");
                dispatch(modalToggle(false));
              }}
            />

            <SignInModalCP
              title={"As a Rider"}
              content="massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat."
              Icon={AiOutlineCar}
              button={true}
              text="Sign in as a Rider"
              onClick={() => {
                router.push("/signin/rider-signin");
                dispatch(modalToggle(false));
              }}
            />
          </div>
        </div>
      </Modal>
      {menu && <Drawer />}
    </div>
  );
}

export default MobileHeader;
