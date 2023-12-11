import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/driver_layout/Layout";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import { BsCalendar2Date, BsClock, BsCreditCard, BsPersonCircle, BsSearch } from "react-icons/bs";
import { earning } from "../../../dummy";
import { BiRefresh } from "react-icons/bi";
import { MdLocationOn, MdOutlineLocationOn } from "react-icons/md";
import Modal from "../../../components/common/Modal";

function transactions({ server }) {
  const [datevalue, setDateValue] = useState("2021");
  const [searchState, setSearchState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState();
 

  const rows = earning.map((element) => (
    <tr
      onClick={() => {
        setDetails(element);
        setModalOpen(true);
      }}
      className=" text-center hover:shadow-md hover:border text-sm text-textColor border-b"
      key={element.id}
    >
      <td className="flex justify-center py-2 items-center space-x-2">
        <img
          src={element.rider.avatar}
          className="rounded-full h-10 w-10"
          alt=""
        />
        <p>{element.rider.name}</p>
      </td>
      <td>{element.pickup}</td>
      <td>{element.destinatiom}</td>
      <td>{element.fare}</td>
      <td>{element.timespent}</td>
      <td> {`${element?.oweing}`}</td>
      <td className="text-center">
        {element.tripStatus == "Completed" ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Completed</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">Cancelled</p>
          </div>
        )}
      </td>
    </tr>
  ));

  const router = useRouter();
  const { id } = router.query;

  console.log(id, "client side");
  console.log(server, "server side");

  return (
    <div>
      <div className="flex mb-10 justify-between items-center">
        <div>
          <p className="text-sm tracking-wider ">You are oweing</p>
          <p className="text-lg tracking-wider font-semibold">₦9345.34 </p>
        </div>
        <div className="flex space-x-2.5 rounded-md mt-1 px-1">
          {searchState ? (
            <div className="shadow-md animate__fadeInRight animate__animated flex px-3 py-1 -mt-3 rounded-lg bg-white">
              <input
                placeholder="Search..."
                className=" outline-none bg-white"
                type={"text"}
              />
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setSearchState(true)}
              className="bg-white -mt-4 space-x-4 justify-center items-center rounded-lg shadow-lg p-[6px] flex"
            >
              <div className="bg-scudGreen p-1 rounded-full flex justify-center items-center">
                <BsSearch className="text-white text-sm" />
              </div>
              <p className="text-sm">Search</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex mb-10 justify-between items-center">
        <Button
          // onClick={() => {
          //   setCongratModal(true);
          // }}
          style={"lg:px-8  font-semibold"}
          text={"Make Payment"}
        />
        <div className="flex space-x-2.5 rounded-md mt-1 px-1">
          <Button
            // onClick={() => {
            //   setCongratModal(true);
            // }}
            style={
              "lg:px-2.5 rounded-md  px-1 text-[#1E202B] hover:bg-[#CCD6FF]  bg-[#E6EBFF] font-semibold"
            }
            text={"Today"}
          />
          <Button
            // onClick={() => {
            //   setCongratModal(true);
            // }}
            style={
              "lg:px-2.5 rounded-md px-1 text-[#1E202B] hover:bg-[#CCD6FF]  bg-[#E6EBFF] font-semibold"
            }
            text={"Yesterday"}
          />
          <Select
            position={"right-[1.2rem]"}
            value={datevalue}
            setValue={setDateValue}
            dateSelect={true}
          />
        </div>
      </div>

      {/* table starts here...#####################################################################################
       */}

      <div className="mt-10 mb-6 bg-white border shadow pb-4  rounded-xl">
        <table className="w-full">
          <thead className="border-b bg-[#fbfbff] w-full rounded-t-lg">
            <tr className="border-b ">
              <td className="">
                <div className="flex justify-center">
                  <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" />
                  <p>Rider</p>
                </div>
              </td>
              <td className="py-4 ">
                <div className="flex justify-center">
                  <MdLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                  <p>Pick Up</p>
                </div>
              </td>
              <td className="">
                <div className="flex justify-center">
                  <MdOutlineLocationOn className="text-scudGreen mr-2 text-base mt-1" />
                  <p>Destination</p>
                </div>
              </td>
              <td className=" ">
                <div className="flex justify-center">
                  {/* <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" /> */}
                  <p className="text-scudGreen text-lg -mt-0.5 mr-1">₦</p>
                  <p>Fare</p>
                </div>
              </td>
              <td className=" text-center">
                <div className="flex justify-center">
                  <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                  <p>Time Spent</p>
                </div>
              </td>
              <td className=" ">
                <div className="flex justify-center">
                  <BsCreditCard className="text-scudGreen mr-2 text-sm mt-1.5" />
                  <p>Oweing</p>
                </div>
              </td>
              <td className=" ">
                <div className="flex justify-center">
                  <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                    <BiRefresh className="text-scudGreen text-sm " />
                  </div>
                  <p>Trip Status</p>
                </div>
              </td>
            </tr>
          </thead>

          <tbody className="mx-4">{rows}</tbody>
        </table>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-[30rem] h-auto">
          <p className=" text-center font-semibold md:text-left ">
            Trips Details
          </p>
          <div className="border-b my-4" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 justify-center items-center">
              <img
                src={details?.rider?.avatar}
                className="h-16 w-16 rounded-full"
                alt=""
              />
              <p className="text-2xl text-textColor">{details?.rider?.name}</p>
            </div>
            <div className="flex space-x-2">
              <BsCalendar2Date className="text-scudGreen" />
              <p className="text-textColor text-sm">{details?.date}</p>
            </div>
          </div>
          <div className="bg-[#fdfdff] flex flex-col space-y-4 mt-6 p-4 w-full border h-auto rounded-lg">
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">
                  Pickup Location
                </p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {details?.pickup}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdOutlineLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">
                  Destination
                </p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {details?.destinatiom}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <p className="text-scudGreen text-sm  mr-3">₦</p>
                <p className="text-sm text-textColor tracking-wide">Fare</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {details?.fare}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">
                  Time Spent
                </p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {details?.timespent}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsCreditCard className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Oweing</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {`${details?.oweing}`}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                  <BiRefresh className="text-scudGreen text-sm " />
                </div>
                <p className="text-sm text-textColor tracking-wide">
                  Trip Status
                </p>
              </span>
              {details?.tripStatus == "Completed" ? (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
                  <p className="text-green-600 text-sm">Completed</p>
                </div>
              ) : (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
                  <p className="text-red-600 text-sm">Cancelled</p>
                </div>
              )}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

transactions.getLayout = Layout;
export default transactions;

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "server side");
  return {
    props: {
      server: id,
    },
  };
}
