import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";
import { MdGTranslate } from "react-icons/md";
import Layout from "../../../../components/Admin/Layout";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Modal from "../../../../components/common/Modal";
import Select from "../../../../components/common/Select";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";

const Add_language = () => {
  const [languagename, setLanguagename] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();

  const statusList = ["Active", "Inactive"];
  //change button from disable to able
  useEffect(() => {
    if (value !== "" && status !== "Select Status" && languagename !== "") {
      setDisabled(false);
      setSuccessAction(languagename);
    }
  }, [value, status, languagename]);
  return (
    <div>
      {" "}
      <BreadCrumbs
        secondItem={"Add Language"}
        indexPath={"/admin/location/language"}
        index={" Manage Language"}
      />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">
            {" "}
            <p className="text-sm text-textColor mb-2">
              Enter Language details
            </p>
          </p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Language Name</p>
              <Input
                value={languagename}
                onChange={(e) => setLanguagename(e.target.value)}
                Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Language Value</p>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                Icon={BsTranslate}
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
          text={"Add Language"}
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

Add_language.getLayout = Layout;
export default Add_language;
