import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { BiHash, BiMoney } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdErrorOutline, MdOutlineLocationOn, MdOutlineModeNight } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbActivityHeartbeat, TbCar } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Button from "../../../components/common/Button";
import EmptyTable from "../../../components/common/EmptyTable";
import Modal from "../../../components/common/Modal";
import Pagination from "../../../components/common/Pagination";
import { getToken } from "../../../components/services/refresh";
import { editFare } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";

const Fares = ({ data }) => {
  const [car, setCar] = useState("All vehicles");
  const [peak, setPeak] = useState("All peak");
  const [search, setSearch] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [fare_id, setFare_id] = useState(null);
  const fares = data?.data;
  const [fareList, setFareList] = useState(fares);

  const router = useRouter();
  const dispatch = useDispatch();

  //refresh serverside fetching
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteFare = async () => {
    try {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.delete(`${BASE_URL}fare/${fare_id}`);
      if (data) {
        setSuccessModal(true);
        setDeleteModal(false);
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rows = fareList
    ?.filter((item) => {
      if (search === "") {
        return item;
      } else if (item.location.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
        return item;
      }
    })
    .map((element) => (
      <tr
        className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base  text-xs p-3">{element.id}</td>
        <td className="md:text-base  text-xs p-3">{element.location?.name}</td>
        <td className="md:text-base text-xs p-3">{element.vehicle_type?.name}</td>
        <td className="md:text-base text-xs p-3">
          {element.peak_fares.length == 0 ? "No" : "Yes"}
        </td>
        <td className="md:text-base text-xs p-3">{element.night_fare == null ? "No" : "Yes"}</td>

        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                router.push("/admin/payment_mgt/add_fare");
                dispatch(editFare(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                setFare_id(element.id);
                setDeleteModal(true);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>{" "}
          </span>
        </td>
      </tr>
    ));

  const dropdown = [
    {
      OptionIcon: <TbCar className=" mt-0.5 text-textColor" />,
      option: "All vehicles"
    },
    {
      OptionIcon: <TbCar className=" mt-0.5 text-textColor" />,
      option: "Premium"
    },
    {
      OptionIcon: <TbCar className=" mt-0.5 text-textColor" />,
      option: "Standard"
    }
  ];

  const dropdown2 = [
    {
      OptionIcon: <TbActivityHeartbeat className=" mt-0.5 text-textColor" />,
      option: "All Peak"
    },
    {
      OptionIcon: <TbActivityHeartbeat className=" mt-0.5 text-textColor" />,
      option: "Yes"
    },
    {
      OptionIcon: <TbActivityHeartbeat className=" mt-0.5 text-textColor" />,
      option: "No"
    }
  ];

  useEffect(() => {
    if (car === "All vehicles" && peak === "All pick") return;
    if (car !== "All vehicles") {
      const filtered = fares.filter((el) => {
        return el.vehicle_type.name == car;
      });
      setFareList(filtered);
    }
  }, [car]);
  useEffect(() => {
    if (peak === "All pick") return;
    if (peak !== "All pick") {
      const filtered = fares.filter((el) => {
        if (peak == "Yes") return el.apply_peak_fare;
        else return !el.apply_peak_fare;
      });
      setFareList(filtered);
    }
  }, [peak]);

  return (
    <div>
      {" "}
      <div className="flex  mb-5  md:mb-7 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Manage Fares</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/payment_mgt/add_fare")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl " />
            &nbsp;Add New Fares
          </button>
        </span>
      </div>
      <p className="font-semibold mb-8 text-textColor  text-sm">All Fares</p>
      <div className="block md:hidden my-5">
        <SearchInput value={search} setValue={setSearch} />
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-3 ">
          <Select2
            data={dropdown}
            position={"mt-[8.5rem]"}
            showSearch={false}
            Icon={TbCar}
            setValue={setCar}
            value={car}
            iconDropdown={true}
          />
          <Select2
            data={dropdown2}
            position={"mt-[8rem]"}
            showSearch={false}
            Icon={TbActivityHeartbeat}
            setValue={setPeak}
            value={peak}
            iconDropdown={true}
          />
        </div>
        <div className="hidden md:block">
          <SearchInput value={search} setValue={setSearch} />
        </div>
      </div>
      {/* table start here  */}
      {fares?.length === 0 ? (
        <EmptyTable title={"No fare records"} name={"fare"} Icon={BiMoney} />
      ) : (
        <div className="mt-6 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
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
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Location Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <TbCar className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Vehicle Type</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <TbActivityHeartbeat className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Apply Peak</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineModeNight className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Apply Night</p>
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
            <p className="text-lg font-semibold mt-2">Delete Currency</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a currency.</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteFare} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Fare deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Fare has been deleted successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Fares.getLayout = Layout;
export default Fares;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}fare`, {
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
