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
import BreadCrumbs from "../../../components/common/BreadCrumbs";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";

const AddVehicleModel = () => {
  const [currencyname, setCurrencyname] = useState("");
  const [rate, setRate] = useState("");

  const [vmake, setVmake] = useState("Select vehicle makes");
  const [vmodels, setVmodels] = useState("Select vehicle models");
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();
  const makes = [
    <span className="flex justify-center  items-center space-x-5">
      <img
        src="/lexus.png"
        className="rounded-full h-7 w-7 md:h-4 md:w-4 object-contain"
        alt=""
      />
      <p className=" text-xs ">Audi</p>
    </span>,
    <span className="flex justify-center  items-center space-x-5">
      <img
        src="/lexus.png"
        className="rounded-full h-7 w-7 md:h-4 md:w-4 object-contain"
        alt=""
      />
      <p className=" text-xs ">Audi</p>
    </span>,
    <span className="flex justify-center  items-center space-x-5">
      <img
        src="/lexus.png"
        className="rounded-full h-7 w-7 md:h-4 md:w-4 object-contain"
        alt=""
      />
      <p className=" text-xs ">Audi</p>
    </span>,
  ];
  const models = ["BMW", "Audi", "Lexus", "Toyota", "Honda"];
  const statusList = ["Active", "inactive"];
  //change button from disable to able
  useEffect(() => {
    if (
      vmodels !== "" &&
      vmake !== "Select vehicle makes" &&
      status !== "Select Status" &&
      vmodels !== "Select vehicle models"
    ) {
      setDisabled(false);
      setSuccessAction(currencyname);
    }
  }, [vmake, status, vmodels]);
  return (
    <div>
      {" "}
      <BreadCrumbs
        indexPath={'"/admin/vehicle_mgt/vehicle_model"'}
        index={"Vehicle Models"}
        secondItem="Add Vehicle Model"
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7"></p>

          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={makes}
                style={"w-full p-3"}
                positon={"p-4"}
                value={vmake}
                setValue={setVmake}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <Select
                data={models}
                style={"w-full p-3"}
                positon={"p-4"}
                value={vmodels}
                setValue={setVmodels}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
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
          onClick={() => router.back()}
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
          text={"Add Vehicle model"}
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

AddVehicleModel.getLayout = Layout;
export default AddVehicleModel;
