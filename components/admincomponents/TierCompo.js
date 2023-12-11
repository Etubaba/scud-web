import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineGift } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../api/base";
import { editIncentive } from "../../features/editSlice";
import Button from "../common/Button";
import Modal from "../common/Modal";

const TierCompo = ({
  item: { id, name, rides, reward, description, duration, is_active },
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const iconColor =
    name === "Tier 3"
      ? "bg-green-600"
      : name === "Tier 2"
      ? "bg-scudGreen"
      : name === "Tier 1"
      ? "bg-yellow-400"
      : "bg-indigo-600";
  const textcolor =
    name === "Tier 3"
      ? "text-green-600"
      : name === "Tier 2"
      ? "text-scudGreen"
      : name === "Tier 1"
      ? "text-yellow-400"
      : "text-indigo-500";

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteTier = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      // console.log(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios.delete(`${BASE_URL}incentives/${id}`).then((res) => {
        console.log(res.data);
        if (res.data) {
          // setSuccessModal(true);
          setDeleteModal(false);
          refreshData();
          enqueueSnackbar(`${name} deleted successfully`, {
            variant: "success",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-4 mb-5 bg-white border rounded-lg w-full ">
      <div
        className={`flex items-center  ${
          is_active ? "justify-between" : "justify-start"
        }`}
      >
        <div className="flex space-x-3 justify-center items-center">
          <div
            className={`${iconColor} p-3 flex justify-center items-center rounded-full text-white`}
          >
            <AiOutlineGift className="text-xl " />
          </div>
          <p className={`${textcolor}`}>{name}</p>
        </div>
        {is_active && (
          <div className="flex space-x-1">
            <AiOutlineCheckCircle className="text-green-600 mt-1" />
            <p className="text-green-600 ">Active</p>
          </div>
        )}
      </div>
      <p className="text-sm text-textColor my-4">{description}</p>

      <div className="border-b mb-4" />
      <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex md:space-y-0 mb-3 md:mb-0 space-y-2 flex-col md:flex-row md:space-x-4">
          <div className="flex ">
            <img src="/photo.png" className="w-5 h-5 z-0" />
            <img src="/photo.png" className="w-5 h-5 -ml-1.5 z-10" />
            <img src="/photo.png" className="w-5 h-5 -ml-1.5 z-20" />
            <span className="flex ml-4 space-x-2">
              <p className="text-sm font-semibold text-textColor">1232</p>
              <p className="text-sm tracking-wide font-light">Total Drivers</p>
            </span>
          </div>
          <div className="flex space-x-2">
            <p className="text-textColor/50 text-sm">Task :</p>
            <p className="text-sm font-semibold text-textColor">
              Completed {""} {rides}
            </p>
          </div>
          <div className="flex space-x-2">
            <p className="text-textColor/50 text-sm">Period :</p>
            <p className="text-sm font-semibold text-textColor">
              {duration} days
            </p>
          </div>
          <div className="flex space-x-2">
            <p className="text-textColor/50 text-sm">Reward :</p>
            <p className="text-sm font-semibold text-textColor">{reward}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <span
            onClick={() => {
              dispatch(editIncentive(id));
              router.push("/admin/incentive_mgt/edit_tier");
            }}
            className="flex  mr-3 cursor-pointer text-scudGreen hover:text-scudGreen/30 space-x-1"
          >
            <BiEdit className=" text-sm" />
            <p className=" text-xs">Edit </p>
          </span>
          <span
            onClick={() => setDeleteModal(true)}
            className="flex cursor-pointer text-red-600 hover:text-red-600/30 space-x-1"
          >
            <RiDeleteBin6Line className=" text-sm" />
            <p className=" text-xs">Delete </p>
          </span>
        </div>
      </div>

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete {name}</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete {name}.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button onClick={deleteTier} text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TierCompo;
