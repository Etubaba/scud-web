import React from "react";

function BeforeTrip() {
  return (
    <div className="md:py-8 py-4">
      <div className="md:flex px-4">
        <div className="md:pl-8 lg:pl-16 md:w-1/2">
          <p className="text-scudGreen text-[12px] font-semibold ">BEFORE THE TRIP</p>
          <h1 className="text-2xl mb-2 text-title font-semibold">Getting a safe ride</h1>
          <div className="mb-2">
            <h1 className="text-base text-title font-semibold mb-2">Safe pickups</h1>
            <p className="text-textColor text-sm">
              Scud app automatically finds your location to provide door-to-door service. That means
              you stay safe and comfortable wherever you are until your driver arrives.
            </p>
          </div>
          <div className="mb-2">
            <h1 className="text-base text-title font-semibold mb-2">
              Open to everyone, everywhere{" "}
            </h1>
            <p className="text-textColor text-sm">
              All ride requests are blindly matched with the closest available driver. So there is
              no discrimination based on race, gender, or destination. safe and comfortable wherever
              you are until your driver arrives.
            </p>
          </div>
          <div className="mb-2">
            <h1 className="text-base text-title font-semibold mb-2">Driver Profiles </h1>
            <p className="text-textColor text-sm">
              When you’re matched with a driver, you’ll see their name, license plate number, photo,
              and rating—so you know who’s picking you up ahead of time. And even after the trip,
              you’re able to contact your driver if you left something behind.
            </p>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-end">
          <img className="md:w-[450px] object-contain" src="/Group35719.svg" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default BeforeTrip;
