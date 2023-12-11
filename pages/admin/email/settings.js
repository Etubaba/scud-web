import React from "react";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [driver, setDriver] = useState("smtp");
  const [host, setHost] = useState("smtp.gmail.com");
  const [port, setPort] = useState("587");
  const [encryption, setEncryption] = useState("tls");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromName, setFromName] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (
      driver !== "" &&
      host !== "" &&
      port !== "" &&
      encryption !== "" &&
      username !== "" &&
      password !== "" &&
      fromAddress !== "" &&
      fromName !== ""
    ) {
      setDisabled(false);
    }
  }, [
    driver,
    host,
    port,
    encryption,
    username,
    password,
    fromAddress,
    fromName,
  ]);

  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p className="tracking-wide">Email Settings</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <label>Driver</label>
              <Input
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder={"Driver"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <label>Host</label>
              <Input
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder={"Host"}
                // Icon={AiOutlineMail}
              />
            </div>
            <div className="col-span-1">
              <label>Port</label>
              <Input
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder={"Port"}
                // Icon={BsLock}
              />
            </div>
            <div className="col-span-1">
              <label>From address</label>
              <Input
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder={"From address"}
                // Icon={AiOutlinePhone}
              />
            </div>

            <div className="col-span-1">
              <label>From name</label>
              <Input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder={"From name"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <label>encryption</label>
              <Input
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                placeholder={"encryption"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <label>Username</label>
              <Input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={"Username"}
                // Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <label>Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Password"}
                // Icon={BsPerson}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          disabled={disabled}
          onClick={() => {
            setSuccessModal(true);
            // setOpen(false);
          }}
          text={"Add details"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem] p-8 h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Saved</p>
            <p className="text-sm text-center text-textColor mt-2">
              The email settings has been updated{" "}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
Settings.getLayout = Layout;
export default Settings;
