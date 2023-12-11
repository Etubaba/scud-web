import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiMessageDetail, BiRefresh } from "react-icons/bi";
import { MdArrowBackIosNew, MdArrowForwardIos, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscEmptyWindow } from "react-icons/vsc";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import EmptyTable from "../../../components/common/EmptyTable";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { getTimeAgo } from "../../../components/services/getTimeAgo";
import { validateToken } from "../../../components/services/validateToken";

export function GetBrandName({ id, bank_id, user }) {
  const [data, setData] = useState({
    name: "",
    bank_name: ""
  });
  useEffect(() => {
    const fetchdata1 = async () => {
      const token = user ? Cookies.get("accessToken") : Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .get(`${BASE_URL}vehicle-brands/${id}`)
        .then((res) => {
          setData({ ...data, name: res.data.name });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchdata2 = async () => {
      const token = user ? Cookies.get("accessToken") : Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .get(`${BASE_URL}payments/bank-accounts/${bank_id}`)
        .then((res) => {
          setData({ ...data, bank_name: res.data.bank.name });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (id !== undefined) {
      fetchdata1();
    } else {
      fetchdata2();
    }
  }, []);

  return id !== undefined ? (
    <p className="md:text-sm text-xs text-textColor">{data.name}</p>
  ) : (
    <p className="md:text-sm text-xs text-textColor">{data.bank_name}</p>
  );
}
function document_details({ userdatas }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [userdata, setUserData] = useState([...userdatas]);
  const [successModal, setSuccessModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [selectedmail, setSelectedMail] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [emailsubject, setEmailSubject] = useState("");
  const [description, setDescription] = useState("");
  const [approvenotification, setApproveNotification] = useState(false);
  const [declinenotification, setDeclineNotification] = useState(false);
  const [preview, setPreview] = useState([]);
  const [previewindex, setPreviewIndex] = useState(0);
  const [previewmodal, setPreviewModal] = useState(false);
  const [isLicense, setIsLicense] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [doc, setDoc] = useState({ type: "", id: null });

  const emailtemps = ["welcome mail", "ride mail", "document approved mail"];

  const handleNext = () => {
    setPreviewIndex(previewindex + 1);
  };
  const handleBack = () => {
    setPreviewIndex(previewindex - 1);
  };

  function refresh() {
    const savedlink = router.asPath;
    // router.replace(savedlink);
    // return router.replace(savedlink);
    router.push("/admin/driver_mgt/document_mgt").then((res) => {
      if (res) {
        router.push(savedlink);
      }
    });

    setIsRefreshing(true);
  }

  useEffect(() => {
    setIsRefreshing(false);
  }, [userdatas]);

  const handleApprove = async () => {
    console.log("clicked");
    setLoading(true);
    if (email == "" || emailsubject == "" || description == "") {
      setLoading(false);
      enqueueSnackbar("all fields are required", {
        variant: "error"
      });
    } else {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .patch(BASE_URL + "approvals", {
          type: doc.type,
          id: doc.id,
          verification: "verified"
        })
        .then(async (res) => {
          setApproveNotification(false);
          refresh();
          await axios
            .post(BASE_URL + "notifications/specific-users", {
              subject: emailsubject,
              body: description,
              channel: "mail",
              emails: [email]
            })
            .then((res) => {
              setSuccessModal(true);
              refresh();
            });
        });
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    if (email == "" || emailsubject == "" || description == "") {
      setLoading(false);
      enqueueSnackbar("all fields are required", {
        variant: "error"
      });
    } else {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .patch(BASE_URL + "approvals", {
          type: doc.type,
          id: doc.id,
          verification: "failed"
        })
        .then(async (res) => {
          setDeclineNotification(false);
          await axios
            .post(BASE_URL + "notifications/specific-users", {
              subject: emailsubject,
              body: `${description} <br/><br/>${link}`,
              channel: "mail",
              emails: [email]
            })
            .then((res) => {
              setLoading(false);
              setSuccessModal(true);
              refresh();
            })
            .catch((err) => {
              setLoading(false);
              enqueueSnackbar(`${err.message}`, {
                variant: "error"
              });
            });
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(`${err.message}`, {
            variant: "error"
          });
        });
    }
  };

  const allCriteriasMet =
    userdata[0]?.verification === "verified" &&
    userdata[0]?.vehicles[0]?.verification == "verified" &&
    userdata[0]?.bank_account?.verification == "verified" &&
    userdata[0]?.license?.verification == "verified"
      ? false
      : true;

  return (
    <div>
      {userdata.map((item, index) => (
        <div key={index}>
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between">
            <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
              <p
                className="text-gray-500/60 text-sm md:text-base tracking-wide hover:underline"
                onClick={() => router.push("/admin/driver_mgt/document_mgt")}
              >
                Drivers Document
              </p>
              <MdOutlineKeyboardArrowRight className="mt-1" />
              {/* &nbsp; &gt; */}
              <p className="tracking-wide text-sm md:text-base  font-semibold">James Peter</p>
            </span>
            <p className="text-textColor text-sm">Submitted {getTimeAgo(item.created_at)}</p>
          </div>
          <div className="bg-white p-5 border my-10 w-full h-auto rounded-md">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="font-bold mb-4">Driver details</p>
              {item.verification == "verified" ? (
                <div className=" max-w-[6rem] max-h-7 flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                  <p className="text-xs text-textColor/60 font-thin">Approved</p>
                </div>
              ) : item.verification == "failed" ? (
                <div className="flex  space-x-5">
                  <div className=" cursor-pointer max-w-[6rem] max-h-7 flex justify-center items-center rounded-md border bg-[#f2f5ff] px-1">
                    <p className="text-xs text-textColor/60 font-thin">Aeclined</p>
                  </div>
                  <div
                    onClick={() => {
                      setDoc({
                        ...doc,
                        type: "user",
                        id: item.id
                      }),
                        setDeclineNotification(!declinenotification),
                        setEmail(item.email),
                        setLink(
                          `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=3&user_resubmission_phone=${item.phone.substring(
                            4
                          )}`
                        );
                    }}
                    className=" cursor-pointer flex justify-center max-h-7 items-center rounded-md border bg-[#f2f5ff] px-1"
                  >
                    <BiMessageDetail className="text-xs text-textColor/60 font-thin" />
                  </div>
                </div>
              ) : (
                <div className="flex  space-x-5">
                  <div>
                    <button
                      onClick={() => {
                        setDoc({
                          ...doc,
                          type: "user",
                          id: item.id
                        }),
                          setDeclineModal(!declineModal),
                          setEmail(item.email),
                          setLink(
                            `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=3&user_resubmission_phone=${item.phone.substring(
                              4
                            )}`
                          );
                      }}
                      className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                    >
                      <p>Decline</p>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setDoc({
                          ...doc,
                          type: "user",
                          id: item.id
                        }),
                          setApproveModal(!approveModal),
                          setEmail(item.email);
                      }}
                      className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                    >
                      <p>Approve</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className=" mb-4">
              <img
                alt=""
                className="w-[5rem] h-[5rem] z-0 rounded-full"
                src={item.picture === null ? "/user.png" : item.picture}
              />
            </div>

            <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
              {/* <div className=" "> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">First Name</p>
                <p className="md:text-sm text-xs text-textColor">{item.first_name}</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Last Name</p>
                <p className="md:text-sm text-xs text-textColor">{item.last_name} </p>
              </span>
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Phone</p>
                <p className="md:text-sm text-xs text-textColor">{item.phone}</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Gender</p>
                <p className="md:text-sm text-xs text-textColor">{item.gender}</p>
              </span>
              {/* </div> */}
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Email</p>
                <p className="md:text-sm text-xs text-textColor">{item.email}</p>
              </span>
            </div>
            <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
              {/* <div className=" "> */}
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Country</p>
                <p className="md:text-sm text-xs text-textColor">NG</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">State</p>
                {item.state?.name}
                <p className="md:text-sm text-xs text-textColor"></p>
              </span>
              {/* <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">City</p>
                <p className="md:text-sm text-xs text-textColor">
                  James
                </p>
              </span> */}
              <span className="my-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Home Address</p>
                <p className="md:text-sm text-xs text-textColor">{item.address}</p>
              </span>
            </div>

            <div>
              <div className="border border-b-[0.5px] my-5"></div>

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="font-bold text-title mb-4">Vehicle details</p>
                  {item.vehicles.length !== 0 &&
                    (item.vehicles[0]?.verification == "verified" ? (
                      <div className=" px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                        <p className="text-xs text-textColor/60 font-thin">Approved</p>
                      </div>
                    ) : item.vehicles[0]?.verification == "failed" ? (
                      <div className="flex  space-x-5">
                        <div className=" cursor-pointer px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] ">
                          <p className="text-xs text-textColor/60 font-thin">Declined</p>
                        </div>
                        <div
                          onClick={() => {
                            setDoc({ ...doc, type: "vehicle", id: item?.vehicles[0]?.id }),
                              setDeclineNotification(!declinenotification),
                              setEmail(userdatas[0].email),
                              setLink(
                                `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=5&user_resubmission_phone=${userdatas[0].phone.substring(
                                  4
                                )}&doc_id=${item.vehicles[0]?.id}`
                              );
                          }}
                          className=" cursor-pointer flex justify-center max-h-7 items-center rounded-md border bg-[#f2f5ff] px-1"
                        >
                          <BiMessageDetail className="text-xs text-textColor/60 font-thin" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex  space-x-5">
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "vehicle", id: item.vehicles[0]?.id }),
                                setDeclineModal(!declineModal),
                                setEmail(userdatas[0].email),
                                setLink(
                                  `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=5&user_resubmission_phone=${userdatas[0].phone.substring(
                                    4
                                  )}&doc_id=${item.vehicles[0]?.id}`
                                );
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                          >
                            <p>Decline</p>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "vehicle", id: item.vehicles[0]?.id }),
                                setApproveModal(!approveModal),
                                setEmail(userdatas[0].email);
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                          >
                            <p>Approve</p>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                {item.vehicles.length == 0 ? (
                  <EmptyTable Icon={VscEmptyWindow} title={"No vehicle Details"} name="Vehicle" />
                ) : (
                  [item.vehicles[0]].map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-col justify-start space-y-10 md:space-y-0 md:flex-row md:space-x-16">
                        <div className="space-y-2 w-full md:w-52">
                          <img
                            onClick={() => {
                              setIsLicense(false), setPreview(item.images), setPreviewModal(true);
                            }}
                            alt=""
                            className="w-full md:w-52 rounded-md h-28 border bg-cover"
                            src={item.images[0] == null ? "/no_image.jpg" : item.images[0]}
                          />{" "}
                          <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                            <p className="text-sm  text-textColor">Front View</p>
                          </div>
                        </div>

                        <div className="space-y-2 w-full md:w-52">
                          <img
                            onClick={() => {
                              setIsLicense(false), setPreview(item.images), setPreviewModal(true);
                            }}
                            alt=""
                            className="w-full md:w-52 rounded-md h-28 border bg-cover"
                            src={item.images[1] == null ? "/no_image.jpg" : item.images[1]}
                          />{" "}
                          <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                            <p className="text-sm  text-textColor">Back View</p>
                          </div>
                        </div>
                        <div className="space-y-2 w-full md:w-52">
                          <img
                            onClick={() => {
                              setIsLicense(false), setPreview(item.images), setPreviewModal(true);
                            }}
                            alt=""
                            className="w-full md:w-52 rounded-md h-28 border bg-cover"
                            src={item.images[2] == null ? "/no_image.jpg" : item.images[2]}
                          />{" "}
                          <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                            <p className="text-sm  text-textColor">Interior View</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col mt-5 space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
                        {/* <div className=" "> */}
                        <span className="mb-5 flex space-y-2 flex-col">
                          <p className="md:text-sm text-xs text-textColor/50">Plate Number</p>
                          <p className="md:text-sm text-xs text-textColor">{item.frsc_number}</p>
                        </span>
                        <span className=" flex space-y-2 flex-col">
                          <p className="md:text-sm text-xs text-textColor/50">Vehicle Brand</p>
                          {/* <p className="md:text-sm text-xs text-textColor">{}</p>; */}
                          <GetBrandName id={item.vehicle_brand_id} />
                        </span>
                        {/* </div> */}
                        {/* <div className=" "> */}
                        <span className="mb-5 flex space-y-2 flex-col">
                          <p className="md:text-sm text-xs text-textColor/50">Vehicle Model</p>
                          <p className="md:text-sm text-xs text-textColor">{item.model}</p>
                        </span>
                        <span className=" flex space-y-2 flex-col">
                          <p className="md:text-sm text-xs text-textColor/50">Vehicle Color</p>
                          <p className="md:text-sm text-xs text-textColor">{item.color}</p>
                        </span>
                        {/* </div> */}
                        <span className="mb-5 flex space-y-2 flex-col">
                          <p className="md:text-sm text-xs text-textColor/50">Vehicle Year</p>
                          <p className="md:text-sm text-xs text-textColor">
                            {new Date(item.manufacture_date).getFullYear()}
                          </p>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/*  */}
            <div>
              <div className="border border-b-[0.5px] my-5"></div>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="font-bold text-title mb-4">Driver’s License details</p>
                  {item.license !== null &&
                    (item.license.verification == "verified" ? (
                      <div className=" px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                        <p className="text-xs text-textColor/60 font-thin">Approved</p>
                      </div>
                    ) : item.license.verification == "failed" ? (
                      <div className="flex  space-x-5">
                        <div className=" cursor-pointer px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] ">
                          <p className="text-xs text-textColor/60 font-thin">Declined</p>
                        </div>
                        <div
                          onClick={() => {
                            setDoc({ ...doc, type: "license", id: item.license.id }),
                              setDeclineNotification(!declinenotification),
                              setEmail(userdatas[0].email),
                              setLink(
                                `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=4&user_resubmission_phone=${userdatas[0].phone.substring(
                                  4
                                )}&doc_id=${item.license.id}`
                              );
                          }}
                          className=" cursor-pointer flex justify-center max-h-7 items-center rounded-md border bg-[#f2f5ff] px-1"
                        >
                          <BiMessageDetail className="text-xs text-textColor/60 font-thin" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex  space-x-5">
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "license", id: item.license.id }),
                                setDeclineModal(!declineModal),
                                setEmail(userdatas[0].email),
                                setLink(
                                  `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=4&user_resubmission_phone=${userdatas[0].phone.substring(
                                    4
                                  )}&doc_id=${item.license.id}`
                                );
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                          >
                            <p>Decline</p>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "license", id: item.license.id }),
                                setApproveModal(!approveModal),
                                setEmail(userdatas[0].email);
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                          >
                            <p>Approve</p>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                {item.license == null ? (
                  <EmptyTable Icon={VscEmptyWindow} title={"No License Details"} name="License" />
                ) : (
                  <div className="flex flex-col justify-center md:justify-start items-center space-y-10 md:space-y-0 md:flex-row md:space-x-16">
                    <div className="space-y-2 w-full md:w-52">
                      <img
                        onClick={() => {
                          setIsLicense(true),
                            setPreview([item.license.front_image, item.license.back_image]),
                            setPreviewModal(true);
                        }}
                        alt=""
                        className="w-full md:w-52 rounded-md h-28 border bg-cover"
                        src={item.license == null ? "/no_image.jpg" : item.license.front_image}
                      />{" "}
                      <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                        <p className="text-sm  text-textColor">Front View</p>
                      </div>
                    </div>
                    <div className="space-y-2 w-full md:w-52">
                      <img
                        onClick={() => {
                          setIsLicense(true),
                            setPreview([item.license.front_image, item.license.back_image]),
                            setPreviewModal(true);
                        }}
                        alt=""
                        className="w-full md:w-52 rounded-md h-28 border bg-cover"
                        src={item.license == null ? "/no_image.jpg" : item.license.back_image}
                      />{" "}
                      <div className="  flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                        <p className="text-sm  text-textColor">Back View</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="border border-b-[0.5px] my-5"></div>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="font-bold text-title mb-4">Bank details</p>
                  {item.bank_account !== null &&
                    (item.bank_account.verification == "verified" ? (
                      <div className=" px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                        <p className="text-xs text-textColor/60 font-thin">Approved</p>
                      </div>
                    ) : item.bank_account.verification == "failed" ? (
                      <div className="flex  space-x-5">
                        <div className=" cursor-pointer px-2 max-h-7 flex justify-center items-center rounded-md border bg-[#f2f5ff] ">
                          <p className="text-xs text-textColor/60 font-thin">Declined</p>
                        </div>
                        <div
                          onClick={() => {
                            setDoc({ ...doc, type: "bank", id: item.bank_account.id }),
                              setDeclineNotification(!declinenotification),
                              setEmail(userdatas[0].email),
                              setLink(
                                `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=6&user_resubmission_phone=${userdatas[0].phone.substring(
                                  4
                                )}&doc_id=${item.bank_account.id}`
                              );
                          }}
                          className=" cursor-pointer flex justify-center max-h-7 items-center rounded-md border bg-[#f2f5ff] px-1"
                        >
                          <BiMessageDetail className="text-xs text-textColor/60 font-thin" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex  space-x-5">
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "bank", id: item.bank_account.id }),
                                setDeclineModal(!declineModal),
                                setEmail(userdatas[0].email),
                                setLink(
                                  `https://scud-ride-web.vercel.app/signup/driver-signup?resubmission_step=6&user_resubmission_phone=${userdatas[0].phone.substring(
                                    4
                                  )}&doc_id=${item.bank_account.id}`
                                );
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-red-500"
                          >
                            <p>Decline</p>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setDoc({ ...doc, type: "bank", id: item.bank_account.id }),
                                setApproveModal(!approveModal),
                                setEmail(userdatas[0].email);
                            }}
                            className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
                          >
                            <p>Approve</p>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                {item.bank_account == null ? (
                  <EmptyTable Icon={VscEmptyWindow} title={"No Bank Details"} name="Bank" />
                ) : (
                  <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-28">
                    <span className="mb-5 flex space-y-2 flex-col">
                      <p className="md:text-sm text-xs text-textColor/50">Bank Name</p>
                      <GetBrandName bank_id={item.bank_account.id} />
                    </span>
                    <span className=" flex space-y-2 flex-col">
                      <p className="md:text-sm text-xs text-textColor/50">Account Number</p>
                      <p className="md:text-sm text-xs text-textColor">
                        {item.bank_account.account_number}
                      </p>
                    </span>

                    <span className="mb-5 flex space-y-2 flex-col">
                      <p className="md:text-sm text-xs text-textColor/50">Account Name</p>
                      <p className="md:text-sm text-xs text-textColor">
                        {item.bank_account.account_name}
                      </p>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-5 border my-10 w-full h-auto rounded-md">
            <div>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="font-bold text-title mb-4">Vehicle Physical Inspection</p>
                  {userdatas[0]?.vehicles[0]?.physical_verification == "verified" ? (
                    <div className=" px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] p-1">
                      <p className="text-xs text-textColor/60 font-thin">Approved</p>
                    </div>
                  ) : userdatas[0]?.vehicles[0]?.physical_verification == "failed" ? (
                    <div className=" px-2 flex justify-center items-center rounded-md border bg-[#f2f5ff] ">
                      <p className="text-xs text-textColor/60 font-thin">Declined</p>
                    </div>
                  ) : (
                    <div className="flex  space-x-5">
                      <div>
                        <button
                          disabled={allCriteriasMet}
                          onClick={() => {
                            setDoc({
                              ...doc,
                              type: "inspection",
                              id: userdatas[0]?.vehicles[0].id
                            }),
                              setDeclineModal(!declineModal),
                              setEmail(userdatas[0].email);
                          }}
                          className={`flex rounded-lg text-sm text-white px-6 py-1.5 border ${
                            allCriteriasMet ? "bg-red-500/20" : "bg-red-500"
                          } `}
                        >
                          <p>Decline</p>
                        </button>
                      </div>
                      <div>
                        <button
                          disabled={allCriteriasMet}
                          onClick={() => {
                            setDoc({
                              ...doc,
                              type: "inspection",
                              id: userdatas[0]?.vehicles[0].id
                            }),
                              setApproveModal(!approveModal),
                              setEmail(userdatas[0].email);
                          }}
                          className={`flex rounded-lg text-sm text-white px-6 py-1.5 border ${
                            allCriteriasMet ? "bg-scudGreen/20" : "bg-scudGreen"
                          }`}
                        >
                          <p>Approve</p>
                        </button>
                      </div>
                    </div>
                  )}
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
        </div>
      ))}

      <Modal title={"Document preview"} onClose={() => setPreviewModal(false)} open={previewmodal}>
        <div className=" md:w-[40rem] w-full space-y-4 justify-center items-center flex flex-col  h-auto">
          <div className="flex space-x-1 md:space-x-3 justify-center items-center">
            <div>
              <MdArrowBackIosNew
                onClick={previewindex == 0 ? null : handleBack}
                className={
                  previewindex == 0
                    ? "opacity-20 md:text-lg cursor-pointer"
                    : "hover:opacity-30 md:text-lg cursor-pointer"
                }
              />
            </div>
            <div className="w-full  rounded-md transition-all">
              <img
                className="rounded-md w-full max-h-[300px]"
                alt="preview_img"
                src={preview[previewindex]}
              />
            </div>
            <div>
              <MdArrowForwardIos
                onClick={
                  isLicense
                    ? previewindex == 1
                      ? null
                      : handleNext
                    : previewindex == 2
                    ? null
                    : handleNext
                }
                className={
                  isLicense
                    ? previewindex == 1
                      ? "opacity-20 md:text-lg cursor-pointer"
                      : "hover:opacity-30 md:text-lg cursor-pointer"
                    : previewindex == 2
                    ? "opacity-20 md:text-lg cursor-pointer"
                    : "hover:opacity-30 md:text-lg cursor-pointer"
                }
              />
            </div>
          </div>
          <p>
            {previewindex == 0 ? "Front view" : previewindex == 1 ? "Back view" : "Interior View"}
          </p>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Notification Sent.</p>
            <p className="text-sm text-center text-textColor mt-2">
              An email notification has been sent successfully to this user.
            </p>
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setApproveModal(false)} open={approveModal}>
        <div className=" w-[20rem] md:w-[24rem] space-y-10  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <RiErrorWarningLine className="text-blue-800 text-5xl" />
            <p className="text-lg font-semibold mt-2">Approve this Documents?</p>
            <p className="text-sm text-center text-textColor mt-2">
              Are you sure you want to approve this document?{" "}
            </p>
          </div>
          <div className="flex  space-x-5 justify-between">
            <div>
              <button
                onClick={() => setApproveModal(false)}
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
                <p>Yes, approve</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* decline modal */}
      <Modal onClose={() => setDeclineModal(false)} open={declineModal}>
        <div className=" w-[20rem] md:w-[24rem] space-y-10  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <RiErrorWarningLine className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Decline the Driver’s document?</p>
            <p className="text-sm text-center text-textColor mt-2">
              The link to this document resubmission section will be the sent to the user to
              reupload his/her document{" "}
            </p>
          </div>
          <div className="flex  space-x-5 justify-between">
            <div>
              <button
                onClick={() => {
                  setDeclineModal(!declineModal);
                }}
                className="flex rounded-lg text-sm text-red-600 px-6 py-1.5 border border-red-600"
              >
                <p>No, don’t</p>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setDeclineNotification(!declinenotification), setDeclineModal(false);
                }}
                className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
              >
                <p>Yes, Decline</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* approve  */}
      <Modal
        title={"Approved email notification"}
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
                dropDownWidth={" w-full mt-1"}
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
            <Button text={"Yes, approve"} onClick={handleApprove} loading={loading} />
          </div>
        </div>
      </Modal>
      {/* decline notify modal */}
      <Modal
        title={"Decline reason and link"}
        onClose={() => setDeclineNotification(false)}
        open={declinenotification}
      >
        <div className=" w-[20rem] md:w-[24rem] space-y-10  h-auto">
          <div className="bg-adminbg rounded-md space-y-5 md:h-auto p-3 md:p-6">
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Section link</p>
              <Input
                value={link}
                disable={true}
                onChange={(e) => setLink(e.target.value)}
                placeholder={"http://www.scud.com/signup step:2"}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Email template</p>
              <Select
                data={emailtemps}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={selectedmail}
                setValue={setSelectedMail}
                dropDownWidth={" w-full mt-1"}
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
                cols={3}
                rows={3}
                className="w-full outline-none p-2 text-xs text-textColor rounded-md border-[#E5E5E4] border"
                minLength={7}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex  space-x-5 justify-between">
          <div>
            <button
              onClick={() => setDeclineNotification(false)}
              className="flex rounded-lg text-sm text-red-600 px-6 py-1.5 border border-red-600"
            >
              <p>No, don’t</p>
            </button>
          </div>
          <div>
            <Button text={"Yes, decline"} onClick={handleDecline} loading={loading} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

document_details.getLayout = Layout;
export default document_details;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const { id } = context.query;

  const userRes = await fetch(`${BASE_URL}approvals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const users = await userRes.json();

  if (users?.statusCode !== undefined && users?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  const userdatas = users.filter((itm) => {
    return itm.id == +id;
  });

  return {
    props: {
      userdatas
    }
  };
}
