import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { useDropzone, Dropzone } from "react-dropzone";

import {
  AiOutlineCheckCircle,
  AiOutlinrate,
  AiOutlinePhone,
  AiOutlineDollar,
  AiOutlinePlus,
  AiOutlinePercentage,
} from "react-icons/ai";
import { BsCloudUpload, BsLock, BsPerson } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { TbActivityHeartbeat, TbCurrencyNaira } from "react-icons/tb";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";

const Settings = () => {
  const [currencyname, setCurrencyname] = useState("");
  const [rate, setRate] = useState("");

  const [status, setStatus] = useState("Select Status");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [files, setFiles] = useState([null, null, null]);
  const [files2, setFiles2] = useState([null, null, null]);
  const [activeindex, setActiveIndex] = useState();
  const [acceptedFiles, setAcceptedFiles] = useState();
  const [acceptedFilesobj, setAcceptedFilesObj] = useState();

  //   console.log(files, "files");
  const router = useRouter();

  // ____________________________________________________#############################################_______________________________

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

  // ____________________________________________________#############################################_______________________________
  //change button from disable to able
  useEffect(() => {
    if (
      //   vmodels !== "" &&
      //   vmake !== "Select vehicle makes" &&
      status !== "Select Status"
      //   vmodels !== "Select vehicle models"
    ) {
      setDisabled(false);
      setSuccessAction(currencyname);
    }
  }, [status]);

  // ____________________________________________________#############################################_______________________________
  useEffect(() => {
    console.log(acceptedFiles, "acceptedFiles");
    let newFiles = [...files];
    let newFiles2 = [...files2];
    newFiles[activeindex] = acceptedFiles;
    newFiles2[activeindex] = acceptedFilesobj;
    setFiles(newFiles);
    setFiles2(newFiles2);
  }, [acceptedFiles, acceptedFilesobj]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(URL.createObjectURL(acceptedFiles[0]));
      setAcceptedFilesObj(acceptedFiles);
    },
  });

  const handleRemovetag = (index) => {
    let newFiles = [...files];
    let newFiles2 = [...files2];
    newFiles[index] = null;
    newFiles2[index] = null;
    setFiles(newFiles);
    setFiles2(newFiles2);
  };

  // ____________________________________________________#############################################_______________________________

  return (
    <div>
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p className=" tracking-wide hover:underline">Site Settings</p>
      </span>
      <div className="md:mt-10 mt-8 w-full space-y-5 bg-white border shadow-sm rounded-md  md:p-6">
        <div>
          <p className="text-sm text-black mb-7 p-3">Enter Site details</p>
          <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1 mb-5">
                <p className="text-sm text-textColor mb-4">Site Name</p>
                <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1 mb-5">
                <p className="text-sm text-textColor mb-4">Version</p>
                <Input
                  // defaultValue={"Scud"}
                  value={"scud"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              {/* ############################## */}
            </div>
            <div className="col-span-1 my-8 ">
              <div className=" md:flex space-y-5 md:space-y-0  w-full md:space-x-5 justify-center">
                {/* image file upload ####################################### */}
                {files.map((item, index) =>
                  item !== null ? (
                    <div className="flex-col flex justify-center items-center">
                      <p className="text-sm text-textColor mb-4">
                        {index === 0
                          ? "Header Logo (Size: 140x80)"
                          : index === 1
                          ? "Header White Logo (Size: 140x80)"
                          : "Favicon (Size: 16x16)"}
                      </p>
                      <div
                        key={index}
                        className="border-dashed min-w-1/5  h-48 rounded-md   border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                      >
                        <div className="w-full">
                          <img
                            src={item}
                            className="rounded object-contain mb-2 w-full h-[150px]"
                          />
                          <div
                            onClick={() => handleRemovetag(index)}
                            className="flex  justify-center items-center"
                          >
                            <div className="flex justify-center relative bottom-[0px] items-center space-x-1 cursor-pointer hover:bg-gray-300 text-red-400 bg-gray-100 p-[2px] w-fit rounded-md">
                              <MdDeleteOutline className="text-[18px] mt-1   " />
                              <p className="md:text-xs">Remove photo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-col flex justify-center items-center">
                      <p className="text-sm text-textColor mb-4">
                        {index === 0
                          ? "Header Logo (Size: 140x80)"
                          : index === 1
                          ? "Header White Logo (Size: 140x80)"
                          : "Favicon (Size: 16x16)"}
                      </p>
                      <div
                        key={index}
                        onClick={(e) => {
                          setActiveIndex(index);
                        }}
                        onDragEnter={(e) => {
                          setActiveIndex(index);
                        }}
                      >
                        <div
                          {...getRootProps()}
                          className="border-dashed min-w-1/5  h-48  rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                        >
                          <>
                            <input {...getInputProps()} />
                            <p>
                              <BsCloudUpload className="text-4xl text-gray-600" />
                            </p>

                            <div className="space-y-3 flex flex-col items-center justify-center">
                              <p className=" text-[12px] lg:text-base text-center">
                                Click or drag your photo here
                              </p>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 mb-4  md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Default Currency</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  Trip Default Payment Method
                </p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Driver Kilo Meter</p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  Driver Closer Notification (in minutes)
                </p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Pickup Kilo Meter</p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Drop Kilo Meter</p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
            </div>

            {/* adding aditional heading tags ##################################################3 */}
            <div className="col-span-1 mb-4">
              <p className="text-sm text-textColor mb-4">
                Add code to the &lt;head&gt; (for tracking codes such as google
                analytics)
              </p>
              <Input
                textArea={true}
                rows={100}
                cols={100}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={"Type here..."}
                // Icon={AiOutlineMail}
              />
            </div>

            {/* setting sites default languages ################################################# */}
            <div className="grid grid-cols-1 mb-10  md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Default Language</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Country Code </p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Number of trips</p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Average Rating </p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Heat Map</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Heat Map Hours</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  Update Location Interval (Intervals in seconds to update
                  driver’s current location)
                </p>
                <Input
                  type={"number"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
            </div>
            {/* other configuration settups ########################################## */}
            <div className="grid grid-cols-1 mb-4  md:grid-cols-2 gap-5 md:gap-8">
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Normal Percentage</p>
                <Input
                  Icon={AiOutlinePercentage}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Medium Percentage</p>
                <Input
                  Icon={AiOutlinePercentage}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Harder Percentage</p>
                <Input
                  Icon={AiOutlinePercentage}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Facebook Login</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Google Login</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Apple Login</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Otp Verification</p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  Number of days for inactive rider
                </p>
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
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">Owe amount limit</p>
                <Input
                  Icon={TbCurrencyNaira}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Type here..."}
                  // Icon={AiOutlineMail}
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-textColor mb-4">
                  Maximum days to pay
                </p>
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
          text={"Save Changes"}
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

Settings.getLayout = Layout;
export default Settings;
