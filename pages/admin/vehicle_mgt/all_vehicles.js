import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

import { FiActivity, FiEdit } from "react-icons/fi";
import { GiPoliceOfficerHead, GiSteeringWheel } from "react-icons/gi";

import { MdErrorOutline, MdOutlineLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import DashboardCompo from "../../../components/common/DashboardCompo";
import Modal from "../../../components/common/Modal";

import { useRouter } from "next/router";
import Select2 from "../../../components/admincomponents/Select2";
import { FaCarSide } from "react-icons/fa";
import Pagination from "../../../components/common/Pagination";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { BASE_URL, STATE_URL } from "../../../api/base";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyTable from "../../../components/common/EmptyTable";
import { TbCar } from "react-icons/tb";
import { validateToken } from "../../../components/services/validateToken";
import { useEffect } from "react";

const AllVehicles = ({ vehicles, states }) => {
  const [approval, setApproval] = useState("");
  const [vehicle_id, setVehicle_id] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [openMenu, setOpenMenu] = useState(false);
  const [vehicleList, setVehicleList] = useState(vehicles);
  const [status, setStatus] = useState("Status");
  const [vtype, setVtype] = useState("vehicle type");
  const [locations, setLocations] = useState("Loactions");
  const [search, setSearch] = useState("");

  // const stateList = states.map((state) => state.name);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const updateVehicleStatus = async () => {
    try {
      setSuccessAction("Updated");
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}vehicles/${vehicle_id}`, {
        verification: approval
      });
      if (data) {
        refreshData();
        setSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rows = vehicleList
    .filter((item) => {
      if (search === "") return item;
      else if (
        item?.user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.vehicle_brand.name?.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    })
    ?.map((element) => (
      <tr className=" text-center text-sm  text-textColor border-b" key={element.id}>
        <td className="md:text-base justify-center text-xs p-3 flex space-x-2">
          <img src={element.images[0]} className="rounded-full h-7 w-7" alt="" />
          <p>{element.vehicle_brand.name}</p>
        </td>{" "}
        <td className="md:text-base text-xs p-3">
          {element.model}/ {new Date(element.manufacture_date).getFullYear()}
        </td>
        <td className="md:text-base justify-center text-xs p-3 flex space-x-2">
          <img src={element.user.picture} className="rounded-full h-7 w-7" alt="" />
          <p>
            {element?.user?.first_name?.charAt(0).toUpperCase() +
              element?.user?.first_name?.slice(1) +
              " " +
              element?.user?.last_name?.charAt(0).toUpperCase() +
              element?.user?.last_name?.slice(1)}
          </p>
        </td>{" "}
        <td className="md:text-base text-xs p-3">{element.user?.phone} </td>
        <td className="text-center">
          {element.verification == "verified" ? (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Verified</p>
            </div>
          ) : element.verification == "pending" ? (
            <div className=" max-w-[100px] p-1 rounded-lg bg-scudGreen/10">
              <p className="text-scudGreen">pending</p>
            </div>
          ) : (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Declined</p>
            </div>
          )}
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                setVehicle_id(element.id);
                setOpenMenu(true);
              }}
              className="bg-scudGreen border relative  space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
              {openMenu === true && element.id === vehicle_id && (
                <div className="absolute p-1 max-h-80 overflow-y-auto bg-white max-w-[200px] min-w-[65px] rounded border transition duration-300 ease-in z-40 shadow-xl">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(false);
                      setApproval("verified");
                      updateVehicleStatus();
                    }}
                    className="py-1 text-xs text-textColor hover:bg-adminbg"
                  >
                    Approve
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(false);
                      setApproval("failed");
                      updateVehicleStatus();
                    }}
                    className="py-1 text-xs text-textColor hover:bg-adminbg"
                  >
                    Decline
                  </p>
                </div>
              )}
            </button>
            <button
              onClick={() => {
                setDeleteModal(true);
                setVehicle_id(element.id);
                setSuccessAction("Deleted");
              }}
              className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const deleteVehicle = async () => {
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}vehicles/${vehicle_id}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (successModal) setTimeout(() => setSuccessModal(false), 3000);

  useEffect(() => {
    if (status === "Status") return;
    const filteredVehicles = vehicles.filter((el) => el.verification === status.toLowerCase());
    setVehicleList(filteredVehicles);
  }, [status]);
  useEffect(() => {
    if (vtype === "vehicle type") return;
    const filteredVehicles = vehicles.filter(
      (el) => el.vehicle_type.name.toLowerCase() === vtype.toLowerCase()
    );
    setVehicleList(filteredVehicles);
  }, [vtype]);

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="text-lg  tracking-wide font-semibold">All Vehicles</p>
      </div>
      <div className="grid my-10 w-full grid-cols-1 md:grid-cols-3  gap-4 ">
        <DashboardCompo
          title={"Total Vehicles"}
          value={`${vehicles?.length}`}
          filled={true}
          Icon={GiSteeringWheel}
          color="indigo"
        />
        <DashboardCompo
          title={"Standard vehicles"}
          value={"25"}
          filled={true}
          Icon={GiSteeringWheel}
          color="yellow"
        />
        <DashboardCompo
          title={"Premium Vehicles"}
          value={"65"}
          filled={true}
          Icon={GiSteeringWheel}
          color="green"
        />
      </div>
      <div className="flex mb-8 justify-between">
        <p>List of All Vehicles</p>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="flex mt-4 md:mt-0 space-x-3 ">
          <Select2
            data={["Premium", "Standard"]}
            // iconDropdown={true}
            position={"mt-[6.5rem]"}
            showSearch={false}
            Icon={FaCarSide}
            setValue={setVtype}
            value={vtype}
          />
          <Select2
            data={["Verified", "Pending", "Declined"]}
            // iconDropdown={true}
            position={"mt-[8rem]"}
            showSearch={false}
            Icon={FiActivity}
            setValue={setStatus}
            value={status}
          />
          {/* <Select2
            // style={"w-[150px] relative block "}
            // iconDropdown={true}
            position={"mt-[22.9rem]"}
            data={stateList}
            Icon={MdOutlineLocationOn}
            setValue={setLocations}
            value={locations}
          /> */}
        </div>

        <SearchInput value={search} setValue={setSearch} />
      </div>
      {/* table start here  */}
      {vehicles?.length === 0 ? (
        <EmptyTable name="vehicle" title={"No Vehicle Records"} Icon={TbCar} />
      ) : (
        <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <FaCarSide className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Vehicle Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <FaCarSide className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Model/Year</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <GiPoliceOfficerHead className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Driver</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Phone</p>
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
            <p className="text-lg font-semibold mt-2">Delete Vehicle</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a vehicle.</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteVehicle} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      {/* success modal */}
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> {successAction} Vehicle</p>
            <p className="text-sm text-center text-textColor mt-2">
              Vehicle has been {successAction.toLowerCase()} successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

AllVehicles.getLayout = Layout;
export default AllVehicles;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}vehicles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const stateRes = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const vehicles = await res.json();
  const states = await stateRes.json();

  if (
    (vehicles?.statusCode !== undefined && vehicles?.statusCode === 401) ||
    (states.statusCode !== undefined && states.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      vehicles,
      states
    }
  };
}
