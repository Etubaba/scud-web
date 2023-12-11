import React from "react";
import Layout from "../../../../components/Admin/Layout";
import Stepper from "../../../../components/admincomponents/Stepper";
import { useDropzone, Dropzone } from "react-dropzone";
import { useState } from "react";
import PreviewImage from "../../../../components/common/PreviewImage";
import { BsCloudUpload } from "react-icons/bs";
import Button from "../../../../components/common/Button";
import { useRouter } from "next/router";

const Upload = () => {
  const [licenseImg, setLicenseImg] = useState([]);
  const [licenseFile, setLicenseFile] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setLicenseImg((prevState) => [
        ...prevState,
        URL.createObjectURL(acceptedFiles[0]),
      ]);

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        if (licenseFile.length >= 2) {
          return;
        } else {
          setLicenseFile((prevState) => [...prevState, loopedFile]);
        }
      }
    },
  });
  const router = useRouter();
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
      <Stepper level={2} />
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md  md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Upload Driver's License</p>

          <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 md:space-x-5 my-5 md:my-5">
            {licenseImg[0] === undefined ? (
              <div
                {...getRootProps()}
                className="border-dashed bg-white w-full h-48 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
              >
                <>
                  <input {...getInputProps()} />

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
                  files={licenseImg}
                  files2={licenseFile}
                  setFiles={setLicenseImg}
                  setFiles2={setLicenseFile}
                />
              </div>
            )}

            {licenseImg[1] === undefined ? (
              <div
                {...getRootProps()}
                className="border-dashed bg-white w-full h-48 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
              >
                <>
                  <input {...getInputProps()} />
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
                  files={licenseImg}
                  files2={licenseFile}
                  setFiles={setLicenseImg}
                  setFiles2={setLicenseFile}
                  index={1}
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
              router.push("/admin/driver_mgt/add-driverpages/add_driver")
            }
            className="bg-white  min-w-[102px] border hover:bg-slate-50 px-4 py-[7.5px] rounded-md text-sm  mr-2"
          >
            Back
          </button>
          <Button
            onClick={() =>
              router.push("/admin/driver_mgt/add-driverpages/vehicle_details")
            }
            text={"Continue"}
          />
        </div>
      </div>
    </div>
  );
};

Upload.getLayout = Layout;

export default Upload;
