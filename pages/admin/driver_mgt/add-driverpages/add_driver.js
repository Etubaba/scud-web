import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineNumber,
  AiOutlinePhone,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import Layout from "../../../../components/Admin/Layout";
import Stepper from "../../../../components/admincomponents/Stepper";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";

const Add_driver = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Select gender");
  const [status, setStatus] = useState("Select Status");
  const [country, setCountry] = useState("Select Country");
  const [state, setState] = useState("Select State");
  const [city, setCity] = useState("Select City");
  const router = useRouter();

  const genderList = ["Male", "Female", "Other"];
  const statusList = ["Active", "Inactive", "Pending"];

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
      <Stepper level={1} />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Enter Driver details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={"First Name"}
                Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder={"Last Name"}
                Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"email"}
                Icon={AiOutlineMail}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={"Phone Number"}
                Icon={AiOutlinePhone}
              />
            </div>

            <div className="col-span-1">
              <Select
                data={genderList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={gender}
                setValue={setGender}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
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
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Location details</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={genderList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={country}
                setValue={setCountry}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={state}
                setValue={setState}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={city}
                setValue={setCity}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
            <div className="col-span-1">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Postal Code"}
                Icon={AiOutlineNumber}
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={"Home Address"}
              Icon={AiOutlineHome}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/admin/driver_mgt/manage_driver")}
          className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
        >
          Cancel
        </button>
        <Button
          onClick={() =>
            router.push("/admin/driver_mgt/add-driverpages/upload_license")
          }
          text={"Continue"}
        />
      </div>
    </div>
  );
};
Add_driver.getLayout = Layout;
export default Add_driver;
