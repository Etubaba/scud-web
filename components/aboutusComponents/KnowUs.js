import React from "react";

function KnowUs() {
  return (
    <div className="bg-[url(/knwusbg.svg)] bg-[#f2f5ff] flex-col-reverse lg:flex-row justify-center flex md:justify-between items-center  bg-center my-8  px-6 py-5  md:py-20 md:px-20  md:bg-100% bg-no-repeat w-full h-auto">
      <div>
        <h1 className="text-3xl md:text-left text-title text-center font-bold mb-4 ">
          Get to Know Us
        </h1>
        <p className="text-textColor text-xs md:text-sm   lg:max-w-[36rem] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non eros molestie dolor eu purus
          magna elementum. Est mauris massa massa ultrices non vitae quam. Magna platea pulvinar
          nisl, volutpat quis vestibulum. Augue nullam convallis pharetra
          <br />
          <br /> lobortis eu sit. Facilisis vel a volutpat libero enim feugiat in. Ut nunc blandit
          libero dictum pulvinar lorem dolor at. Bibendum suspendisse tortor morbi commodo sapien
          egestas. <br />
          <br />
          Montes, sit vulputate arcu nibh nunc. Sodales consectetur maecenas arcu volutpat mus nibh
          vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          <br /> Non eros molestie dolor eu purus magna elementum. Est mauris massa massa ultrices
          non vitae quam. Magna platea pulvinar nisl, volutpat quis vestibulum. Augue nullam
          convallis pharetra lobortis eu sit. Facilisis vel a volutpat libero enim feugiat in. Ut
          nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          <br />
          Non eros molestie dolor eu purus magna elementum. Est mauris massa massa ultrices non
          vitae quam. Magna platea pulvinar nisl, volutpat quis vestibulum.{" "}
        </p>
      </div>
      <div className="lg:flex hidden flex-col">
        <div className="flex space-x-4 mb-5">
          <img alt="" src="/knwusimg3.png" className="w-48  h-48" />
          <img alt="" src="/knwusimg2.png" className="w-48 h-48" />
        </div>
        <img src="/knwusimg1.png" className="w-[25.3rem] h-48" />
      </div>
    </div>
  );
}

export default KnowUs;
