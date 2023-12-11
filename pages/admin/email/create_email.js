import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import Layout from "../../../components/Admin/Layout";
import MyStatefulEditor from "../../../components/common/Editor";
import "animate.css";
import { searchDetails } from "../../../dummy";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";
import { getToken } from "../../../components/services/refresh";
import {
  handleEmailBody,
  handleEmailRecipient,
  handleEmailSubject,
  handleEmailUsers,
  handleNotifcation
} from "../../../features/editSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { MdAdminPanelSettings, MdOutlineEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";
import { validateToken } from "../../../components/services/validateToken";

function create_email({ states, users }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();
  const [searching, setSearching] = useState("");
  const [showselect, setShowSelect] = useState(false);
  const [recieversarray, setRecieversArray] = useState([]);
  const [allstates, setAllState] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const subject = useSelector((state) => state.edit.emailOption.emailSubject);
  const notificationType = useSelector((state) => state.edit.emailOption.notificationType);
  const receiver = useSelector((state) => state.edit.emailOption.recipient);
  const emailBody = useSelector((state) => state.edit.emailOption.emailBody);
  const usersTo = useSelector((state) => state.edit.emailOption.users);

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  useEffect(() => {
    let cleanUp = true;
    setAllState([]);

    if (cleanUp) {
      setAllState(states.data);
      setAllUsers(users.data);
    }

    return () => {
      cleanUp = false;
    };
  }, []);

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
  useEffect(() => {
    let truty = true;
    const receiverMail = recieversarray.map((it) => {
      return it.email;
    });
    if (truty) {
      dispatch(handleEmailUsers(receiverMail));
    }
    return () => {
      truty = false;
    };
  }, [recieversarray]);

  const rows = allusers
    .filter((element) => {
      return (
        element.first_name?.toLowerCase().includes(searching.toLowerCase()) ||
        element.last_name?.toLowerCase().includes(searching.toLowerCase())
      );
    })
    .map((element) => (
      <tr
        onClick={() => handleReceiver(element)}
        className=" text-center hover:shadow-sm cursor-pointer  hover:bg-slate-100 rounded-md text-sm bg-white  text-textColor"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3 flex space-x-2">
          <img src={element.picture} className="rounded-full h-7 w-7" alt="" />
          <p>{element.first_name}</p>
        </td>
        <td className="md:text-base text-xs p-3">{element.first_name + " " + element.last_name}</td>
        <td className="md:text-base text-xs p-3">
          <span
            className={
              element.roles.includes("rider")
                ? "bg-scudGreen/20 rounded-md p-0.5 flex justify-center items-center space-x-3 text-scudGreen"
                : element.roles.includes("driver")
                ? "bg-green-300/20 rounded-md flex justify-center items-center space-x-3 p-0.5 text-green-600"
                : "bg-red-300/20 rounded-md p-0.5 flex justify-center items-center space-x-3 text-red-600"
            }
          >
            {element.roles.includes("rider") ? (
              <FaUserTie />
            ) : element.roles.includes("driver") ? (
              <GrUserPolice />
            ) : (
              <MdAdminPanelSettings />
            )}
            <p>{element.roles[0]}</p>
          </span>
        </td>
        <td className="md:text-base  text-xs p-3">
          {" "}
          <MdOutlineEmail />
          <p> {element.email}</p>
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
    if (receiver === 3 && usersTo.length == 0) {
      return enqueueSnackbar("Select a specific user", {
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
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/email/send_email")}
        >
          Send Emails
        </p>
        &nbsp; &gt; <p className="tracking-wide">Write New Mail</p>
      </span>
      <div className="flex justify-between mt-10">
        <p className="">Compose New Mail</p>
        <button
          // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
          className="bg-[#F2F5FF] justify-center items-center  flex space-x-2 text-red-500 text-[14px]  rounded-md p-1 px-3"
        >
          Cancel
        </button>
      </div>
      <div className="md:mt-5 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="mb-8">
          <p>Recipients</p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2 my-4">
            <div className="flex space-x-3">
              <input
                id="1"
                type={"checkbox"}
                onChange={() => dispatch(handleEmailRecipient(1))}
                checked={receiver === 1 && true}
              />
              <label htmlFor="1" className="text-sm">
                All Users
              </label>
            </div>
            <div className="flex space-x-3">
              <input
                id="2"
                type={"checkbox"}
                onChange={() => dispatch(handleEmailRecipient(2))}
                checked={receiver === 2 && true}
              />
              <label htmlFor="2" className="text-sm">
                All Drivers
              </label>
            </div>
            <div className="flex space-x-3">
              <input
                id="3"
                type={"checkbox"}
                onChange={() => dispatch(handleEmailRecipient(3))}
                checked={receiver === 3 && true}
              />
              <label htmlFor="3" className="text-sm">
                Specific Users
              </label>
            </div>
            <div className="flex space-x-3">
              <input
                id="4"
                type={"checkbox"}
                onChange={() => dispatch(handleEmailRecipient(4))}
                checked={receiver === 4 && true}
              />
              <label htmlFor="4" className="text-sm">
                All Riders
              </label>
            </div>
          </div>
        </div>
        {receiver === 3 && (
          <div className="mb-8  animate__animated animate__fadeIn">
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
                      className="flex justify-center  m-1 mx-2 items-center space-x-2 w-24 rounded-md  bg-slate-300"
                    >
                      <img src={itm.picture} className="rounded-full h-5 w-5" alt="" />
                      <p className="text-xs">
                        {itm.first_name.substring(0, 10)}
                        ...
                      </p>
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
                <div className="shadow-md animate__animated  animate__fadeIn rounded-md w-full max-h-[350px] pb-14 bg-white mb-3 absolute overflow-y-scroll md:overflow-x-hidden z-50">
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
                    <p className="text-xs mt-2 md:text-sm font-[400] text-textColor">
                      Total trips : 12
                    </p>
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
        {searching === "" ? (
          <div className="mb-8 animate__animated  animate__fadeIn">
            <p>Location</p>
            <div className="relative block">
              <div className="flex">
                <input
                  onFocus={() => setShowSelect(true)}
                  type={"text"}
                  placeholder="Search locations here..."
                  className="border-[1px] pl-2 placeholder:text-xs  rounded-md outline-0 w-full  p-1 border-gray-300"
                />
                <span class="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-2">
                  <span onClick={() => setShowSelect(!showselect)}>
                    {showselect ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                  </span>
                </span>
              </div>

              {showselect && (
                <div className="shadow-md animate__animated animate__fadeIn rounded-md w-full max-h-[200px] pb-14 bg-white mb-3 absolute overflow-y-scroll md:overflow-x-hidden z-50">
                  <div className="w-full min-w-[820px] rounded-md overflow-y-scroll md:overflow-x-hidden">
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                    <div
                      // onClick={() => setShowSelect(false)}
                      className="flex space-x-8 p-2 my-3 hover:bg-slate-100 cursor-pointer"
                    >
                      <input type={"checkbox"} />
                      <p>River state</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
        {searching === "" ? (
          showselect ? null : (
            <div className="mb-8 animate__animated  animate__fadeIn">
              <p>Email Templates</p>
              <div className="block relative">
                <input
                  type={"text"}
                  placeholder="Type subject here..."
                  className="border-[1px] pl-2 placeholder:text-xs  rounded-md outline-0 w-full  p-1 border-gray-300"
                />
                <span class="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-2">
                  <span>
                    <RiArrowDownSFill />
                  </span>
                </span>
              </div>
            </div>
          )
        ) : null}
        {searching === "" ? (
          showselect ? null : (
            <div className="mb-8 animate__animated  animate__fadeIn">
              <p>Subject</p>
              <div className="">
                <input
                  type={"text"}
                  value={subject}
                  onChange={(e) => dispatch(handleEmailSubject(e.target.value))}
                  placeholder="Type subject here..."
                  className="border-[1px] pl-2 placeholder:text-xs  rounded-md outline-0 w-full  p-1 border-gray-300"
                />
              </div>
            </div>
          )
        ) : null}
        <div className="">
          <p>Write your message</p>
          <div className="flex space-x-10 mb-40 md:mb-20">
            <MyStatefulEditor
              value={emailBody}
              onChange={(e) => dispatch(handleEmailBody(e))}
              showselect={showselect}
              searching={searching}
            />
          </div>
          <div className="md:flex  justify-between">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 my-4">
              <div className="flex space-x-3">
                <label className="text-sm">Send to:</label>
              </div>
              <div className="flex space-x-3">
                <input
                  type={"checkbox"}
                  onChange={() => dispatch(handleNotifcation("mail"))}
                  checked={notificationType === "mail" && true}
                />
                <label className="text-sm">Email only </label>
              </div>
              <div className="flex space-x-3">
                <input
                  type={"checkbox"}
                  onChange={() => dispatch(handleNotifcation("sms"))}
                  checked={notificationType === "sms" && true}
                />
                <label className="text-sm">SMS</label>
              </div>
            </div>
            <div onClick={handleNext} className="mt-2">
              <button
                // onClick={() => router.push("/admin/admin_mgt/create_admin")}
                className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white px-4 rounded-md p-2 "
              >
                <span className="flex justify-between">
                  <p>Next</p>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

create_email.getLayout = Layout;
export default create_email;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  try {
    const [statesRes, userRes] = await Promise.all([
      fetch(`${BASE_URL}states?country_id=${160}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }),

      fetch(`${BASE_URL}users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [states, users] = await Promise.all([statesRes.json(), userRes.json()]);

    if (
      (users?.statusCode !== undefined && users?.statusCode === 401) ||
      (states.statusCode !== undefined && states.statusCode === 401)
    ) {
      try {
        await validateToken(context, true);
      } catch (err) {
        return { redirect: { destination: `/admin/auth`, permanent: false } };
      }
    }

    return { props: { states, users } };
  } catch (err) {
    console.log(err);
  }
}
