import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlinePercentage,
  AiOutlinePlus
} from "react-icons/ai";
import { TbCurrencyNaira, TbPercentage } from "react-icons/tb";
import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import DatePicker from "../../../../components/common/DatePicker";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";
import "animate.css";

import { BASE_URL, STATE_URL } from "../../../../api/base";
import Pagination from "../../../../components/common/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../../../components/common/Modal";
import { useSnackbar } from "notistack";
import { getToken } from "../../../../components/services/refresh";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../../../../components/services/validateToken";
import Switch from "../../../../components/common/Switch";
import { FiEdit } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { useReducer } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const sos_settings = ({ sos_settings, sos_options, sos_contacts }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [loading, setSetLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [soscontact, dispatcher] = useReducer(setSosContact, {
    name: "",
    phone: "",
    email: ""
  });

  const [iseditable, setIseditable] = useState({
    status: false,
    id: null
  });
  const [reason, setReason] = useState("");
  const [disable, setDisable] = useState(false);
  const [sos_setting, setSos_setting] = useState([...sos_settings]);
  const { data: data } = sos_options;
  const { data: data2 } = sos_contacts;

  const router = useRouter();

  function setSosContact(soscontact, action) {
    if (action.type == "name") {
      return { name: action.value, email: soscontact.email, phone: soscontact.phone };
    } else if (action.type == "phone") {
      return { name: soscontact.name, email: soscontact.email, phone: action.value };
    } else if (action.type == "email") {
      return { name: soscontact.name, email: action.value, phone: soscontact.phone };
    } else {
      return { name: "", email: "", phone: "" };
    }
  }

  useEffect(() => {
    let checker;
    for (let index = 0; index < sos_setting.length; index++) {
      const element = sos_setting[index];
      if (element.key == "SOS_ACTIVE") {
        checker = element.value;
      }
    }

    if (checker == "true") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [sos_setting]);

  const handleChange = async (item) => {
    try {
      const incoming_item = item;
      incoming_item.value = item.value == "true" ? "false" : "true";
      const ff = sos_setting.filter((itm) => {
        return itm.key !== incoming_item.key;
      });
      setSos_setting([...ff, incoming_item]);

      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const formdata = {
        keys: [incoming_item.key],
        values: [incoming_item.value + ""]
      };
      const { data } = await axios.patch(`${BASE_URL}settings/many`, formdata);
      if (data) {
        enqueueSnackbar("settings updated", {
          variant: "success"
        });
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

  const handleAddReason = async (create, edit, _delete) => {
    try {
      if (reason == "") {
        enqueueSnackbar("field can't be empty", {
          variant: "error"
        });
      } else {
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        const formdata = {
          reason: reason
        };
        console.log(edit, _delete);
        const { data } = (await edit)
          ? await axios.patch(`${BASE_URL}sos-options/${iseditable.id}`, formdata)
          : (await _delete)
          ? await axios.delete(`${BASE_URL}sos-options/${iseditable.id}`)
          : await axios.post(`${BASE_URL}sos-options`, formdata);
        if (data) {
          enqueueSnackbar(edit ? "reason updated" : _delete ? "reason deleted" : "reason added", {
            variant: "success"
          });
          setIseditable({
            status: false,
            id: null
          });
          setReason("");
          await router.replace(router.asPath);
          setDeleteModal(false);
        }
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

  const handleAddContact = async (create, edit, _delete) => {
    try {
      if (soscontact.email == "" || soscontact.name == "" || soscontact.phone == "") {
        enqueueSnackbar("field can't be empty", {
          variant: "error"
        });
      } else {
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        const formdata = {
          email: soscontact.email,
          phone: soscontact.phone,
          name: soscontact.name
        };
        const { data } = (await edit)
          ? await axios.patch(`${BASE_URL}sos-contacts/${iseditable.id}`, formdata)
          : (await _delete)
          ? await axios.delete(`${BASE_URL}sos-contacts/${iseditable.id}`)
          : await axios.post(`${BASE_URL}sos-contacts`, formdata);
        if (data) {
          enqueueSnackbar(
            edit ? "sos contact updated" : _delete ? "sos contact deleted" : "sos contact added",
            {
              variant: "success"
            }
          );
          setIseditable({
            status: false,
            id: null
          });
          dispatcher({ type: "clear" });
          await router.replace(router.asPath);
          setDeleteModal2(false);
        }
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

  return (
    <div className=" transition-transform">
      <span className="text-lg flex space-x-2 mb-6 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/support/sos/")}
        >
          SOS settings
        </p>
        &nbsp; &gt; <p className="tracking-wide">Settings</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <div className="w-full md:w-1/2 pb-3 md:ml-6">
            {sos_setting
              .filter((item) => {
                return item.key == "SOS_ACTIVE";
              })
              .map((item, index) => (
                <div key={index} className={`flex justify-between items-center  `}>
                  <label className="text-xs text-textColor">
                    {item.key == "SOS_ACTIVE" ? "SOS activation" : null}
                  </label>
                  <Switch
                    onChange={() => {
                      handleChange(item);
                    }}
                    value={item.value == "true" ? true : false}
                    showlabel={true}
                    color={"[#000]"}
                  />
                </div>
              ))}
          </div>
          <div className="w-full md:w-1/2 space-y-3 md:ml-6">
            {sos_setting
              .filter((item) => {
                return item.key !== "SOS_ACTIVE";
              })
              .map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center  ${
                    disable
                      ? item.key == "SOS_BUTTON"
                        ? "opacity-30"
                        : item.key == "SOS_LOCATION"
                        ? "opacity-30"
                        : item.key == "SOS_AUDIO"
                        ? "opacity-30"
                        : item.key == "SOS_VIDEO"
                        ? "opacity-30"
                        : item.key == "SOS_CALL"
                        ? "opacity-30"
                        : null
                      : null
                  }`}
                >
                  <label className="text-xs text-textColor">
                    {item.key == "SOS_BUTTON"
                      ? "SOS button display"
                      : item.key == "SOS_LOCATION"
                      ? "SOS location sharing"
                      : item.key == "SOS_AUDIO"
                      ? "SOS audio recording"
                      : item.key == "SOS_VIDEO"
                      ? "SOS video recording"
                      : item.key == "SOS_CALL"
                      ? "SOS call functionality"
                      : null}
                  </label>
                  <Switch
                    onChange={() => {
                      disable ? null : handleChange(item);
                    }}
                    value={item.value == "true" ? true : false}
                    showlabel={true}
                    color={"[#000]"}
                  />
                </div>
              ))}
          </div>
          <div className={`${disable && "opacity-30"}`}>
            <div className="flex justify-between items-center">
              <p className="text-sm text-textColor my-7">SOS Options</p>
              <p className="text-xs text-textColor">{`${data.length} option(s)`}</p>
            </div>
            <div className="w-full md:w-1/2 md:ml-6 space-y-2">
              <div className="flex space-x-3">
                <Input
                  disable={disable}
                  value={iseditable.status ? "" : reason}
                  onChange={(e) => {
                    iseditable.status ? "" : setReason(e.target.value);
                  }}
                  placeholder={"Enter options"}
                  type={"text"}
                />
                <button
                  onClick={() => handleAddReason(true, undefined, undefined)}
                  className="bg-white border-scudGreen flex justify-center items-center space-x-3 text-scudGreen border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
                >
                  <AiOutlinePlus /> Add
                </button>
              </div>

              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex space-x-3 rounded ${
                    iseditable.status && iseditable.id == item.id ? "bg-white" : " bg-[#E6EBFF] "
                  } p-1`}
                >
                  <Input
                    inputbg={
                      iseditable.status && iseditable.id == item.id ? "bg-white" : " bg-[#E6EBFF]"
                    }
                    disable={iseditable.status && iseditable.id == item.id ? false : true}
                    value={iseditable.status && iseditable.id == item.id ? reason : item.reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={"Enter options"}
                    type={"text"}
                  />
                  {iseditable.status && iseditable.id == item.id ? (
                    <span className="flex space-x-3 justify-center items-center">
                      <div
                        onClick={() => {
                          setIseditable({
                            status: false,
                            id: null
                          }),
                            setReason("");
                        }}
                      >
                        <button className="bg-white border-gray-200 flex justify-center items-center  text-textColor/50 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  ">
                          cancel
                        </button>
                      </div>
                      <div onClick={() => handleAddReason(undefined, true, undefined)}>
                        <button className="bg-white border-scudGreen flex justify-center items-center  text-scudGreen border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  ">
                          save
                        </button>
                      </div>
                    </span>
                  ) : (
                    <span className="flex space-x-3 justify-center items-center">
                      <div
                        onClick={() => {
                          disable
                            ? null
                            : setIseditable({
                                status: true,
                                id: item.id
                              }),
                            setReason(item.reason);
                        }}
                      >
                        <button className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1">
                          <FiEdit className="text-white" />
                        </button>
                      </div>
                      <div
                        onClick={() => {
                          disable
                            ? null
                            : (setDeleteModal(true),
                              setIseditable({
                                status: false,
                                id: item.id
                              }),
                              setReason(item.reason));
                        }}
                      >
                        <button className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1">
                          <RiDeleteBin6Line className="text-white" />
                        </button>
                      </div>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={`${disable && "opacity-30"}`}>
            <div className="flex justify-between items-center">
              <p className="text-sm text-textColor my-7">SOS Rescue Contacts</p>
              <p className="text-xs text-textColor">{`${data2.length} option(s)`}</p>
            </div>
            <div className="w-full  md:ml-6 space-y-2">
              <div className="flex space-x-3 justify-center items-center">
                <div className="w-full">
                  <label className="text-xs text-textColor">Name</label>
                  <Input
                    value={iseditable.status ? "" : soscontact.name}
                    onChange={(e) =>
                      dispatcher({
                        type: "name",
                        value: e.target.value
                      })
                    }
                    placeholder={"Name"}
                    type={"text"}
                  />
                </div>
                <div className="w-full">
                  <label className="text-xs text-textColor">Phone number</label>
                  <Input
                    value={iseditable.status ? "" : soscontact.phone}
                    onChange={(e) =>
                      dispatcher({
                        type: "phone",
                        value: e.target.value
                      })
                    }
                    placeholder={"Phone number"}
                    type={"tel"}
                  />
                </div>
                <div className="w-full">
                  <label className="text-xs text-textColor">Email address</label>
                  <Input
                    value={iseditable.status ? "" : soscontact.email}
                    onChange={(e) =>
                      dispatcher({
                        type: "email",
                        value: e.target.value
                      })
                    }
                    placeholder={"email address"}
                    type={"email"}
                  />
                </div>
                <div onClick={() => handleAddContact(true, undefined, undefined)} className="pt-5">
                  <button className="bg-white border-scudGreen flex justify-center items-center space-x-3 text-scudGreen border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2">
                    <AiOutlinePlus /> Add
                  </button>
                </div>
              </div>
              {data2.map((contacts_, index) => (
                <div
                  key={index}
                  className={`flex space-x-3 rounded ${
                    iseditable.status && iseditable.id == contacts_.id
                      ? "bg-white"
                      : " bg-[#E6EBFF] "
                  } p-1`}
                >
                  {" "}
                  <Input
                    inputbg={
                      iseditable.status && iseditable.id == contacts_.id
                        ? "bg-white"
                        : " bg-[#E6EBFF]"
                    }
                    disable={iseditable.status && iseditable.id == contacts_.id ? false : true}
                    value={
                      iseditable.status && iseditable.id == contacts_.id
                        ? soscontact.name
                        : contacts_.name
                    }
                    onChange={(e) =>
                      dispatcher({
                        type: "name",
                        value: e.target.value
                      })
                    }
                    placeholder={"Enter options"}
                    type={"text"}
                  />
                  <Input
                    inputbg={
                      iseditable.status && iseditable.id == contacts_.id
                        ? "bg-white"
                        : " bg-[#E6EBFF]"
                    }
                    disable={iseditable.status && iseditable.id == contacts_.id ? false : true}
                    value={
                      iseditable.status && iseditable.id == contacts_.id
                        ? soscontact.phone
                        : contacts_.phone
                    }
                    onChange={(e) =>
                      dispatcher({
                        type: "phone",
                        value: e.target.value
                      })
                    }
                    placeholder={"Enter options"}
                    type={"tel"}
                  />
                  <Input
                    inputbg={
                      iseditable.status && iseditable.id == contacts_.id
                        ? "bg-white"
                        : " bg-[#E6EBFF]"
                    }
                    disable={iseditable.status && iseditable.id == contacts_.id ? false : true}
                    value={
                      iseditable.status && iseditable.id == contacts_.id
                        ? soscontact.email
                        : contacts_.email
                    }
                    onChange={(e) =>
                      dispatcher({
                        type: "email",
                        value: e.target.value
                      })
                    }
                    placeholder={"Enter options"}
                    type={"email"}
                  />
                  {iseditable.status && iseditable.id == contacts_.id ? (
                    <span className="flex space-x-3 justify-center items-center">
                      <div
                        onClick={() => {
                          setIseditable({
                            status: false,
                            id: null
                          }),
                            dispatcher({
                              type: "clear"
                            });
                        }}
                      >
                        <button className="bg-white border-gray-200 flex justify-center items-center  text-textColor/50 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  ">
                          cancel
                        </button>
                      </div>
                      <div onClick={() => handleAddContact(undefined, true, undefined)}>
                        <button className="bg-white border-scudGreen flex justify-center items-center  text-scudGreen border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  ">
                          save
                        </button>
                      </div>
                    </span>
                  ) : (
                    <span className="flex space-x-3 justify-center items-center">
                      <div
                        onClick={() => {
                          disable
                            ? null
                            : setIseditable({
                                status: true,
                                id: contacts_.id
                              }),
                            dispatcher({
                              type: "email",
                              value: contacts_.email
                            }),
                            dispatcher({
                              type: "phone",
                              value: contacts_.phone
                            }),
                            dispatcher({
                              type: "name",
                              value: contacts_.name
                            });
                        }}
                      >
                        <button className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1">
                          <FiEdit className="text-white" />
                        </button>
                      </div>
                      <div
                        onClick={() => {
                          disable
                            ? null
                            : (setDeleteModal2(true),
                              setIseditable({
                                status: false,
                                id: contacts_.id
                              }),
                              dispatcher({
                                type: "email",
                                value: contacts_.email
                              }),
                              dispatcher({
                                type: "phone",
                                value: contacts_.phone
                              }),
                              dispatcher({
                                type: "name",
                                value: contacts_.name
                              }));
                        }}
                      >
                        <button className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1">
                          <RiDeleteBin6Line className="text-white" />
                        </button>
                      </div>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/support/sos/")}
          className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>
        <Button
          // loading={loading}
          onClick={() => router.push("/admin/support/sos/")}
          text={"Save Changes"}
        />
      </div>

      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2"> sos Reason</p>{" "}
            <p className="text-sm text-textColor mt-2">You are about to delete this reason</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              loading={loading}
              onClick={() => handleAddReason(undefined, undefined, true)}
              text={"Yes,  sos"}
            />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setDeleteModal2(false)} open={deleteModal2}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete sos Contact</p>{" "}
            <p className="text-sm text-textColor mt-2">You are about to delete this contact</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal2(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              loading={loading}
              onClick={() => handleAddContact(undefined, undefined, true)}
              text={"Yes,  sos"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

sos_settings.getLayout = Layout;
export default sos_settings;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const [res, options, contact] = await Promise.all([
    fetch(`${BASE_URL}settings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}sos-options`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}sos-contacts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [data, sos_options, sos_contacts] = await Promise.all([
    res.json(),
    options.json(),
    contact.json()
  ]);

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (sos_options?.statusCode !== undefined && sos_options?.statusCode === 401) ||
    (sos_contacts?.statusCode !== undefined && sos_contacts?.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  const sos_settings = [];
  data.filter((item) => {
    item.key == "SOS_ACTIVE"
      ? sos_settings.push(item)
      : item.key == "SOS_BUTTON"
      ? sos_settings.push(item)
      : item.key == "SOS_LOCATION"
      ? sos_settings.push(item)
      : item.key == "SOS_AUDIO"
      ? sos_settings.push(item)
      : item.key == "SOS_VIDEO"
      ? sos_settings.push(item)
      : item.key == "SOS_CALL"
      ? sos_settings.push(item)
      : null;
  });
  return {
    props: {
      sos_settings,
      sos_options,
      sos_contacts
    }
  };
}
