import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePhone, AiOutlinePlus, AiOutlinePrinter, AiOutlineSetting } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsBarChart, BsEye, BsLink45Deg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdAccessTime, MdGTranslate, MdLanguage } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Pagination from "../../../components/common/Pagination";
import { citylist } from "../../../dummy";
import PrintTable from "../../../components/common/table/PrintTable";

const Static_page = () => {
  const pages = [
    {
      id: 1,
      pagename: "Home",
      url: "/home",
      lastupdated: "12/2/2022",
      status: "active"
    },
    {
      id: 2,
      pagename: "About Us",
      url: "/about_us",
      lastupdated: "12/2/2022",
      status: "active"
    },
    {
      id: 3,
      pagename: "Contact Page",
      url: "/contact_page",
      lastupdated: "12/2/2022",
      status: "inactive"
    },
    {
      id: 4,
      pagename: "Home",
      url: "/home",
      lastupdated: "12/2/2022",
      status: "active"
    }
  ];
  const rows = pages.map((element) => (
    <tr
      className=" text-center  hover:rounded-lg hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className=" text-xs p-3">{element.id}</td>
      <td className="  text-xs p-3">{element.pagename}</td>
      <td className=" text-xs p-3">{element.url}</td>
      <td className=" text-xs p-3">{element.lastupdated}</td>

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
          <button
            onClick={() => {
              setDeleteModal(true);
            }}
            className="bg-green-600 border flex space-x-2 hover:to-green-300   rounded-md p-1"
          >
            <BsEye className="text-white" />
          </button>
        </span>
      </td>
    </tr>
  ));

  const router = useRouter();
  return (
    <div>
      <div className="flex mb-5  md:mb-10 justify-center  items-center">
        <p className="text-lg tracking-wide font-semibold">Manage Static Pages</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/site/add_page")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl" />
            &nbsp;Add Page
          </button>
        </span>
      </div>
      <div className="mt-1 my-5 block md:hidden">
        <SearchInput />
      </div>
      <div className="md:flex items-center justify-between">
        <PrintTable />
        <div className="mt-1 hidden md:block">
          <SearchInput />
        </div>
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
                  <HiOutlineDocumentText className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs ">Page Name</p>
                </div>
              </td>
              <td className="md:py-4 py-2 ">
                <div className="flex  md:text-base text-xs justify-center">
                  <BsLink45Deg className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs ">URL</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <MdAccessTime className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Last Updated</p>
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

Static_page.getLayout = Layout;
export default Static_page;
