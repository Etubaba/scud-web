import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { drawerOpen, modalToggle } from "../../features/scudSlice";
import Button from "../common/Button";
import Drawer from "./Drawer";
import SignInModalCP from "../common/SignInModalCP";
import { GiSteeringWheel } from "react-icons/gi";
import Modal from "../common/Modal";
import AuthHeader from "./AuthHeader";
import SupportHeader from "./SupportHeader";
import Link from "next/link";

const Header = ({ checkPath }) => {
  const modalState = useSelector((state) => state.scud.signInModal);
  const dispatch = useDispatch();
  const router = useRouter();

  const authPaths = [
    "/signup/driver-signup",
    "/signup/rider-signup",
    "/signin/rider-signin",
    "/signin/driver-signin"
  ];
  const isAuthPath = () => {
    return authPaths.includes(`${router.pathname}`);
  };

  if (isAuthPath()) {
    return <AuthHeader />;
  }

  const supportPaths = [
    "/support",
    "/support/issues/[id]",
    "/support/issues/details",
    "/support/issues/ticket"
  ];

  const isSupportPath = () => {
    return supportPaths.includes(`${router.pathname}`);
  };

  if (isSupportPath()) return <SupportHeader />;

  return (
    <div className="px-8 py-3 z-40 hidden font-sans md:flex shadow-sm bg-white sticky top-0 justify-between items-center">
      <div
        onClick={() => router.push("/")}
        className="flex cursor-pointer justify-center items-center"
      >
        <Link href={"/"}>
          <img
            // onClick={() => router.push("/")}
            src="/scudLogo.png"
            className="w-10 h-10 mt-0.5"
            alt="Scud Logo"
          />
        </Link>
      </div>

      <div className="flex space-x-5  ml-6 lg:space-x-10 items-center justify-center">
        <p
          onClick={() => router.push("/")}
          className={`lg:text-base text-base ${
            router.pathname == "/" ? "text-scudGreen font-semibold" : "text-textColor font-[400]"
          }  cursor-pointer link`}
        >
          Home
        </p>
        <p
          onClick={() => router.push("/drive")}
          className={`lg:text-base text-base ${
            router.pathname == "/drive"
              ? "text-scudGreen font-semibold"
              : "text-textColor font-[400]"
          }  cursor-pointer link`}
        >
          Drive
        </p>
        <p
          onClick={() => router.push("/ride")}
          className={`lg:text-base text-base ${
            router.pathname == "/ride"
              ? "text-scudGreen font-semibold"
              : "text-textColor font-[400]"
          }  cursor-pointer link`}
        >
          Ride
        </p>
        <p
          onClick={() => router.push("/about")}
          className={`lg:text-base text-base ${
            router.pathname == "/about"
              ? "text-scudGreen font-semibold"
              : "text-textColor font-[400]"
          }  cursor-pointer link`}
        >
          About us
        </p>
        <p
          onClick={() => router.push("/faq")}
          className={`lg:text-base text-base ${
            router.pathname == "/faq" ? "text-scudGreen font-semibold" : "text-textColor font-[400]"
          }  cursor-pointer link`}
        >
          FAQs
        </p>
        <p
          onClick={() => router.push("/support")}
          className={`lg:text-base text-base text-textColor font-[400] cursor-pointer link`}
        >
          Support
        </p>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => dispatch(modalToggle(true))}
          // onClick={() => setOpened(true)}
          text={"Sign In"}
          secondary={true}
        />
        <Button onClick={() => router.push("/signup/driver-signup")} text={"Become a driver"} />
      </div>
      <Modal
        open={modalState}
        onClose={() => dispatch(modalToggle(false))}

        //  size="md"
      >
        <div className=" w-full">
          <p className="mb-10 text-center font-semibold md:text-left ">You are signing in as?</p>

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
    </div>
  );
};

export default Header;
