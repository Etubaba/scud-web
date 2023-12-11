import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import Layout from "../../../components/officer_layout/Layout";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { referrees, riderReviews, userTrips } from "../../../dummy";
import EmptyTable from "../../../components/common/EmptyTable";
import { useRouter } from "next/router";

function document_details() {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [selectedmail, setSelectedMail] = useState("");
  const [email, setEmail] = useState("");
  const [emailsubject, setEmailSubject] = useState("");
  const [description, setDescription] = useState("");
  const [approvenotification, setApproveNotification] = useState(false);

  const picture = null;
  const license = null;
  const emailtemps = ["welcome mail", "ride mail", "document approved mail"];

  return (
    <div>
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between">
        <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
          <p
            className="text-gray-500/60 text-sm md:text-base tracking-wide hover:underline"
            onClick={() => router.push("/admin/driver_mgt/manage_driver")}
          >
            Drivers Document
          </p>
          <MdOutlineKeyboardArrowRight className="mt-1" />
          {/* &nbsp; &gt; */}
          <p className="tracking-wide text-sm md:text-base  font-semibold">James Peter</p>
        </span>
        <p className="text-textColor text-sm">Submitted 5 mins ago</p>
      </div>
      <div className="bg-white p-5 border my-10 w-full h-auto rounded-md">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <p className="font-bold mb-4">Driver details</p>
          <div className="flex  space-x-5">
            <div>
              <button
                onClick={() => setMessageModal(!messageModal)}
                className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
              >
                <p>Send Message</p>
              </button>
            </div>
          </div>
        </div>

        <div className=" mb-4">
          <img
            alt=""
            className="w-[5rem] h-[5rem] z-0 rounded-full"
            src={picture === null ? "/user.png" : picture}
          />
        </div>

        <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
          {/* <div className=" "> */}
          <span className="mb-5 flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">First Name</p>
            <p className="md:text-sm text-xs text-textColor">James</p>
          </span>
          <span className=" flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Last Name</p>
            <p className="md:text-sm text-xs text-textColor">
              {/* {new Date(created_at).toLocaleDateString()} */}
              James
            </p>
          </span>
          {/* </div> */}
          {/* <div className=" "> */}
          <span className="mb-5 flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Phone</p>
            <p className="md:text-sm text-xs text-textColor">{/* {state?.name} */} River State</p>
          </span>
          <span className=" flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Gender</p>
            <p className="md:text-sm text-xs text-textColor">21423333</p>
          </span>
          {/* </div> */}
          <span className="mb-5 flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Email</p>
            <p className="md:text-sm text-xs text-textColor">Port Harcourt</p>
          </span>
        </div>
        <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
          {/* <div className=" "> */}
          <span className=" flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Country</p>
            <p className="md:text-sm text-xs text-textColor">
              {/* {new Date(created_at).toLocaleDateString()} */}
              James
            </p>
          </span>
          <span className=" flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">State</p>
            <p className="md:text-sm text-xs text-textColor">
              {/* {new Date(created_at).toLocaleDateString()} */}
              James
            </p>
          </span>
          <span className=" flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">City</p>
            <p className="md:text-sm text-xs text-textColor">
              {/* {new Date(created_at).toLocaleDateString()} */}
              James
            </p>
          </span>
          <span className="my-5 flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Home Address</p>
            <p className="md:text-sm text-xs text-textColor">
              Plot 101 redemmed road, eagle Island, Port Harcourt
            </p>
          </span>
        </div>

        <div>
          <div className="border border-b-[0.5px] my-5"></div>

          <div className="space-y-3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="font-bold mb-4">Vehicle details</p>
              {/* <div className="flex  space-x-5">
                <div>
                  <button
                    onClick={() => setDeclineModal(!declineModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                  >
                    <p>Decline</p>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setApproveModal(!approveModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                  >
                    <p>Approve</p>
                  </button>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col justify-start space-y-10 md:space-y-0 md:flex-row md:space-x-16">
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
              {/* <div className=" "> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Plate Number</p>
                <p className="md:text-sm text-xs text-textColor">James</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Vehicle Brand</p>
                <p className="md:text-sm text-xs text-textColor">
                  {/* {new Date(created_at).toLocaleDateString()} */}
                  Nissan
                </p>
              </span>
              {/* </div> */}
              {/* <div className=" "> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Vehicle Model</p>
                <p className="md:text-sm text-xs text-textColor">{/* {state?.name} */} Camry</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Vehicle Color</p>
                <p className="md:text-sm text-xs text-textColor">blue</p>
              </span>
              {/* </div> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Vehicle Year</p>
                <p className="md:text-sm text-xs text-textColor">2009</p>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="border border-b-[0.5px] my-5"></div>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="font-bold mb-4">Driver’s License details</p>
              {/* <div className="flex  space-x-5">
                <div>
                  <button
                    onClick={() => setDeclineModal(!declineModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                  >
                    <p>Decline</p>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setApproveModal(!approveModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                  >
                    <p>Approve</p>
                  </button>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col justify-center md:justify-start items-center space-y-10 md:space-y-0 md:flex-row md:space-x-16">
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
              <div className="space-y-2 w-full md:w-52">
                <img
                  alt=""
                  className="w-full md:w-52 rounded-md h-28 border bg-cover"
                  src={license == null ? "/no_image.jpg" : license}
                />{" "}
                <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-sm  text-textColor">Front View</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border border-b-[0.5px] my-5"></div>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="font-bold mb-4">Bank details</p>
              {/* <div className="flex  space-x-5">
                <div>
                  <button
                    onClick={() => setDeclineModal(!declineModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                  >
                    <p>Decline</p>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setApproveModal(!approveModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                  >
                    <p>Approve</p>
                  </button>
                </div>
              </div> */}
            </div>
            <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
              {/* <div className=" "> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Bank Name</p>
                <p className="md:text-sm text-xs text-textColor">First Bank</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Account Number</p>
                <p className="md:text-sm text-xs text-textColor">
                  {/* {new Date(created_at).toLocaleDateString()} */}
                  Nissan
                </p>
              </span>
              {/* </div> */}
              {/* <div className=" "> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Account Name</p>
                <p className="md:text-sm text-xs text-textColor">{/* {state?.name} */} Camry</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 border my-10 w-full h-auto rounded-md">
        <div>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="font-bold mb-4">Vehicle Physical Inspection</p>
              {/* <div className="flex  space-x-5">
                <div>
                  <button
                    onClick={() => setDeclineModal(!declineModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                  >
                    <p>Decline</p>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setApproveModal(!approveModal)}
                    className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                  >
                    <p>Approve</p>
                  </button>
                </div>
              </div> */}
            </div>
            <div className="w-full md:w-3/5">
              <p className="text-textColor">
                Assess and analyze driver’s vehicle, check if it met the criteria and click
                “Approve” if it does, otherwise click “Decline”
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Ticket Sent.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Your ticket has been submitted successfully and a response will be sent to your email.
            </p>
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setMessageModal(false)} open={messageModal}>
        <div className=" w-[20rem] md:w-[24rem] space-y-10  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <RiErrorWarningLine className="text-blue-800 text-5xl" />
            <p className="text-lg font-semibold mt-2">Message User?</p>
            <p className="text-sm text-center text-textColor mt-2">
              Are you sure you want to message this user?{" "}
            </p>
          </div>
          <div className="flex  space-x-5 justify-between">
            <div>
              <button
                onClick={() => setMessageModal(false)}
                className="flex rounded-lg text-sm text-red-500 px-6 py-1.5 border border-red-500"
              >
                <p>No, don’t</p>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setApproveNotification(!approvenotification), setApproveModal(false);
                }}
                className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
              >
                <p>Yes, message</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title={"Follow up message"}
        onClose={() => setApproveNotification(false)}
        open={approvenotification}
      >
        <div className=" w-[20rem] md:w-[24rem] space-y-10  h-auto">
          <div className="bg-adminbg rounded-md space-y-5 md:h-auto p-3 md:p-6">
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Email template</p>
              <Select
                data={emailtemps}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={selectedmail}
                setValue={setSelectedMail}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Recipient email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Jamespeter@gmail.com"}
                // Icon={BsBarChartLine}
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Email heading/subject</p>
              <Input
                value={emailsubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder={""}
                // Icon={BsHash}
              />
            </div>

            <div className=" w-full ">
              <p className="text-sm  text-textColor mb-2">Write approve message</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={6}
                rows={6}
                className="w-full outline-none p-2 text-xs text-textColor rounded-md border-[#E5E5E4] border"
                minLength={7}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex  space-x-5 justify-between">
          <div>
            <button
              onClick={() => setApproveNotification(false)}
              className="flex rounded-lg text-sm text-red-600 px-6 py-1.5 border border-red-600"
            >
              <p>No, don’t</p>
            </button>
          </div>
          <div>
            <button
              //   onClick={() => window.open(`tel:${phone}`)}
              className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
            >
              <p>Send</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

document_details.getLayout = Layout;
export default document_details;
