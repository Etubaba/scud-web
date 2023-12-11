import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineRight } from "react-icons/ai";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import NumberSelect from "../../../components/common/NumberSelect";
import Select from "../../../components/common/Select";

const Edit_Profile = () => {
  const [status, setStatus] = useState("Active");
  const [successModal, setSuccessModal] = useState(false);
  const statusList = ["Active", "Inactive", "Pending"];

  const router = useRouter();
  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-1 mb-10 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 text-sm tracking-wide hover:underline"
          onClick={() => router.push("/admin/rider_mgt/rider_profile")}
        >
          Manage Riders
        </p>{" "}
        <AiOutlineRight className="text-gray-500/60 mt-0.5 text-base" />
        <p className="text-gray-500/60 tracking-wide text-sm">Cynthia Ehuju</p>
        <AiOutlineRight className=" mt-0.5 text-base" />{" "}
        <p className="tracking-wide text-sm">Edit Profile</p>
      </span>
      <div className="mb-10">
        <div className="py-5 px-5 bg-white rounded-t-lg border  w-full flex items-center justify-between ">
          <div className="flex justify-center items-center space-x-4">
            <img src={"/photo.png"} className="w-20 h-20" alt="" />
            <div className="flex flex-col space-y-3">
              <p className="text-textColor font-semibold">Cynthia ehuni</p>
              <div className="flex space-x-4 justify-center items-center">
                <p className="text-xs text-textColor/50">
                  {" "}
                  Joined 22 Nov, 2022
                </p>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 mt-1 rounded-full bg-green-600"></span>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <div
                className={`max-w-[70px]  jus bg-green-600/10 py-[1.3px] px-4 rounded-md`}
              >
                <p className="text-xs text-center text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-8 px-4 md:px-6 rounded-b-lg w-full h-auto border-b border-x">
          <p className="text-textColor/50 mb-5 text-base">
            Edit James's profile information
          </p>

          <div className="md:w-[65%]  ">
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">First Name</label>
              <input
                type={"text"}
                placeholder=" "
                className="border-[0.7px] rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            </div>
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Last Name</label>
              <input
                type={"text"}
                placeholder=" "
                className="border-[0.7px] rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            </div>
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Gender</label>
              <input
                type={"text"}
                placeholder=" "
                className="border-[0.7px] rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            </div>
            <div className=" md:flex w-full items-center justify-between mb-4">
              <label className="text-base">Phone</label>
              <div className="w-full md:w-[75%]">
                <NumberSelect />
              </div>
            </div>
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Email</label>
              <input
                type={"text"}
                placeholder=" "
                className="border-[0.7px] rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            </div>

            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Country</label>
              <div className="w-full md:w-[75%]">
                <Select
                  data={statusList}
                  style={"w-full p-2"}
                  positon={"p-2"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={
                    " w-[16.5rem] md:w-[28.8rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                  }
                  color=""
                />
              </div>
            </div>
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">State</label>
              <div className="w-full md:w-[75%]">
                <Select
                  data={statusList}
                  style={"w-full p-2"}
                  positon={"p-2"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={
                    " w-[16.5rem] md:w-[28.8rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                  }
                  color=""
                />
              </div>
            </div>
            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">City</label>
              <div className="w-full md:w-[75%]">
                <Select
                  data={statusList}
                  style={"w-full p-2"}
                  positon={"p-2"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={
                    " w-[16.5rem] md:w-[28.8rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                  }
                  color=""
                />
              </div>
            </div>

            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Home Address</label>
              <input
                type={"text"}
                placeholder=" "
                className="border-[0.7px] rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            </div>

            <div className="md:flex w-full items-center justify-between mb-4">
              <label className="text-base ">Status</label>
              <div className="w-full md:w-[75%]">
                <Select
                  data={statusList}
                  style={"w-full p-2"}
                  positon={"p-2"}
                  value={status}
                  setValue={setStatus}
                  dropDownWidth={
                    " w-[16.5rem] md:w-[28.8rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                  }
                  color=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/rider_mgt/rider_profile")}
          className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-7 py-1 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>
        <Button
          onClick={() => setSuccessModal(true)}
          text={"Update  Profile"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Profile updated.</p>
            <p className="text-sm text-center text-textColor mt-2">
              James profile updated successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Edit_Profile.getLayout = Layout;
export default Edit_Profile;
