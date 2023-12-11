import React, { useState } from "react";
import EmptyTable from "../components/common/EmptyTable";
import "animate.css";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";
import LastSection from "../components/homeComponents/sections/LastSection";
import FaqComponent from "../components/common/FaqComponent";
import { BASE_URL } from "../api/base";
import { BsQuestionSquare } from "react-icons/bs";

function Faq({ data }) {
  const faq = data?.data;

  return (
    <div className=" md:px-10">
      <div className="">
        <h1 className="text-2xl text-title text-center  my-16  font-bold">
          Frequently Asked Questions
        </h1>

        {faq.length === 0 ? (
          <div className="px-5">
            <EmptyTable Icon={BsQuestionSquare} title={"No FAQ Available"} name={"FAQ"} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-14 mt-7 mb-16">
            {faq?.map((item, index) => (
              <FaqComponent key={index} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className="">
        <LastSection />
        <MobileLastsection />
      </div>
    </div>
  );
}

export default Faq;
export async function getServerSideProps() {
  const res = await fetch(`${BASE_URL}faqs`);
  const data = await res.json();

  return {
    props: {
      data
    }
  };
}
