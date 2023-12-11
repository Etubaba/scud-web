import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import LastSection from "../../components/homeComponents/sections/LastSection";
import MobileLastsection from "../../components/homeComponents/sections/MobileLastsection";
import { useRouter } from "next/router";
import { BASE_URL } from "../../api/base";
import { useEffect } from "react";

const index = ({ data }) => {
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const query = router.query;

  const randomColor = () => {
    const colors = ["bg-[#00AB4C]", "bg-scudGreen", "bg-[#FFBD3D]", "bg-[#5F57CC]", "bg-[#FF0000]"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    setQuestions(data);
    if (query?.platform !== undefined && query?.token !== undefined) {
      // dispatch(handleDriverSignupLevel(3));
      Cookies.set("accessToken", query?.token, {
        expires: 1
      });
    }
  }, []);

  return (
    <div>
      <div className="bg-[#F7FAFE] md:py-10 py-4 flex flex-col justify-center items-center space-y-2">
        <p className="text-scudGreen text-sm md:text-base  text-center font-semibold ">
          CUSTOMER SUPPORTS
        </p>
        <p className="text-title text-2xl md:text-4xl tracking-wider text-center font-bold">
          Ask us anything
        </p>
        <p className="text-textColor  text-center mx-6 md:mx-44 lg:mx-72">
          The Scud Team is readily available and committed to offering comprehensive guidance and
          effective solutions to address any issue or challenge you may be facing.
        </p>

        <div className="shadow-figma  mx-4 md:mx-0 md:w-[20rem] flex px-3 py-1.5 rounded-lg bg-white">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="search"
            className=" outline-none placeholder:font-[300] bg-white w-full"
            type={"text"}
          />
          <div className="bg-scudGreen p-2  rounded-full flex justify-center items-center">
            <BsSearch className="text-white text-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2  mx-6 md:mx-40 my-10  mb-32 md:my-20">
        {questions
          .filter((val) => {
            if (value === "") return val;
            else if (val.name.toLowerCase().includes(value.toLowerCase())) return value;
          })
          .map((item) => (
            <div
              onClick={() => router.push(`/support/issues/${item.id}`)}
              key={item.id}
              className={`${randomColor()}  flex justify-center items-center max-w-[26rem] rounded-md py-2 px-4`}
            >
              <p className="text-white text-sm ">{item.name}</p>
            </div>
          ))}
      </div>

      <LastSection />
      <MobileLastsection />
    </div>
  );
};

export default index;
export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}support-categories`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  return {
    props: {
      data
    }
  };
}
