import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

const TableHead = ({ rows, tableHeadData, actions }) => {
  return (
    <div className="mt-10 mb-6 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl">
      <table className="w-full min-w-[700px] ">
        <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
          <tr className="border-b">
            {tableHeadData.map((headItem, index) => (
              <td className="md:py-4 py-2" key={index}>
                {headItem.name === "status" ? (
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>
                    <p className="md:text-base text-xs ">Status</p>
                  </div>
                ) : (
                  <div className="flex md:text-base text-xs justify-center">
                    {headItem.iconName}
                    <p className="md:text-base text-xs">{headItem.name}</p>
                  </div>
                )}
              </td>
            ))}

            {actions !== undefined && (
              <td>
                {" "}
                <div className="flex   justify-center">
                  <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Actions</p>
                </div>
              </td>
            )}
          </tr>
        </thead>
      </table>
      <tbody className="mx-4">{rows}</tbody>
    </div>
  );
};

export default TableHead;
