import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { FiEdit } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../../components/common/Modal";
import { useRouter } from "next/router";
import { TbCar } from "react-icons/tb";
import Pagination from "../../../components/common/Pagination";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { BASE_URL } from "../../../api/base";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editMake } from "../../../features/editSlice";
import EmptyTable from "../../../components/common/EmptyTable";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BsEye } from "react-icons/bs";

const Vehicle = ({ data }) => {
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [make_id, setMake_id] = useState(null);
  const [loading, setLoading] = useState(false);

  const [vehicleBrands, setVehicleBrands] = useState(data);

  const dispatch = useDispatch();
  const router = useRouter();

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteMake = async () => {
    setLoading(true);
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}vehicle-brands/${make_id}`);
      if (data) {
        setLoading(false);
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };
  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }

  const rows = vehicleBrands
    .filter((item) => {
      if (searchState === "") return item;
      else if (item?.name?.toLowerCase().includes(searchState.toLowerCase())) {
        return item;
      }
    })
    ?.map((element) => (
      <tr
        onClick={() =>
          router.push({ pathname: "/admin/vehicle_mgt/vehicle_model", query: element.id })
        }
        className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="flex justify-center py-2 items-center space-x-2">
          {/* <img
           src="/lexus.png"
           className="rounded-full h-7 w-7 md:h-6 md:w-6 object-contain"
           alt=""
         /> */}
          <p className=" text-xs ">{element.name}</p>
        </td>{" "}
        {/* <td className="md:text-base text-xs p-3">Audi312n</td> */}
        <td className="">
          {element.is_active ? (
            <div className=" max-w-[70px]   p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Active</p>
            </div>
          ) : (
            <div className=" max-w-[70px]    p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Inactive</p>
            </div>
          )}
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button className="bg-green-600 border flex space-x-2 hover:bg-green-800   rounded-md p-1">
              <BsEye className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push("/admin/vehicle_mgt/add_vehicle_makes");
                dispatch(editMake(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMake_id(element.id);
                setDeleteModal(true), setSuccessAction(element.name);
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
    documentTitle: "vehicle_make",
    onAfterPrint: () => null
  });

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="text-lg md:text-sm tracking-wide font-semibold">Vehicle Make</p>

        <span className="">
          <button
            onClick={() => router.push("/admin/vehicle_mgt/add_vehicle_makes")}
            className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="md:text-xl -mt-0.5 text-sm" />
            &nbsp;Add Vehicle Make
          </button>
        </span>
      </div>
      <p className=" tracking-wide text-sm md:text-base mb-5 ">List of Vehicle Makes</p>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#vehicle_make"}
          file_name={"vehicle_make"}
        />
        <SearchInput value={searchState} setValue={setSearchState} />
      </div>
      {/* table start here  */}
      {data?.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={AiOutlineCar} title={"No vehicle brand record"} name={"vehicle"} />
        </div>
      ) : (
        <div
          ref={componentToPrintRef}
          id="vehicle_make"
          // style={{ height: window.innerHeight, width: "100%" }}
          className="my-5 bg-white w-full overflow-x-auto md:overflow-x-hidden border shadow pb-4  rounded-xl"
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
                    <p className="md:text-base text-xs ">Vehicle Makes</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex  ">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs text-center ">Status</p>
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
            <p className="text-lg font-semibold mt-2">Delete vehicle make</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a vehicle make</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button loading={loading} onClick={deleteMake} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">{successAction} deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              {successAction} make has been deleted.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Vehicle.getLayout = Layout;
export default Vehicle;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}vehicle-brands`, {
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
