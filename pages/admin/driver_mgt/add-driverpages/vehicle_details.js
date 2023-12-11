import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import Layout from "../../../../components/Admin/Layout";
import Stepper from "../../../../components/admincomponents/Stepper";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";
import { useDropzone, Dropzone } from "react-dropzone";
import PreviewImage from "../../../../components/common/PreviewImage";
import { BsCloudUpload } from "react-icons/bs";
import Button from "../../../../components/common/Button";

const Vehicle_details = () => {
  const [frsc, setFrsc] = useState("");
  const [make, setMake] = useState("Select Make");
  const [model, setModel] = useState("Select Model");
  const [year, setYear] = useState("Select Year");
  const [color, setColor] = useState("Select Color");

  const [vehicleImg, setVehicleImg] = useState([]);
  const [vehicleFile, setVehicleFile] = useState([]);
  const router = useRouter();
  const statusList = ["Active", "Inactive", "Pending"];

  //getRootprops for vehicle image upload
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setVehicleImg((prevState) => [
          ...prevState,
          URL.createObjectURL(acceptedFiles[0]),
        ]);

        for (let i = 0; i < acceptedFiles.length; i++) {
          let loopedFile = acceptedFiles[i];

          if (vehicleFile.length >= 3) {
            return;
          } else {
            setVehicleFile((prevState) => [...prevState, loopedFile]);
          }
        }
      },
    });
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
      <Stepper level={3} />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md mb-6 md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Vehicle details</p>

          <div className="w-full my-5">
            <Input
              value={frsc}
              onChange={(e) => setFrsc(e.target.value)}
              placeholder={"Enter your FRSC Number"}
              Icon={AiOutlineNumber}
            />
          </div>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={make}
                setValue={setMake}
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
                value={model}
                setValue={setModel}
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
                value={year}
                setValue={setYear}
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
                value={color}
                setValue={setColor}
                dropDownWidth={
                  " w-[16.5rem] md:w-[26.5rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                }
                color=""
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg rounded-md  md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Vehicle details</p>

          {/* drag and drop for vehicle images */}
          <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 md:space-x-5 my-5 md:my-10">
            {vehicleImg[0] === undefined ? (
              <div
                {...getRootProps2()}
                className="border-dashed bg-white w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
              >
                <>
                  <input {...getInputProps2()} />
                  <div className="bg-adminbg p-4 rounded-full">
                    <BsCloudUpload className="text-2xl text-scudGreen" />
                  </div>

                  <div className="space-y-3 flex flex-col items-center justify-center">
                    <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                      Click or drag your photo here{" "}
                    </p>
                  </div>
                </>
              </div>
            ) : (
              <div className="border-dashed w-full h-40  rounded-md flex border-2 justify-center  items-center hover:border-scudGreen ">
                <PreviewImage
                  files={vehicleImg}
                  files2={vehicleFile}
                  setFiles={setVehicleImg}
                  setFiles2={setVehicleFile}
                />
              </div>
            )}

            {vehicleImg[1] === undefined ? (
              <div
                {...getRootProps2()}
                className="border-dashed bg-white w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
              >
                <>
                  <input {...getInputProps2()} />
                  <div className="bg-adminbg p-4 rounded-full">
                    <BsCloudUpload className="text-2xl text-scudGreen" />
                  </div>

                  <div className="space-y-3 flex flex-col items-center justify-center">
                    <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                      Click or drag your photo here{" "}
                    </p>
                  </div>
                </>
              </div>
            ) : (
              <div className="border-dashed w-full h-40  rounded-md flex border-2 justify-center  items-center hover:border-scudGreen ">
                <PreviewImage
                  files={vehicleImg}
                  files2={vehicleFile}
                  setFiles={setVehicleImg}
                  setFiles2={setVehicleFile}
                  index={1}
                />
              </div>
            )}

            {vehicleImg[2] === undefined ? (
              <div
                {...getRootProps2()}
                className="border-dashed bg-white w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
              >
                <>
                  <input {...getInputProps2()} />
                  <div className="bg-adminbg p-4 rounded-full">
                    <BsCloudUpload className="text-2xl text-scudGreen" />
                  </div>

                  <div className="space-y-3 flex flex-col items-center justify-center">
                    <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                      Click or drag your photo here{" "}
                    </p>
                  </div>
                </>
              </div>
            ) : (
              <div className="border-dashed w-full h-40  rounded-md flex border-2 justify-center  items-center hover:border-scudGreen ">
                <PreviewImage
                  files={vehicleImg}
                  files2={vehicleFile}
                  setFiles={setVehicleImg}
                  setFiles2={setVehicleFile}
                  index={2}
                />
              </div>
            )}
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
          <Button
            onClick={() =>
              router.push("/admin/driver_mgt/add-driverpages/bank_details")
            }
            text={"Continue"}
          />
        </div>
      </div>
    </div>
  );
};

Vehicle_details.getLayout = Layout;
export default Vehicle_details;
