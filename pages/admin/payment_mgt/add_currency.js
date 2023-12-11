import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlinrate,
  AiOutlinePhone,
  AiOutlineDollar,
} from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";
import { TbActivityHeartbeat } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";

const AddCurency = () => {
  const [currencyname, setCurrencyname] = useState("");
  const [rate, setRate] = useState("");

  const [currencies, setCurrencies] = useState("Select Currency mm");
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();
  const roleList = ["USD", "GBP", "NGN", "EUR"];
  const statusList = ["Active", "inactive", "Suspended"];
  //change button from disable to able i di kkjk lll

  useEffect(() => {
    if (
      rate !== "" &&
      currencies !== "Select Currency" &&
      status !== "Select Status" &&
      currencyname !== ""
    ) {
      setDisabled(false);
      setSuccessAction(currencyname);
    }
  }, [rate, currencies, status, currencyname]);
  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/payment_mgt/currency")}
        >
          Manage Currency
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Add currency</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Currency Details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={roleList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={currencies}
                setValue={setCurrencies}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <Input
                value={currencyname}
                onChange={(e) => setCurrencyname(e.target.value)}
                placeholder={"Currency Name"}
                Icon={AiOutlineDollar}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder={"Rate"}
                Icon={TbActivityHeartbeat}
              />
            </div>

            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={status}
                setValue={setStatus}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/admin/payment_mgt/currency")}
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
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              {successAction} Added successfully.
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              {successAction} has been added as admin .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

AddCurency.getLayout = Layout;
export default AddCurency;
