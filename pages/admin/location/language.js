import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePlus, AiOutlinePrinter, AiOutlineSetting } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdGTranslate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Pagination from "../../../components/common/Pagination";
import { lang } from "../../../dummy";
import PrintTable from "../../../components/common/table/PrintTable";

const Language = () => {
  const rows = lang.map((element) => (
    <tr
      className=" text-center  hover:rounded-lg hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.language}</td>
      <td className="md:text-base text-xs p-3">{element.value}</td>

      <td className="text-center">
        <div className="flex justify-center items-center">
          {element.status == "active" ? (
            <div className=" max-w-[100px] px-3 py-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600 text-xs">Active</p>
            </div>
          ) : (
            <div className=" max-w-[100px] px-3 p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600  text-xs">Inactive</p>
            </div>
          )}
        </div>
      </td>
      <td className="md:text-base text-xs p-3 ">
        <span className="flex space-x-3 justify-center">
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
          >
            <FiEdit className="text-white" />
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
            }}
            className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
          >
            <RiDeleteBin6Line className="text-white" />
          </button>
        </span>
      </td>
    </tr>
  ));
  const router = useRouter();
  return (
    <div>
      {" "}
      <div className="flex flex-row mb-7 md:mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Manage Language</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/location/add/add_language")}
            className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="md:text-xl md:mt-0 -mt-0.5 text-sm" />
            &nbsp;Add Language
          </button>
        </span>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <PrintTable />
        <SearchInput style={"mb-4 md:mb-0"} />
      </div>
      {/* table start here  */}
      <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
        <table className="w-full min-w-[700px] ">
          <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
            <tr className="border-b ">
              <td className="">
                <div className="flex md:text-base text-xs justify-center">
                  <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base  text-xs">id</p>
                </div>
              </td>
              <td className="md:py-4 py-2 ">
                <div className="flex  md:text-base text-xs justify-center">
                  <MdGTranslate className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs ">Language</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <HiOutlineDocumentText className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Value</p>
                </div>
              </td>

              <td className=" ">
                <div className="flex  justify-center">
                  <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                    <BiRefresh className="text-scudGreen text-sm " />
                  </div>

                  <p className="md:text-base text-xs ">Status</p>
                </div>
              </td>
              <td className=" text-left">
                <div className="flex   justify-center">
                  <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Actions</p>
                </div>
              </td>
            </tr>
          </thead>

          <tbody className="mx-4">{rows}</tbody>
        </table>
      </div>
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
};

Language.getLayout = Layout;
export default Language;
