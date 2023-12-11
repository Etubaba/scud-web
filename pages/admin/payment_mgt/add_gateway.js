import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineLock } from "react-icons/ai";
import { BsCheck, BsFileLock, BsHash, BsPerson } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { banks, gatewaylist } from "../../../dummy";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const Add_gateway = () => {
  const [random, setRandom] = useState("");
  const [secredId, setSecredId] = useState("");
  const [puclickKey, setPublicKey] = useState("");
  const [gateway, setGateway] = useState("select gateway");
  const [mode, setMode] = useState("Test");
  const [code, setCode] = useState("");

  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const modeList = ["Test", "Live"];

  const makeRandom = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    setRandom(makeRandom(10) + "SCUD");
  }, []);

  // ACTIVE_PAYMENT_GATEWAY: 'PAYSTACK',
  //   PAYSTACK_SECRET_KEY:
  //   PAYSTACK_PUBLIC_KEY:
  //   FLUTTERWAVE_SECRET_KEY:
  //   FLUTTERWAVE_PUBLIC_KEY:
  //   STRIPE_SECRET_KEY:
  //   STRIPE_PUBLIC_KEY:

  const disabled = secredId === "" || puclickKey === "" || code !== random ? true : false;

  const postKey = async () => {
    setLoading(true);
    const keys =
      gateway === "Paystack"
        ? ["PAYSTACK_SECRET_KEY", "PAYSTACK_PUBLIC_KEY"]
        : ["FLUTTERWAVE_SECRET_KEY", "FLUTTERWAVE_PUBLIC_KEY"];
    const values = [secredId, puclickKey];

    const formData = {
      keys,
      values
    };

    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}settings/many`, formData);
      if (data) {
        setSuccessModal(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
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
    <div>
      <span className="text-lg md:flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/payment_mgt/gateways")}
        >
          Payment Gateways &nbsp; &gt;
        </p>
        <p className="tracking-wide">Add payment gateway</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Payment gateways</p>
              <Select
                data={gatewaylist}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={gateway}
                setValue={setGateway}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
                search={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Mode</p>
              <Select
                data={modeList}
                style={"w-full p-2.5"}
                positon={"p-4"}
                value={mode}
                setValue={setMode}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
                // search={true}
              />
            </div>
          </div>
          {/* when it's not bank transfer */}
          {gateway !== "select gateway" && (
            <div className="grid grid-cols-1 mt-5  md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm  text-textColor mb-2">{mode} Public Key</p>
                <Input
                  value={puclickKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder={"eg jhjj...."}
                  Icon={AiOutlineLock}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm  text-textColor mb-2">{mode} Secret Key</p>
                <Input
                  value={secredId}
                  onChange={(e) => setSecredId(e.target.value)}
                  placeholder={"eg. ...."}
                  Icon={AiOutlineLock}
                />
              </div>
            </div>
          )}

          <div className="mt-16 ">
            <p className="text-red-600 text-center text-sm"> For security reasons,</p>
            <p className="text-sm text-center mb-2 text-textColor">
              Please, enter the below numbers in the field
            </p>
            <p className="text-lg text-center text-textColor">{random}</p>

            <div className="flex justify-center mt-2 md:px-64 items-center">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                className={`w-full border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 ${
                  code.length >= 14
                    ? code === random
                      ? "focus:border-green-700"
                      : "focus:border-red-700"
                    : "focus:border-scudGreen"
                }  focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5`}
              />

              {code.length >= 14 && (
                <>
                  {code === random ? (
                    <BsCheck className="text-green-700 text-xl" />
                  ) : (
                    <AiOutlineClose className="text-red-700 text-xl" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/payment_mgt/gateways")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button loading={loading} disabled={disabled} onClick={postKey} text={"Add details"} />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">{gateway} gateway Added.</p>
            <p className="text-sm text-center text-textColor mt-2">
              {gateway} gateway has been added as a payment gateway successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Add_gateway.getLayout = Layout;
export default Add_gateway;
