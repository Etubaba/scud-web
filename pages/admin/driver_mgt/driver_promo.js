import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineCheckCircle,
  AiOutlineGift,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting,
  AiOutlineTag
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";

import EmptyTable from "../../../components/common/EmptyTable";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline, MdOutlineLocalCarWash, MdOutlineLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import SearchInput from "../../../components/admincomponents/SearchInput";

import Modal from "../../../components/common/Modal";
import { vehicle_type, roles } from "../../../dummy";
import { useRouter } from "next/router";
import { TbCar } from "react-icons/tb";
import { HiOutlineMenuAlt2, HiOutlineSpeakerphone } from "react-icons/hi";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editDriverPromo, editVehicleType } from "../../../features/editSlice";
import { BsCalendarDate, BsEye } from "react-icons/bs";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { forwardRef } from "react";

const driver_promo = forwardRef(({ promos, location, vehicleTypes }) => {
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [promo_id, setPromo_id] = useState(null);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const dispatch = useDispatch();

  //   const promos = [];

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const editPromo = async (element) => {
    let locationIds = [];
    let vehicle_types = [];

    for (let i = 0; i < element.locations.length; i++) {
      for (let j = 0; j < location.length; j++) {
        if (location[j].name === element.locations[i]) {
          locationIds.push({
            name: location[j].name,
            id: location[j].id
          });
        }
      }
    }

    for (let i = 0; i < element.vehicle_types.length; i++) {
      for (let j = 0; j < vehicleTypes.length; j++) {
        if (vehicleTypes[j].name === element.vehicle_types[i]) {
          vehicle_types.push({
            name: vehicleTypes[j].name,
            id: vehicleTypes[j].id
          });
        }
      }
    }

    router.push("/admin/driver_mgt/add_promo");

    dispatch(
      editDriverPromo({
        id: element.id,
        name: element.name,
        vehicle_type_ids: vehicle_types,
        location_ids: locationIds,
        trips: element.trips,
        online_hours: element.online_hours,
        expires_at: element.expires_at,
        acceptance_rate: element.acceptance_rate,
        cancellation_rate: element.cancellation_rate,
        driver_score: element.driver_score,
        is_active: element.is_active
      })
    );
  };

  const rows = promos
    .filter((el) => {
      if (searchState === "") return el;
      else if (el.name.toLowerCase().includes(searchState.toLowerCase())) return el;
    })
    ?.map((element) => (
      <tr
        onClick={() => {
          router.push({ pathname: "/admin/driver_mgt/promo_progress", query: element.id });
        }}
        className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base text-xs p-3">{element.name}</td>
        <td className="md:text-base text-xs p-3">
          {element.vehicle_types.length > 1 ? "All vehicles" : element.vehicle_types[0]}
        </td>
        <td className="md:text-base text-xs p-3">
          {element.locations.length > 1
            ? `${element.locations[0]},${element.locations[1]},...`
            : element.locations[0]}
        </td>

        <td className="md:text-xs text-textColor text-[7px] p-3">
          {new Date(element.created_at).toLocaleString()}
        </td>
        <td className="md:text-xs text-textColor text-[7px] p-3">
          {new Date(element.expires_at).toLocaleString()}
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
            {/* <button className="bg-green-600 border flex space-x-2 hover:bg-green-800   rounded-md p-1">
              <BsEye className="text-white" />
            </button> */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                editPromo(element);
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
                setPromo_id(element.id);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const deletePromo = async () => {
    setLoading(true);
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}driver-promos/${promo_id}`);
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

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "admin users",
    onAfterPrint: () => null
  });

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Driver Promo</p>

        <span className="">
          <button
            onClick={() => router.push("/admin/driver_mgt/add_promo")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[8px] md:text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="md:text-xl -mt-0.5 text-sm" />
            &nbsp;Add Promo
          </button>
        </span>
      </div>

      {promos?.length !== 0 && (
        <>
          <p className=" tracking-wide text-sm text-textColor mb-6 ">List of driver's promo</p>
          <div className="flex items-center flex-col-reverse md:flex-row md:justify-between">
            <PrintTable
              handlePrintDoc={handlePrintDoc}
              table_id={"#driver_promo"}
              file_name={"driver promo"}
            />
            <SearchInput value={searchState} setValue={setSearchState} />
          </div>
        </>
      )}
      {/* table start here  */}
      {promos?.length === 0 ? (
        <EmptyTable Icon={AiOutlineTag} name={"driver promo"} title={"No Driver Promo"} />
      ) : (
        <div
          id="driver_promo"
          ref={componentToPrintRef}
          style={{ height: window.innerHeight, width: "100%" }}
          className="mt-6 mb-6 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl"
        >
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
                    <AiOutlineGift className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs text-title">Offer Type </p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineCar className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Vehicle Type</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Location</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsCalendarDate className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Start Date</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsCalendarDate className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Expiration</p>
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

      {/* {promos?.length > 10 && <Pagination />} */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Driver Promo</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a driver promo</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button loading={loading} onClick={deletePromo} text={"Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Promo deleted .</p>
            <p className="text-sm text-center text-textColor mt-2">
              Promo has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
});
driver_promo.getLayout = Layout;
export default driver_promo;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const [driverPromoRes, locationRes, vehicleRes] = await Promise.all([
    fetch(`${BASE_URL}driver-promos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}locations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}vehicle-types`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);
  const [promos, location, vehicleTypes] = await Promise.all([
    driverPromoRes.json(),
    locationRes.json(),
    vehicleRes.json()
  ]);

  if (
    (promos?.statusCode !== undefined && promos?.statusCode === 401) ||
    (location.statusCode !== undefined && location.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      promos,
      location,
      vehicleTypes
    }
  };
}
