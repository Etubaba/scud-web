import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import FaqComponent from "../common/FaqComponent";
import EmptyTable from "../common/EmptyTable";
import { BsQuestionCircle } from "react-icons/bs";

function Faq({ faqs }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl text-textColor  md:text-2xl p mt-10 md:my-5 ">
        Frequently Asked Questions
      </h1>

      {faqs?.length === 0 ? (
        <EmptyTable style={"w-full"} title={"No FAQ Record"} name="faq" Icon={BsQuestionCircle} />
      ) : (
        <div className="w-full grid grid-cols-1 gap-3 px-5 my-10">
          {faqs?.map((faq, idx) => (
            <FaqComponent key={idx} item={faq} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Faq;
