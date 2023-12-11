import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import Select2 from "../../../components/admincomponents/Select2";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineGift,
  AiOutlinePlus,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { BsPersonLinesFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { MdErrorOutline, MdOutlineLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import Modal from "../../../components/common/Modal";

import { useRouter } from "next/router";
import Pagination from "../../../components/common/Pagination";
import { BASE_URL, STATE_URL } from "../../../api/base";
import SearchInput from "../../../components/admincomponents/SearchInput";
import { useEffect } from "react";
import { getToken } from "../../../components/services/refresh";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { editPromo } from "../../../features/editSlice";
import Cookies from "js-cookie";

import EmptyTable from "../../../components/common/EmptyTable";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { validateToken } from "../../../components/services/validateToken";

const Promo = ({ data, stateData }) => {
  const promo = data.data;
  const [searchState, setSearchState] = useState("");
  const [promoList, setPromoList] = useState(promo);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [location, setLocation] = useState("Locations");
  const [promo_id, setPromo_id] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const states = stateData?.map((item) => item.name);

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const rows = promoList
    .filter((el) => {
      if (searchState === "") return el;
      else if (
        el.first_name.toLowerCase().includes(searchState.toLowerCase()) ||
        el.last_name.toLowerCase().includes(searchState.toLowerCase()) ||
        el.email.toLowerCase().includes(searchState.toLowerCase())
      )
        return el;
    })
    ?.map((element) => (
      <tr
        className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base text-xs p-3">{element.code}</td>
        <td className="md:text-base text-xs p-3">{element.city.name}</td>
        <td className="md:text-base text-xs p-3">
          {" "}
          {element.payment_type === "amount" ? `₦${element.amount}` : `%${element.amount}`}
        </td>
        <td className="md:text-base text-xs p-3">
          {element.users.length === 0 ? "All Riders" : "Specific Riders"}
        </td>
        <td className="text-center">
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
              onClick={() => {
                router.push("/admin/rider_mgt/create_promo");
                dispatch(editPromo(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
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
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(`${BASE_URL}promos/${promo_id}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          if (msg === "Unauthorized" || err.response.data.statusCode == 401) {
            await getToken(true);
            enqueueSnackbar(`Try again, something went wrong`, {
              variant: "info"
            });
          } else
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

  if (successModal) {
    setTimeout(() => setSuccessModal(false), 3000);
  }
  useEffect(() => {
    if (location === "Locations") return;
    const newPromo = promo.filter((el) => el.city?.name?.toLowerCase() == location.toLowerCase());
    setPromoList(newPromo);
  }, [location]);

  return (
    <div>
      <div className="flex mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Rider's Promo </p>

        <Button
          text={"Add promo"}
          SocialIcon={AiOutlinePlus}
          social={true}
          onClick={() => router.push("/admin/rider_mgt/create_promo")}
        />
      </div>
      {promo.length !== 0 && (
        <div className="flex justify-between items-center">
          <div className="flex space-x-5">
            <Select2
              data={states}
              Icon={MdOutlineLocationOn}
              setValue={setLocation}
              value={location}
              position={"mt-[23rem]"}
            />
          </div>
          <div className="mt-3">
            <SearchInput value={searchState} setValue={setSearchState} />
          </div>
        </div>
      )}
      {/* table start here  */}
      {promo?.length === 0 ? (
        <EmptyTable name="promo" title={"No Promo Record"} Icon={HiOutlineSpeakerphone} />
      ) : (
        <div className="my-5  bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
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
                    <p className="md:text-base text-xs ">Promo Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Location</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineGift className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Offer</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPersonLinesFill className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Promo For</p>
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
            <p className="text-lg font-semibold mt-2">Delete Promo</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a Promo</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deletePromo} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Promo deleted.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Promo has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Promo.getLayout = Layout;
export default Promo;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}promos`, {
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

  const data = await res.json();
  const stateData = await stateRes.json();

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (stateData.statusCode !== undefined && stateData.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data,
      stateData
    }
  };
}
