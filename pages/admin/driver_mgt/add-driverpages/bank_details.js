import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import Layout from "../../../../components/Admin/Layout";
import Stepper from "../../../../components/admincomponents/Stepper";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Modal from "../../../../components/common/Modal";
import Select from "../../../../components/common/Select";

const Bank_details = () => {
  const [level, setLevel] = useState(4);
  const [bank, setBank] = useState("Select Bank");
  const [bankType, setBankType] = useState("Select Bank Type");
  const [acctNum, setAcctNum] = useState("");
  const [acctName, setAcctName] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const router = useRouter();
  const statusList = ["Active", "Inactive", "Pending"];

  const submit = () => {
    setLevel(5);
    setSuccessModal(true);
    setTimeout(() => {
      router.push("/admin/driver_mgt/manage_driver");
    }, 4000);
  };
  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2 mb-6 cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => router.push("/admin/driver_mgt/manage_driver")}
        >
          Manage driver
        </p>{" "}
        &nbsp; &gt; <p className="tracking-wide">Add new driver</p>
      </span>
      <Stepper level={level} />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            Enter driver's Bank details
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={bank}
                setValue={setBank}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1">
              <Input
                value={acctNum}
                onChange={(e) => setAcctNum(e.target.value)}
                placeholder={"Account Number"}
                Icon={AiOutlineNumber}
              />
            </div>

            <div className="col-span-1">
              <Input
                value={acctName}
                onChange={(e) => setAcctName(e.target.value)}
                placeholder={"Acctount Name"}
                Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={bankType}
                setValue={setBankType}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/driver_mgt/manage_driver")}
          className="bg-white border-red-600 text-red-600 border  px-4 py-1.5 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>

        <div className="flex space-x-6">
          <button
            onClick={() =>
              router.push("/admin/driver_mgt/add-driverpages/upload_license")
            }
            className="bg-white  min-w-[102px] border hover:bg-slate-50 px-4 py-[7.5px] rounded-md text-sm  mr-2"
          >
            Back
          </button>
          <Button onClick={submit} text={"Submit"} />
        </div>
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Drive Added successfully.
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              Driver details has been added .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Bank_details.getLayout = Layout;
export default Bank_details;
