import React, { useEffect, useRef } from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineCheckCircle,
  AiOutlineGift,
  AiOutlinePlus,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";

import EmptyTable from "../../../components/common/EmptyTable";
import { FiEdit } from "react-icons/fi";

import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import SearchInput from "../../../components/admincomponents/SearchInput";

import Modal from "../../../components/common/Modal";
import { useRouter } from "next/router";
import { TbCar } from "react-icons/tb";
import Pagination from "../../../components/common/Pagination";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { BsCalendarDate, BsTag } from "react-icons/bs";
import { validateToken } from "../../../components/services/validateToken";
import { IoLocationOutline } from "react-icons/io5";
import PrintTable from "../../../components/common/table/PrintTable";
import { useReactToPrint } from "react-to-print";
import { BASE_URL } from "../../../api/base";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { editPromo } from "../../../features/editSlice";

const index = ({ promos }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [promo_id, setPromo_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [promo, setPromo] = useState(promos.data);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const rows = promo?.map((element) => (
    <tr
      onClick={(e) => {
        e.stopPropagation(),
          router.push({
            pathname: "/rider_promo_setting/promo_progress",
            query: element.id
          });
      }}
      className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.type}</td>
      <td className="md:text-base text-xs p-3">Discount</td>
      <td
        title={element.discount_locations.map((item, index) => {
          return item?.locations?.name;
        })}
        className="md:text-base text-xs p-3 flex space-x-1"
      >
        {element.discount_locations.map((item, index) => (
          <p key={index} className="text-xs">
            {item?.locations?.name.substring(0, 8)},
          </p>
        ))}
      </td>

      <td className="md:text-base text-textColor text-xs p-3">
        {new Date(element.end_date) < new Date() ? (
          <p className="text-red-600">Expired</p>
        ) : (
          new Date(element.end_date).toDateString()
        )}
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
            onClick={(e) => {
              e.stopPropagation(), console.log(element);
              dispatch(editPromo(element));
              router.push("/admin/rider_promo_setting/add_promo");
            }}
            className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
          >
            <FiEdit className="text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(), setDeleteModal(true), setPromo_id(element.id);
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
      const { data } = await axios.delete(`${BASE_URL}discount/${promo_id}`);
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
    documentTitle: "promo settings",
    onAfterPrint: () => null
  });

  //filter by search
  useEffect(() => {
    if (searchState === "") {
      setPromo(promos.data);
    } else {
      let filteredData;
      filteredData = promo.filter((item) => {
        return item.type?.toLowerCase().includes(searchState.toLowerCase());
      });

      setPromo(filteredData);
    }
  }, [searchState]);

  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Riders Promo</p>
        <Link href={"/admin/rider_promo_setting/add_promo"}>
          <span className="">
            <button className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[8px] md:text-[14px] text-white rounded-md p-2 ">
              <AiOutlinePlus className="md:text-xl -mt-0.5 text-sm" />
              &nbsp;Create Promo
            </button>
          </span>
        </Link>
      </div>

      {promos.data?.length !== 0 && (
        <>
          <p className=" tracking-wide text-sm text-textColor mb-7 ">List of driver's promo</p>
          <div className="flex flex-col-reverse md:flex-row md:justify-between">
            <PrintTable
              handlePrintDoc={handlePrintDoc}
              table_id={"#promo_settings"}
              file_name={"promo settings"}
            />
            <SearchInput setValue={setSearchState} value={searchState} />
          </div>
        </>
      )}
      {/* table start here  */}
      {promos.data?.length === 0 ? (
        <EmptyTable Icon={BsTag} name={"rider promo"} title={"No Promo Type"} />
      ) : (
        <div
          id="promo_settings"
          ref={componentToPrintRef}
          style={{ height: window.innerHeight, width: "100%" }}
          className="my-5 bg-white w-full md:overflow-x-hidden border shadow pb-4  rounded-xl"
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
                    <p className="md:text-base text-xs text-title">Promo Type </p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineCar className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Offer Type</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <IoLocationOutline className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Locations</p>
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
            <p className="text-lg font-semibold mt-2">Delete Promo</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a promo.</p>
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
};
index.getLayout = Layout;
export default index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const [riderPromoRes] = await Promise.all([
    fetch(`${BASE_URL}discount`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);
  const [promos] = await Promise.all([riderPromoRes.json()]);

  if (promos?.statusCode !== undefined && promos?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      promos
      // location,
      // vehicleTypes
    }
  };
}
