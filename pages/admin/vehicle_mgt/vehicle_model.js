import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh, BiWindow } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { BsArrowLeft, BsArrowRight, BsPerson, BsPersonCircle, BsSearch } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";

import Modal from "../../../components/common/Modal";
import { adminusers, roles } from "../../../dummy";
import { useRouter } from "next/router";
import { TbCar } from "react-icons/tb";
import Pagination from "../../../components/common/Pagination";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";

const Models = ({ data }) => {
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");

  const rows = data
    .filter((item) => {
      if (searchState === "") return item;
      else if (item?.name?.toLowerCase().includes(searchState.toLowerCase())) {
        return item;
      }
    })
    .map((element) => (
      <tr
        className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>

        <td className="md:text-base text-xs p-3">{element.name}</td>
        <td className="text-center flex justify-center">
          {element.is_active ? (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Active</p>
            </div>
          ) : (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Inactive</p>
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

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "vehicle models",
    onAfterPrint: () => null
  });

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Vehicle Models</p>
        {/* <Button
          SocialIcon={AiOutlinePlus}
          social={true}
          text={"Add Vehicle Model"}
          onClick={() => router.push("/admin/vehicle_mgt/add_vehicle_model")}
        /> */}
      </div>
      {data.length !== 0 && (
        <p className=" tracking-wide text-textColor text-sm md:text-base mb-7 ">
          {data[0]?.vehicle_brand.name[0]?.toUpperCase() + data[0]?.vehicle_brand.name.slice(1)}{" "}
          Vehicle Models
        </p>
      )}
      {data.length !== 0 && (
        <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
          <PrintTable
            handlePrintDoc={handlePrintDoc}
            table_id={"#vehicle_models"}
            file_name={"vehicle_models"}
          />

          <SearchInput setValue={setSearchState} value={searchState} />
        </div>
      )}
      {/* table start here  */}
      {data.length == 0 ? (
        <EmptyTable Icon={BiWindow} title={"Models"} name={"Vehicle Models"} />
      ) : (
        <div
          id="vehicle_models"
          style={{ height: window.innerHeight, width: "100%" }}
          ref={componentToPrintRef}
          className="my-5 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl"
        >
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
                    <TbCar className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs ">Vehicle Models</p>
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
      )}
      {/* table end here  */}

      {/* <Pagination /> */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Admin User</p>
            <p className="text-sm text-textColor mt-2">You are about to delete an admin user</p>
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
            <p className="text-lg font-semibold mt-2">{successAction} deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              The {successAction} has been deleted.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Models.getLayout = Layout;
export default Models;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];
  const res = await fetch(`${BASE_URL}vehicle-models/brand/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      data
    }
  };
}
