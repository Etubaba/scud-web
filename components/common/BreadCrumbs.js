import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const BreadCrumbs = ({ indexPath, index, secondItem, thirditem }) => {
  const router = useRouter();

  if (secondItem === undefined) {
    return (
      <p className="tracking-wide text-title mb-10 font-semibold text-sm md:text-lg">{index}</p>
    );
  }
  return (
    <span className="text-lg mb-10 flex space-x-2  cursor-pointer font-semibold">
      <p
        className={"text-gray-500/60 text-xs md:text-base tracking-wide hover:underline"}
        onClick={() => router.push(indexPath)}
      >
        {index}
      </p>{" "}
      <span className="flex space-x-2">
        <AiOutlineRight className={`md:mt-1.5 text-base`} />
        <p
          className={`tracking-wide text-xs md:text-base ${
            thirditem !== undefined ? "text-gray-500/60" : ""
          } `}
        >
          {secondItem}
        </p>
      </span>
      {thirditem !== undefined && (
        <span className="flex space-x-2">
          <AiOutlineRight className=" md:mt-1.5 text-base" />
          <p className="tracking-wide text-xs md:text-base">{thirditem}</p>
        </span>
      )}
    </span>
  );
};

export default BreadCrumbs;
