import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";

import EmptyTable from "../../../components/common/EmptyTable";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline, MdOutlineLocalCarWash } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import SearchInput from "../../../components/admincomponents/SearchInput";

import Modal from "../../../components/common/Modal";
import { vehicle_type, roles } from "../../../dummy";
import { useRouter } from "next/router";
import { TbCar } from "react-icons/tb";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editVehicleType } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";

const VehicleType = ({ vehicle_type }) => {
  const [searchState, setSearchState] = useState("");

  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [vehicle_id, setVehicle_id] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const dispatch = useDispatch();

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // const vehicle_type = [];
  const rows = vehicle_type
    .filter((item) => {
      if (searchState === "") return item;
      else if (item?.name?.toLowerCase().includes(searchState.toLowerCase())) {
        return item;
      }
    })
    ?.map((element) => (
      <tr
        className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base text-xs p-3">{element.name}</td>

        <td className="md:text-base text-textColor text-xs p-3">
          {new Date(element.minimum_year).getFullYear() +
            "-" +
            new Date(element.maximum_year).getFullYear()}
        </td>
        <td align="center" className="text-center ">
          {element.is_active ? (
            <div className=" max-w-[100px] ml-10 p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600 ">Active</p>
            </div>
          ) : (
            <div className=" max-w-[100px] ml-10 p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Inactive</p>
            </div>
          )}
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                router.push("/admin/vehicle_mgt/add_vehicle_type");
                dispatch(
                  editVehicleType({
                    id: element.id,
                    name: element.name,
                    minimum_year: new Date(element.minimum_year).getFullYear(),
                    maximum_year: new Date(element.maximum_year).getFullYear(),
                    is_active: element.is_active ? "Active" : "Inactive"
                  })
                );
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                setDeleteModal(true), setVehicle_id(element.id);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const deleteVehicleType = async () => {
    setLoading(true);
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}vehicle-types/${vehicle_id}`);
      if (data) {
        setLoading(false);
        setDeleteModal(false);
        setSuccessModal(true);
        refreshData();
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Vehicle Types</p>
        <Button
          onClick={() => router.push("/admin/vehicle_mgt/add_vehicle_type")}
          text={"Add Vehicle type"}
          social={true}
          SocialIcon={AiOutlinePlus}
        />
      </div>

      {vehicle_type?.length !== 0 && (
        <>
          <p className=" tracking-wide mb-7 ">List of Vehicle Types</p>
          <div className="flex flex-col-reverse md:flex-row md:justify-between">
            <PrintTable />
            <SearchInput setValue={setSearchState} value={searchState} />
          </div>
        </>
      )}
      {/* table start here  */}
      {vehicle_type?.length === 0 ? (
        <EmptyTable Icon={AiOutlineCar} name={"vehicle type"} title={"No Vehicle Type"} />
      ) : (
        <div className="mt-5 mb-6 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-title  text-xs">id</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <TbCar className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs text-title">Vehicle Type Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <HiOutlineMenuAlt2 className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Vehicle Year</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs text-title">Status</p>
                  </div>
                </td>
                <td className=" text-left">
                  <div className="flex   justify-center">
                    <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Actions</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}

      {/* {vehicle_type?.length !== 0 && <Pagination />} */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Vehicle Type</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a vehicle type</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button loading={loading} onClick={deleteVehicleType} text={"Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Vehicle type deleted .</p>
            <p className="text-sm text-center text-textColor mt-2">
              Vehicle type has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

VehicleType.getLayout = Layout;
export default VehicleType;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}vehicle-types`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const vehicle_type = await res.json();

  if (vehicle_type?.statusCode !== undefined && vehicle_type?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      vehicle_type
    }
  };
}
