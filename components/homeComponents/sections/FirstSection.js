import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { GiSteeringWheel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle, modalToggle2 } from "../../../features/scudSlice";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import SignInModalCP from "../../common/SignInModalCP";
import { handleReferralCode } from "../../../features/authSlice";
// import ScudOptions from "../ScudOptions";
// import SignInCompo from "../SignInCompo";

export const FirstSection = () => {
  const modalState = useSelector((state) => state.scud.signUpModal);
  const dispatch = useDispatch();
  const router = useRouter();

  const query = router?.query;
  useEffect(() => {
    if (query.referral_code !== undefined && query.referral_code !== null) {
      dispatch(handleReferralCode(query.referral_code));
      dispatch(modalToggle2(true));
    }
  }, []);

  return (
    <div className=" mb-[60vh]   md:mb-[43%]">
      <video
        src="/pexels-tim-samuel-5834550.mp4"
        controls={false}
        autoPlay={true}
        loop={true}
        muted={true}
        className="w-full h-[300px] md:h-[500px] absolute top-0 right-0 object-cover"
      />
      <div className=" justify-between px-3 pt-[300px] md:p-10 md:pt-[300px] backdrop-brightness-50 w-full right-0 h-[300px] md:h-[500px] bg-blue-800/20 absolute top-0 md:flex ">
        <div>
          <div className=" w-full md:max-w-[500px] ">
            <h1 className="text-3xl text-title md:text-white font-bold my-3">
              Get there <b className="text-scudGreen md:text-white">Anytime</b>
              <br />
              <b className="text-scudGreen md:text-white">Anywhere,</b> with us at Scud
            </h1>
          </div>

          {/* <div className="flex justify-between"> */}
          <div className="flex space-x-4  max-w-[300px] mt-6">
            <Button
              onClick={() => dispatch(modalToggle2(true))}
              secondary={true}
              style={"md:px-10 px-5 font-[400]"}
              text={"Sign Up"}
            />
            <Button style={"md:px-10  font-[400]"} text={"Request a Ride"} />
            {/* </div> */}
          </div>
        </div>
        <div className=" hidden md:flex md:mt-[6.5rem] space-x-5">
          <img
            alt="App"
            className="transform h-[1.5rem] md:h-7 lg:h-9  cursor-pointer"
            src="/appstore.svg"
          />
          <img
            alt="App"
            className="transform  h-[1.4rem]  md:h-7 lg:h-9  cursor-pointer"
            src="/Google.svg"
          />
        </div>
      </div>
      <Modal open={modalState} onClose={() => dispatch(modalToggle2(false))}>
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
