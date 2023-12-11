// import React from "react";
// import Layout from "../../../../components/Admin/Layout";

// const Add_city = () => {
//   return <div>add_city</div>;
// };

import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsHash, BsTranslate } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import Layout from "../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Modal from "../../../../components/common/Modal";
import Select from "../../../../components/common/Select";

const Add_city = () => {
  const [cityname, setCityname] = useState("");

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [countries, setCountries] = useState("Select Country");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();

  const statusList = ["Active", "Inactive"];
  //change button from disable to able
  useEffect(() => {
    if (
      countries !== "Select Country" &&
      code !== "" &&
      status !== "Select Status" &&
      cityname !== ""
    ) {
      setDisabled(false);
      setSuccessAction(cityname);
    }
  }, [code, countries, status, cityname]);
  return (
    <div>
      <BreadCrumbs
        secondItem={"Add city"}
        indexPath={"/admin/location/city"}
        index={"Manage City"}
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">Enter city details</p>
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">City Name</p>
              <Input
                value={cityname}
                onChange={(e) => setCityname(e.target.value)}
                Icon={TbWorld}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Short Name</p>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                Icon={BsTranslate}
              />
            </div>

            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Country</p>
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={countries}
                setValue={setCountries}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Status</p>
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
          text={"Add City"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">
              {successAction} added successfully.
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

Add_city.getLayout = Layout;
export default Add_city;
