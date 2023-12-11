import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlineNewspaper } from "react-icons/hi";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import { adminusers, currency } from "../../../dummy";

const Currency = () => {
  const [searchState, setSearchState] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");

  const router = useRouter();
  const pageNumber = [];
  for (let i = 1; i <= 4; i++) {
    pageNumber.push(i);
  }

  const rows = currency.map((element) => (
    <tr
      // onClick={() => {
      //   setDetails(element);
      //   setModalOpen(true);
      // }}
      className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.name}</td>
      <td className="md:text-base text-xs p-3">{element.code}</td>
      <td className="md:text-base text-xs p-3">{element.rate}</td>
      <td className="text-center justify-center flex items-center">
        {element.status == "active" ? (
          <div className=" max-w-[100px] py-1 mt-3 px-4 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600 text-xs">Active</p>
          </div>
        ) : (
          <div className=" max-w-[100px] py-1 mt-3 px-4 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600 text-xs">Inactive</p>
          </div>
        )}
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
              setDeleteModal(true), setSuccessAction(element.username);
            }}
            className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
          >
            <RiDeleteBin6Line className="text-white" />
          </button>
        </span>
      </td>
    </tr>
  ));
  return (
    <div>
      <div className="flex  mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Manage Currency</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/payment_mgt/add_currency")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl " />
            &nbsp;Add Currency
          </button>
        </span>
      </div>
      <div className="my-8 block md:hidden">
        {searchState ? (
          <div className="shadow-md animate__fadeInRight animate__animated flex justify-between px-3 py-1 md:-mt-3 rounded-lg bg-white">
            <input
              placeholder="Search..."
              className=" outline-none bg-white"
              type={"text"}
            />
            <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setSearchState(true)}
            className="bg-white -mt-4 space-x-4 justify-center items-center rounded-lg shadow-lg p-[6px] flex"
          >
            <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
              <BsSearch className="text-white text-sm" />
            </div>
            <p className="text-sm">Search</p>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-5">
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <GrDocumentCsv className="mt-1 " /> &nbsp;&nbsp;CSV
          </button>
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center items-center  border flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <SiMicrosoftexcel className="mt-1 " /> &nbsp;&nbsp;Excel
          </button>
          <button
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-[#F2F5FF] justify-center items-center  border border-scudGreen text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
          >
            <AiOutlinePrinter className="mt-1 text-scudGreen" />{" "}
            &nbsp;&nbsp;Print
          </button>
        </div>
        <div className="mt-4 hidden md:block">
          {searchState ? (
            <div className="shadow-md animate__fadeInRight animate__animated flex px-3 py-1 md:-mt-3 rounded-lg bg-white">
              <input
                placeholder="Search..."
                className=" outline-none bg-white"
                type={"text"}
              />
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setSearchState(true)}
              className="bg-white -mt-4 space-x-4 justify-center items-center rounded-lg shadow-lg p-[6px] flex"
            >
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
              <p className="text-sm">Search</p>
            </div>
          )}
        </div>
      </div>
      {/* table start here  */}
      <div className="mt-10 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
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
                  <AiOutlineEdit className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                  <p className="md:text-base text-xs "> Name</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <HiOutlineNewspaper className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Code</p>
                </div>
              </td>
              <td className="">
                <div className="flex  justify-center">
                  <TbActivityHeartbeat className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Rate</p>
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

      <div className="flex justify-between">
        <p className=" text-xs mt-2 md:text-sm font-[400] text-textColor">
          Total Number of trips : 12
        </p>
        <div className="flex space-x-3 justify-center items-center">
          <BsArrowLeft className="text-scudGreen text-lg" />
          {pageNumber.map((element) => (
            <span className="flex">
              <p className="text-sm font-[400] text-textColor">{element}</p>
            </span>
          ))}
          <div className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 ">
            <BsArrowRight className="text-white text-sm" />
          </div>
        </div>
      </div>
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Currency</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete a currency.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              onClick={() => {
                setSuccessModal(true);
                setDeleteModal(false);
              }}
              text={"Yes, Delete"}
            />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              {successAction} deleted successfully.
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              The {successAction} has been deleted.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Currency.getLayout = Layout;
export default Currency;
