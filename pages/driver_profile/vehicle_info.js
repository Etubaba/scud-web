import React, { useState } from "react";
import Layout from "../../components/driver_layout/Layout";
import { vehicles } from "../../dummy";
import { BsThreeDots } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline, MdErrorOutline } from "react-icons/md";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function Vehicle_info() {
  const [selectOpen, setSelectOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);

  const rows = vehicles.map((element) => (
    <tr
      key={element.id}
      className=" text-center hover:bg-gray-100 text-sm text-textColor border-b"
    >
      <td className="flex justify-center py-2 items-center space-x-2">
        <img src={element.image} className=" h-10 w-14" alt="" />
      </td>
      <td>{element.name}</td>
      <td>{element.type}</td>
      <td>{element.number}</td>
      <td>{element.color}</td>

      <td className="text-center">
        {element.status == "Active" ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Active</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">InActive</p>
          </div>
        )}
      </td>
      <td className="justify ">
        <BsThreeDots
          onClick={() => {
            setSelectOpen(true);
            setVehicleId(element.id);
          }}
          className="text-center ml-8 "
        />
      </td>
      {selectOpen && vehicleId === element.id && (
        <div className="w-24 h-auto mt-9  right-[1.5rem] py-1 px-2 absolute bg-white rounded border transition duration-300 ease-in z-40 shadow-xl">
          <span
            onClick={() => {
              setEditModal(true);
              setSelectOpen(false);
            }}
            className="flex hover:bg-gray-200 px-1 rounded-md text-textColor space-x-1"
          >
            <BiEdit className=" text-sm mt-1" />
            <p className="text-sm">Edit</p>
          </span>
          <span
            onClick={() => {
              setDeleteModal(true);
              setSelectOpen(!selectOpen);
            }}
            className="flex hover:bg-gray-200 px-1 rounded-md text-red-600 space-x-1"
          >
            <MdDeleteOutline className="text-sm mt-1" />
            <p>Delete</p>
          </span>
        </div>
      )}
    </tr>
  ));
  return (
    <div>
      <div>
        <p className="font-semibold text-lg tracking-wider"> Vehicles </p>
        <p className="text-sm mt-2 tracking-wide text-textColor">
          About my vehicles{" "}
        </p>
      </div>

      {/* table start here  */}
      <div className="mt-10 mb-6  bg-white overflow-x-auto border shadow pb-4  rounded-xl">
        <table className="w-full overflow-x-auto min-w-[700px]">
          <thead className="border-b bg-[#fbfbff] w-full rounded-t-lg">
            <tr className="border-b ">
              <td className=" text-center">Vehicle Photo</td>
              <td className="py-4 text-center "> Vehicle Name</td>
              <td className="text-center">Vehicle Type</td>
              <td className="text-center "> Vehicle Number</td>
              <td className=" text-center"> Color</td>
              <td className="text-center "> Status</td>
              <td className=" text-center">Action</td>
            </tr>
          </thead>

          <tbody className="mx-4">{rows}</tbody>
        </table>
      </div>
      {/* table end here  */}

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Vehicle?</p>
            <p className="text-sm text-textColor mt-2">
              You are about to delete your vehicle?
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button text={"Yes, Delete"} />
          </div>
        </div>
      </Modal>

      {/* edit modal start here */}
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <div className="md:w-[24rem] h-auto">
          <p className=" text-center font-semibold md:text-left ">
            Edit/Change Vehicle
          </p>
          <div className="border-b my-4" />
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-textColor">
              Enter your FRSC Registration Number
            </p>
            <input
              type="text"
              className="border  focus:border-scudGreen focus:outline-none outline-none focus:ring-1 focus:ring-scudGreen rounded-md px-2 py-1"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setEditModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button text={"Submit"} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

Vehicle_info.getLayout = Layout;
export default Vehicle_info;
