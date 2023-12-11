import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineRight,
} from "react-icons/ai";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";

const Create_admin = () => {
  const [docsname, setDocsname] = useState("");

  const [role, setRole] = useState("Select Role");
  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");

  const router = useRouter();
  const roleList = ["Account Officer", "Driver Manager", "Super Admin"];
  const statusList = ["Active", "inactive", "Suspended"];
  //change button from disable to able
  useEffect(() => {
    if (
      role !== "Select Role" &&
      status !== "Select Status" &&
      docsname !== ""
    ) {
      setDisabled(false);
      setSuccessAction(docsname);
    }
  }, [role, status, docsname]);
  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 text-xs md:text-base tracking-wide hover:underline"
          onClick={() => router.push("/admin/driver_mgt/driver_docs")}
        >
          Driver's Documents
        </p>{" "}
        <AiOutlineRight className="text-gray-500/60 md:mt-1.5 text-base" />
        <p className="tracking-wide text-xs md:text-base">
          Create New Document
        </p>
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Add new document</p>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Input
                value={docsname}
                onChange={(e) => setDocsname(e.target.value)}
                placeholder={"docsname"}
                Icon={AiOutlineEdit}
              />
            </div>

            <div className="col-span-1">
              <Select
                data={roleList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={role}
                setValue={setRole}
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

Create_admin.getLayout = Layout;
export default Create_admin;
