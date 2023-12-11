import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { RiArrowDownSFill } from "react-icons/ri";
import Layout from "../../../components/Admin/Layout";
import MyStatefulEditor from "../../../components/common/Editor";
import "animate.css";
import { searchDetails } from "../../../dummy";
import { BsArrowLeft, BsArrowRight, BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";
import { MdOutlineEmail, MdOutlineNavigateNext } from "react-icons/md";
import {
  handleEmailBody,
  handleEmailRecipient,
  handleEmailSubject,
  handleEmailUsers,
  handleNotifcation
} from "../../../features/editSlice";
import { useDispatch, useSelector } from "react-redux";

function Send_msg({ users }) {
  const router = useRouter();
  const subject = useSelector((state) => state.edit.emailOption.emailSubject);
  const emailBody = useSelector((state) => state.edit.emailOption.emailBody);
  const notificationType = useSelector((state) => state.edit.emailOption.notificationType);
  // const [receiver, setReceiver] = useState("1");
  const receiver = useSelector((state) => state.edit.emailOption.recipient);

  const [searching, setSearching] = useState("");
  const [recieversarray, setRecieversArray] = useState([]);
  const dispatch = useDispatch();

  const handleReceiver = (e) => {
    setRecieversArray([...recieversarray, e]);
    recieversarray.forEach((element) => {
      if (element.first_name === e.first_name) {
        const newArr = recieversarray.filter((item) => {
          return item.first_name !== e.first_name;
        });
        setRecieversArray(newArr);
      }
    });
  };

  const rows = users.data
    .filter((element) => {
      return (
        element?.first_name?.toLowerCase().includes(searching.toLowerCase()) ||
        element?.last_name?.toLowerCase().includes(searching.toLowerCase())
      );
    })
    .map((element) => (
      <tr
        onClick={() => {
          handleReceiver(element);
        }}
        className=" text-center hover:shadow-sm  hover:bg-slate-100 rounded-md text-sm bg-white  text-textColor"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3 flex space-x-2">
          <img src={element.picture} className="rounded-full h-7 w-7" alt="" />
          <p>{element.firs_tname}</p>
        </td>
        <td className="md:text-base text-xs p-3">{element.first_name}</td>
        <td className="md:text-base text-xs p-3">{element.last_name}</td>
        <td className="md:text-base text-xs p-3">
          <div className="flex items-center space-x-2">
            {" "}
            <MdOutlineEmail /> <p> {element.email}</p>
          </div>
        </td>
      </tr>
    ));

  const pageNumber = [];
  for (let i = 1; i <= 4; i++) {
    pageNumber.push(i);
  }

  const handleNext = () => {
    if (subject === null) {
      return enqueueSnackbar("subject field is required", {
        variant: "error"
      });
    }
    if (emailBody == null) {
      return enqueueSnackbar("Email body field is required", {
        variant: "error"
      });
    }
    if (receiver !== 1) {
      const receiverMail = recieversarray.map((it) => it.email);
      dispatch(handleEmailUsers(receiverMail));
    }

    router.push("/admin/email/review");
  };

  return (
    <div>
      <span className="text-lg flex space-x-2  cursor-pointer my-10 font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/email/send_email")}
        >
          Send Message
        </p>
        &nbsp; &gt; <p className="tracking-wide">New Message</p>
      </span>

      <div className="md:mt-5 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="mb-8">
          <p>Recipients</p>
          <div className="grid grid-cols-2 gap-4 md:gap-0 md:grid-cols-4  my-4">
            <div className="flex items-center space-x-3">
              {receiver === 1 ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="1"
                  type={"checkbox"}
                  onChange={() => dispatch(handleEmailRecipient(1))}
                  checked={receiver == 1 && true}
                />
              )}
              <label
                htmlFor="1"
                className={`text-sm ${receiver == 1 ? "text-scudGreen" : "text-textColor"}`}
              >
                All Users
              </label>
            </div>
            <div className="flex space-x-3 items-center">
              {receiver === 2 ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="2"
                  type={"checkbox"}
                  onChange={() => dispatch(handleEmailRecipient(2))}
                  checked={receiver === 2 && true}
                />
              )}

              <label
                htmlFor="2"
                className={`text-sm ${receiver == 2 ? "text-scudGreen" : "text-textColor"}`}
              >
                All Drivers
              </label>
            </div>

            <div className="flex items-center space-x-3">
              {receiver === 3 ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="3"
                  type={"checkbox"}
                  onChange={() => dispatch(handleEmailRecipient(3))}
                  checked={receiver === 3 && true}
                />
              )}
              <label
                htmlFor="3"
                className={`text-sm ${receiver === 3 ? "text-scudGreen" : "text-textColor"}`}
              >
                Specific Users
              </label>
            </div>
            <div className="flex items-center space-x-3">
              {receiver === 4 ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="4"
                  type={"checkbox"}
                  onChange={() => dispatch(handleEmailRecipient(4))}
                  checked={receiver === 4 && true}
                />
              )}
              <label
                htmlFor="4"
                className={`text-sm ${receiver === 4 ? "text-scudGreen" : "text-textColor"}`}
              >
                All Riders
              </label>
            </div>
          </div>
        </div>

        {receiver === "3" && (
          <div className="mb-8 md:pl-32 animate__animated animate__fadeIn">
            <div className="flex justify-between">
              <p>Select Users</p>
              <p className="text-slate-300 text-sm">
                {recieversarray.length} &nbsp; &nbsp; Selected
              </p>
            </div>
            <div className="relative block mb-8">
              {/* <span class="sr-only">Search</span> */}
              <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                <span onClick={() => setSearching("")}>
                  <RiArrowDownSFill />
                </span>
              </span>
              <div className="flex border-[1px] rounded-md outline-0 w-full     border-gray-300">
                <div className="flex flex-wrap space-x-2p-1 max-w-[600px]">
                  {recieversarray.map((itm, indx) => (
                    <div
                      key={indx}
                      className="flex justify-center m-1 mx-2 items-center space-x-2 w-24 rounded-md  bg-slate-300"
                    >
                      <img src={itm.picture} className="rounded-full h-5 w-5" alt="" />
                      <p className="text-xs">{itm.first_name.substring(0, 10)}...</p>
                      <span>
                        <IoMdClose className="text-slate-400 text-sm" />
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type={"text"}
                  onChange={(e) => setSearching(e.target.value)}
                  placeholder="Search by email / name / user"
                  className=" pl-2 placeholder:text-xs  rounded-md outline-0 w-auto  p-1"
                />
              </div>

              {searching && (
                <div className="shadow-md animate__animated animate__fadeIn rounded-md w-full max-h-[500px] pb-14 bg-white mb-3 absolute overflow-y-scroll md:overflow-x-hidden z-50">
                  <table className="w-full min-w-[820px] rounded-md overflow-y-scroll md:overflow-x-hidden">
                    <thead className="border-b  bg-[#ffffff] w-full rounded-t-lg">
                      <tr className="border-b ">
                        <td className=""></td>
                        <td className=""></td>
                        <td className=" "></td>
                        <td className=" text-left"></td>
                      </tr>
                    </thead>

                    <tbody className="mx-4 ">{rows}</tbody>
                  </table>
                  <div className="flex justify-between bg-white px-3 mt-5">
                    <p className="text-sm font-[400] text-textColor">Total Number of trips : 12</p>
                    <div className="flex space-x-3 justify-center items-center">
                      <BsArrowLeft className="text-scudGreen text-lg" />
                      {pageNumber.map((element) => (
                        <span className="flex">
                          <p className="text-sm font-[400] text-textColor">{element}</p>
                        </span>
                      ))}
                      <div className="bg-scudGreen hover:bg-scudGreenHover rounded-full shadow-md p-2 ">
                        <BsArrowRight className="text-white text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mb-8">
          <p>Message Type</p>
          <div className="flex space-x-10 my-4">
            <div className="flex space-x-3 items-center">
              {notificationType === "sms" ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="sms"
                  type={"checkbox"}
                  onChange={() => dispatch(handleNotifcation("sms"))}
                  checked={notificationType === "sms" && true}
                />
              )}
              <label htmlFor="sms" className="text-sm">
                SMS
              </label>
            </div>
            <div className="flex space-x-3 items-center">
              {/* to be updated  to push notification*/}
              {notificationType === "push notification" ? (
                <span className="border  h-3.5 w-3.5 border-scudGreen items-center flex justify-center rounded-sm">
                  <BsCheck className="text-scudGreen text-base" />
                </span>
              ) : (
                <input
                  id="push"
                  type={"checkbox"}
                  onChange={() => dispatch(handleNotifcation("push notification"))}
                  checked={notificationType === "push notification" && true}
                />
              )}
              <label htmlFor="push" className="text-sm">
                Push Notification
              </label>
            </div>
          </div>
        </div>
        <div className="mb-8 space-y-3">
          <p>Message Title</p>
          <div className="">
            <input
              value={subject}
              onChange={(e) => dispatch(handleEmailSubject(e.target.value))}
              type={"text"}
              placeholder="Type subject here..."
              className="border-[1px] pl-2 placeholder:text-xs  rounded-md outline-0 w-full  p-1 border-gray-300"
            />
          </div>
        </div>
        <div className="">
          <p className="my-5">Write your message</p>
          <div className="flex space-x-10 mb-20">
            <textarea
              cols={10}
              rows={7}
              onChange={(e) => dispatch(handleEmailBody(e.target.value))}
              value={emailBody}
              placeholder="Write here..."
              className="border w-full rounded-md p-5"
            ></textarea>
          </div>
          <div className="flex sm:justify-end">
            <div className="flex justify-center items-center md:flex space-x-3 mt-2">
              <div>
                <button
                  onClick={handleNext}
                  className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
                >
                  <span className="flex space-x-2">
                    <p>Next</p>
                    <MdOutlineNavigateNext className="text-xl hidden md:block " />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Send_msg.getLayout = Layout;
export default Send_msg;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const [usersRes] = await Promise.all([
    fetch(`${BASE_URL}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [users] = await Promise.all([usersRes.json()]);

  if (users?.statusCode === 401 && users?.statusCode !== undefined) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  // console.log(roles, users);
  return { props: { users } };
}
