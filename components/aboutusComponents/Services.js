import React from "react";
import SignInModalCP from "../common/SignInModalCP";
import { AiOutlineCar } from "react-icons/ai";
import { GiSteeringWheel } from "react-icons/gi";

const Services = () => {
  return (
    <div className="w-full h-auto py-20 px-4 md:px-10">
      <div className="flex flex-col mb-5 md:mb-9 justify-center items-center">
        <h1 className=" font-bold text-3xl text-title md:text-3xl tracking-wider mb-4">
          Our Services
        </h1>
        <p className="md:max-w-[600px]  text-textColor text-xs leading-5 md:text-sm text-center">
          massa odio. Condimentum ultrices id sollicitudin tristique congue feugiat vestibulum.
          Molestie quam semper faucibus quam. Velit velit
        </p>
      </div>

      <div className="flex md:flex-row flex-col  justify-center items-center space-y-7 md:space-y-0 md:space-x-12">
        <SignInModalCP
          Icon={AiOutlineCar}
          content={
            "orem ipsum dolor sit amet, consectetur adipiscing elit. Non eros molestie dolor eu purus magna elementum. Est mauris massa massa ultrices non vitae quam. Magna platea pulvinar nisl, volutpat quis vestibu"
          }
          title={"Ride Hailing"}
        />
        <SignInModalCP
          Icon={GiSteeringWheel}
          content={
            "orem ipsum dolor sit amet, consectetur adipiscing elit. Non eros molestie dolor eu purus magna elementum. Est mauris massa massa ultrices non vitae quam. Magna platea pulvinar nisl, volutpat quis vestibu"
          }
          title={"Scud Drive"}
        />
      </div>
    </div>
  );
};

export default Services;
