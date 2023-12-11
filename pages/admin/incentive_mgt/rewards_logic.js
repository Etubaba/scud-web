import React from "react";
import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlinePercentage,
  AiOutlinePlus,
} from "react-icons/ai";
import DatePicker from "../../../components/common/DatePicker";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyNaira } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { time, location } from "../../../dummy";

const rewards_logic = () => {
  const [open1, setOpen1] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [locationValue, setLocationValue] = useState("Select Location");
  const [Vehicle, setVehicle] = useState("Select Vehicle");
  const [capacity, setCapacity] = useState("Vehicle capacity");
  const [peakFare, setPeakFare] = useState("Peak Fare");
  const [NightFare, setNightFare] = useState("Night Fare");
  const [base, setBase] = useState("");
  const [min, setMin] = useState("");
  const [day, setDay] = useState("Select");
  const [peakFareStart, setPeakFareStart] = useState("Select");
  const [peakFareEnd, setPeakFareEnd] = useState("Select");
  const [peakFareX, setPeakFareX] = useState("Select");
  const [start, setStart] = useState("select");

  const [peakFareList, setPeakFareList] = useState([]);

  const handlePeakFare = () => {
    if (
      day !== "Select" &&
      peakFareStart !== "Select" &&
      peakFareEnd !== "Select" &&
      peakFareX !== "Select"
    ) {
      const timeSettings = {
        day: day,
        peakFareStart: peakFareStart,
        peakFareEnd: peakFareEnd,
        peakFareX: peakFareX,
      };

      setPeakFareList((prev) => [...prev, timeSettings]);

      setDay("Select");
      setPeakFareEnd("Select");
      setPeakFareStart("Select");
      setPeakFareX("Select");
    }
  };

  const handleDelete = (idx) => {
    const newList = peakFareList.filter((_, i) => idx !== i);
    setPeakFareList(newList);
  };

  return (
    <div>
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p className="tracking-wide">Reward Logic</p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm font-semibold text-textColor mb-7">
            Set a reward Logic
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">
                Set duration (From)
              </p>

              <DatePicker
                onChange={(e) => console.log(e.target.value, "date")}
                value={"select date"}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">To</p>
              <DatePicker value={"select date"} />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Set time (From)</p>
              <DatePicker
                onChange={(e) => console.log(e.target.value, "time")}
                type={"time"}
                value={"select date"}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">To</p>
              <DatePicker type={"time"} value={"select date"} />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">
                Minimum time to spend online{" "}
                <small className="text-textColor/50">(in hours)</small>
              </p>
              <Select
                data={["4", "5", "6"]}
                style={"w-full p-[10px]"}
                positon={"p-3"}
                value={Vehicle}
                setValue={setVehicle}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">
                Expected minimum amount
              </p>
              <Input
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder={""}
                Icon={TbCurrencyNaira}
                iconbg={true}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">Set minimum trip</p>
              <Select
                data={["4", "5", "6"]}
                style={"w-full p-[10px]"}
                positon={"p-3"}
                value={Vehicle}
                setValue={setVehicle}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor  mb-2">
                Set minimum kilometer
              </p>
              <Select
                data={["4", "5", "6"]}
                style={"w-full p-[10px]"}
                positon={"p-3"}
                value={Vehicle}
                setValue={setVehicle}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm  text-textColor mb-2">
                Rate of accepted Ride Request (in percentage){" "}
                <small className="text-textColor/50">(in percentage)</small>
              </p>
              <Input
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder={""}
                Icon={AiOutlinePercentage}
                iconbg={true}
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
          Cancel
        </button>
        <Button
          //   disabled={disabled}
          onClick={() => {
            setSuccessModal(true);
            // setOpen(false);
          }}
          text={"Save Changes"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              Fare Added successfully.
            </p>
            <p className="text-sm text-center text-textColor mt-2">
              {locationValue} fare has been added successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
rewards_logic.getLayout = Layout;
export default rewards_logic;
