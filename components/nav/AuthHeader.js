import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { GiSteeringWheel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle, modalToggle2 } from "../../features/scudSlice";
import Modal from "../common/Modal";
import SignInModalCP from "../common/SignInModalCP";

const AuthHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isSignIn = router.pathname.includes("signin");
  const signinModal = useSelector((state) => state.scud.signInModal);
  const signupModal = useSelector((state) => state.scud.signUpModal);

  return (
    <div className=" px-8 py-3 z-50 hidden font-sans md:flex shadow-sm bg-white sticky top-0 justify-between items-center">
      <div onClick={() => router.push("/")} className="flex justify-center items-center">
        <img src="/scudLogo.png" className="w-10 h-10 mt-0.5" alt="Scud Logo" />
      </div>

      <div className="flex space-x-2">
        {isSignIn ? (
          <p className="text-sm text-textColor">Don't have an account?</p>
        ) : (
          <p className="text-sm text-textColor">Already have account?</p>
        )}

        {isSignIn ? (
          <p onClick={() => dispatch(modalToggle2(true))} className="text-scudGreen text-sm">
            Sign up
          </p>
        ) : (
          <p onClick={() => dispatch(modalToggle(true))} className="text-scudGreen text-sm">
            Sign in
          </p>
        )}
      </div>

      <Modal
        open={signinModal}
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

      <Modal open={signupModal} onClose={() => dispatch(modalToggle2(false))}>
        <div className=" w-full">
          <p className="mb-10 text-center font-semibold md:text-left ">You are signing up as?</p>

          <div className=" flex flex-col mb-6 md:flex-row space-y-5 md:space-y-0 md:space-x-10 justify-center items-center">
            <SignInModalCP
              title={"As a Driver"}
              content="massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat."
              Icon={GiSteeringWheel}
              button={true}
              text="Sign up as a Driver"
              onClick={() => {
                router.push("/signup/driver-signup");
                dispatch(modalToggle2(false));
              }}
            />
            <SignInModalCP
              title={"As a Rider"}
              content="massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat."
              Icon={AiOutlineCar}
              button={true}
              text="Sign up as a Rider"
              onClick={() => {
                router.push("/signup/rider-signup");
                dispatch(modalToggle2(false));
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AuthHeader;
