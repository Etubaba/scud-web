import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsCheck2Circle, BsCloudUpload } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { HiOutlineDocumentText } from "react-icons/hi";
import Layout from "../../components/driver_layout/Layout";
import { useDropzone } from "react-dropzone";
import "animate.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../../components/common/Button";
import { MdDeleteOutline } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import CustomSlide from "../../components/slider/CustomSlide";
import Modal from "../../components/common/Modal";
import { carColor, carYear } from "../../dummy";
import Select from "../../components/common/Select";
import PreviewImage from "../../components/common/PreviewImage";
import { BASE_URL } from "../../api/base";
import { useSelector } from "react-redux";
import DatePicker from "../../components/common/DatePicker";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { validateToken } from "../../components/services/validateToken";

function Document({ license, vehicle, vehicleList }) {
  const [congratModal, setCongratModal] = useState(false);
  const [opendoc1, setOpenDoc1] = useState(false);
  const [frsc, setFrsc] = useState(false);
  const [opendoc2, setOpenDoc2] = useState(false);
  const [files, setFiles] = useState([null, null]);
  const [files2, setFiles2] = useState([null, null]);
  const [vehicleImg, setVehicleImg] = useState([]);
  const [vehicleFile, setVehicleFile] = useState([]);

  //vehicle states
  const [license_num, setLicense_num] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("Select Model");
  const [year, setYear] = useState("Select Year");
  const [color, setColor] = useState("Select Color");
  const [frsc_num, setFrsc_num] = useState("");
  const [carModel, setCarModel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [vehicle_editable, setVehicle_editable] = useState(false);
  const [date, setDate] = useState("");

  const getBrandId = vehicleList.filter((item) => item.name == vehicleBrand)[0];

  // console.log("license", license);
  // console.log("vehicle", vehicle);

  useEffect(() => {
    if (vehicle?.statusCode === undefined) {
      console.log("..//");
      setFrsc_num(vehicle.frsc_number);
      setColor(vehicle.color);
      setVehicleModel(vehicle.model);
      setYear(new Date(vehicle?.manufacture_date).getFullYear());
      setVehicleBrand(vehicle?.vehicle_brand?.name);
    }
  }, [vehicle?.frsc_number]);

  useEffect(() => {
    const fetchmodel = async () => {
      if (vehicleBrand == "") {
        null;
      } else {
        const token = Cookies.get("accessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "multipart/form-data";
        const { data } = await axios.get(BASE_URL + `vehicle-models/brand/${getBrandId.id}`);
        setCarModel(data);
      }
    };

    fetchmodel();
  }, [vehicleBrand]);

  const router = useRouter();
  const carPreview = vehicle?.images;

  const user = useSelector((state) => state.auth.userDetails);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => [URL.createObjectURL(acceptedFiles[0]), prevState[1]]);

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        if (files2.length >= 3) {
          return;
        } else {
          setFiles2((prevState) => [loopedFile, prevState[1]]);
        }
      }
    }
  });

  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => [prevState[0], URL.createObjectURL(acceptedFiles[0])]);

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        if (files2.length >= 3) {
          return;
        } else {
          setFiles2((prevState) => [prevState[0], loopedFile]);
        }
      }
    }
  });

  //getRootprops for vehicle image upload
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setVehicleImg((prevState) => [...prevState, URL.createObjectURL(acceptedFiles[0])]);

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        if (vehicleFile.length >= 3) {
          return;
        } else {
          setVehicleFile((prevState) => [...prevState, loopedFile]);
        }
      }
    }
  });

  const handleRemovetag = (e) => {
    if (e == 0) {
      setFiles((prevState) => [null, prevState[1]]);
      setFiles2((prevState) => [null, prevState[1]]);
    } else {
      setFiles((prevState) => [prevState[0], null]);
      setFiles2((prevState) => [prevState[0], null]);
    }

    setFiles(newArr);
    setFiles2(newArr2);
  };

  const frontId = (
    <div>
      <div className="">
        <img src={files[0]} className="rounded object-contain mb-2 max-w-full h-[150px]" />
        <div onClick={() => handleRemovetag(0)} className="flex  justify-center items-center">
          <div className="flex justify-center relative bottom-[0px] items-center space-x-1 cursor-pointer hover:bg-gray-300 text-red-400 bg-gray-100 p-[2px] w-fit rounded-md">
            <MdDeleteOutline className="text-[18px] mt-1   " />
            <p className="">Remove photo</p>
          </div>
        </div>
      </div>
    </div>
  );

  const backId = (
    <div>
      <div className="">
        <img src={files[1]} className="rounded object-contain mb-2 max-w-full h-[150px]" />
        <div onClick={() => handleRemovetag(1)} className="flex  justify-center items-center ">
          <div className="flex justify-center items-center relative bottom-[0px] space-x-1 cursor-pointer hover:bg-gray-300 text-red-400 bg-gray-100 p-[2px] w-fit rounded-md">
            <MdDeleteOutline className="text-[18px] mt-1   " />
            <p className="">Remove photo</p>
          </div>
        </div>
      </div>
    </div>
  );

  function check_value(value) {
    return value % 2 == 0 ? true : false;
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  //upload vehicle details

  const updateVehicleDetails = async () => {
    if (
      color === "" ||
      vehicleBrand === "" ||
      year === "" ||
      vehicleModel === "" ||
      vehicleFile.length < 3
    )
      return enqueueSnackbar("Complete all required fields", {
        variant: "error"
      });

    setLoading(true);
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

    const formData = new FormData();
    formData.append("images", vehicleFile[0]);
    formData.append("images", vehicleFile[1]);
    formData.append("images", vehicleFile[2]);
    formData.append("model", vehicleModel);
    formData.append("frsc_number", frsc_num);
    formData.append("color", color);
    formData.append("user_id", user.id);
    formData.append("vehicle_brand_id", getBrandId.id);
    formData.append("manufacture_date", new Date(year)); //to be editted
    try {
      const { data } = await axios.patch(`${BASE_URL}vehicles/${vehicle.id}`, formData);

      if (data) {
        enqueueSnackbar("Vehicle details update completed", {
          variant: "success"
        });

        setFrsc(true);
        setLoading(false);
        refreshData();
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };

  //upload license

  const updateLicenseUpload = async () => {
    if (files2.length < 2)
      return enqueueSnackbar("Upload all required image", {
        variant: "error"
      });
    setLoading(true);
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

    const formData = new FormData();
    formData.append("images", files2[0]);
    formData.append("images", files2[1]);
    formData.append("license_number", license_num);
    formData.append("expiry", date);
    formData.append("user_id", user.id);

    try {
      const { data } = await axios.post(`${BASE_URL}licenses`, formData);

      if (data) {
        setLoading(false);
        setCongratModal(true);
        refreshData();
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      }
    }
  };

  if (congratModal) {
    setTimeout(() => setCongratModal(false)), 4000;
  }

  const dateObj = new Date().toISOString();
  const min = dateObj.slice(0, 10);

  return (
    <div className="pt-5">
      <div className="flex justify-end">
        <p className="text-scudGreen font-semibold">Step 1/2</p>
      </div>
      <div className="flex flex-col justify-center my-10 items-center">
        <p className="text-xl text-title font-semibold">Complete Profile Setup</p>
        <p className="text-center text-sm text-textColor">
          We will review your documents and update you on the status, this would take upto 24 hours
        </p>
      </div>

      {/* First document section ########################################*/}
      <div className="rounded-md   my-5 border  border-scudGreen shadow-sm w-full">
        <div className="md:flex justify-between p-5 space-y-3 ">
          <div className=" flex space-x-4">
            <div className="p-2 rounded-full w-8 h-8 bg-scudGreen">
              <HiOutlineDocumentText className="text-white" />
            </div>
            <p className="mt-1 font-medium">Driver's Lincense</p>
          </div>
          <div className="flex justify-between space-x-3">
            {license.verification === "pending" || license.verification === "declined" ? (
              <div className="flex space-x-1 justify-center items-center p-1 rounded-md bg-[#fff4f4]">
                <FcCancel className="" />
                <p className="text-xs text-red-600">Not Verified</p>
              </div>
            ) : (
              <div className="flex space-x-1 justify-center items-center p-1 rounded-md bg-[#f2fbf6]">
                <BsCheck2Circle className="text-green-700" />
                <p className="text-xs text-green-700">Verified</p>
              </div>
            )}
            {opendoc1 ? (
              <button
                onClick={() => {
                  setOpenDoc1(false);
                }}
                className="p-1  flex rounded-md text-scudGreen text-[15px]  font-semibold  hover:bg-[#dce2f8] "
              >
                <IoIosCloseCircleOutline className="mt-1 " /> &nbsp; Close
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenDoc1(true);
                }}
                className="p-1  flex rounded-md text-scudGreen text-[15px]  font-semibold  hover:bg-[#dce2f8] "
              >
                <BiEdit className="mt-1 " /> &nbsp; Edit
              </button>
            )}
          </div>
        </div>
        {/* Uploader seection ############################################################### */}
        {opendoc1 && (
          <React.Fragment>
            <div className="md:p-6 w-full border-t border-t-scudGreen animate__animated animate__fadeIn">
              {!editable && license.statusCode === undefined ? (
                <div>
                  <p className="text-center text-sm my-3 md:text-[18px] font-semibold">
                    Front and Back view of your driver's license
                  </p>
                  <div className="flex md:flex-row flex-col justify-center items-center ">
                    <div className="md:w-1/2 my-8 mx-4 md:mx-10">
                      <p className="my-5 text-sm">
                        <span className="font-semibold">FRONT</span> view
                      </p>
                      <div>
                        <img
                          src={license?.front_image}
                          className="rounded object-contain mb-2 max-w-full h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 my-8 mx-4 md:mx-10">
                      <p className="my-5 text-sm">
                        <span className="font-semibold">Back</span> View
                      </p>
                      <div>
                        <img
                          src={license?.back_image}
                          className="rounded object-contain mb-2 max-w-full h-[150px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-5 px-4 md:px-10 space-y-2">
                    <label className="text-sm font-semibold">Lincense Number</label>
                    <input
                      disabled={true}
                      defaultValue={license.license_number}
                      type={"text"}
                      className="border-[1px]  rounded-md outline-0 w-full p-1.5 border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col mb-5 px-4 md:px-10 space-y-2">
                    <label className="text-sm font-semibold">Expiration Date</label>
                    <DatePicker
                      disable={true}
                      value={new Date(license.expiry).toLocaleDateString("en-US")}
                    />
                  </div>
                  <div className="flex w-full md:my-0 my-4 justify-end items-end">
                    <span
                      onClick={() => {
                        license.verification === "pending"
                          ? setEditable(!editable)
                          : enqueueSnackbar("You cannot edit verified license", {
                              variant: "info"
                            });
                      }}
                      className="flex items-center md:mr-0 mr-2 space-x-1 hover:text-scudGreen/30 text-scudGreen"
                    >
                      <BiEdit className=" " />
                      <p className="md:text-base text-xs">Edit license</p>
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center text-sm px-4 my-3 md:text-[18px] font-semibold">
                    Upload a cleared picture of the Front and Back of your driver's lincense
                  </p>
                  {/* Uploaders ####################################### */}
                  <div className="md:flex ">
                    <div className="md:w-1/2 my-8 mx-4 md:mx-10">
                      <p className="my-5 text-sm">
                        Upload the <span className="font-semibold">FRONT</span> view here
                      </p>
                      {/* first uploader ######################################### */}
                      {files[0] !== null ? (
                        <div
                          div
                          className="border-dashed w-full h-60 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                        >
                          {frontId}
                        </div>
                      ) : (
                        <div
                          {...getRootProps()}
                          className="border-dashed w-full h-60 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
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
                      )}
                    </div>

                    {/* second upload space ######################################### */}
                    <div className="md:w-1/2 my-8 mx-4 md:mx-10">
                      <p className="my-5 text-sm">
                        Upload the <span className="font-semibold">BACK</span> view here
                      </p>
                      {files[1] !== null ? (
                        <div className="border-dashed w-full h-60 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen ">
                          {backId}
                        </div>
                      ) : (
                        <div
                          {...getRootProps3()}
                          className="border-dashed w-full h-60 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                        >
                          <>
                            <input {...getInputProps3()} />
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
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col mb-5 px-4 md:px-10 space-y-2">
                    <label className="text-sm font-semibold">Lincense Number</label>
                    <input
                      value={license_num}
                      onChange={(e) => setLicense_num(e.target.value)}
                      type={"text"}
                      className="border-[1px]  rounded-md outline-0 w-full p-1.5 border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col mb-5 px-4 md:px-10 space-y-2">
                    <label className="text-sm font-semibold">Expiration Date</label>
                    <DatePicker value={date} onChange={(e) => setDate(e.target.value)} min={min} />
                  </div>

                  <div
                    className={` md:px-10 px-4 w-full  flex ${
                      license !== undefined ? "justify-between" : "justify-end"
                    }  my-3 md:my-0`}
                  >
                    {license !== undefined && (
                      <button
                        onClick={() => setEditable(!editable)}
                        className="border text-sm text-red-600 rounded-md border-red-600 px-6 py-1"
                      >
                        Back
                      </button>
                    )}

                    <Button
                      onClick={updateLicenseUpload}
                      loading={loading}
                      style={"lg:px-5  font-semibold"}
                      text={"Update"}
                    />
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
      {/* Second document section ########################################## */}
      <div className="rounded-md   my-5 border  border-scudGreen shadow-sm w-full">
        <div className="md:flex justify-between space-y-3 p-5 ">
          <div className=" flex space-x-4">
            <div className="p-2 rounded-full w-8 h-8 bg-scudGreen">
              <FaCarSide className="text-white " />
            </div>
            <p className="mt-1 font-medium">Vehicle Information</p>
          </div>
          <div className="flex justify-between space-x-3">
            {vehicle.verification === "pending" || vehicle.verification === "declined" ? (
              <div className="flex space-x-1 justify-center items-center p-1 rounded-md bg-[#fff4f4]">
                <FcCancel className="" />
                <p className="text-xs text-red-600">Not Verified</p>
              </div>
            ) : (
              <div className="flex space-x-1 justify-center items-center p-1 rounded-md bg-[#f2fbf6]">
                <BsCheck2Circle className="text-green-700" />
                <p className="text-xs text-green-700">Verified</p>
              </div>
            )}
            {opendoc2 ? (
              <button
                onClick={() => {
                  setOpenDoc2(false);
                }}
                className="p-1  flex rounded-md text-scudGreen text-[15px]  font-semibold  hover:bg-[#dce2f8] "
              >
                <IoIosCloseCircleOutline className="mt-1 " /> &nbsp; Close
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenDoc2(true);
                }}
                className="p-1  flex rounded-md text-scudGreen text-[15px]  font-semibold  hover:bg-[#dce2f8] "
              >
                <BiEdit className="mt-1 " /> &nbsp; Edit
              </button>
            )}
          </div>
        </div>
        {/* Search seection ############################################################### */}
        {opendoc2 && (
          <div className="md:px-16 px-4 py-10 w-full border-t border-t-scudGreen animate__animated animate__fadeIn">
            {!frsc && (
              <div>
                <div className="mb-6">
                  <p className="text-xs mb-3 text-textColor"> FRSC Number </p>
                  <input
                    value={frsc_num}
                    onChange={(e) => setFrsc_num(e.target.value)}
                    placeholder="FRSC Number"
                    type="text"
                    className="border-[0.6px] bg-adminbg w-full placeholder:text-xs   focus:border-scudGreen focus:outline-none outline-none focus:ring-1 focus:ring-scudGreen rounded-md px-2 py-2"
                  />
                </div>

                <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
                  <div className="col-span-1">
                    <p className="text-xs mb-3 text-textColor"> Vehicle Brand </p>
                    <Select
                      data={vehicleList}
                      style={"w-full p-3"}
                      positon={"p-4 "}
                      value={vehicleBrand}
                      setValue={setVehicleBrand}
                      colorSelect={true}
                      dropDownWidth={"w-[18.5rem] absolute  md:w-[27rem] md:bottom-[-19.5rem] "}
                      search={true}
                      color=""
                    />
                  </div>
                  <div className="col-span-1">
                    <p className="text-xs mb-3 text-textColor"> Vehicle Model </p>
                    <Select
                      data={carModel}
                      position={"p-4"}
                      style={"w-full p-3"}
                      colorSelect={true}
                      positon={"p-4 "}
                      value={vehicleModel}
                      setValue={setVehicleModel}
                      dropDownWidth={"w-[18.5rem]  md:w-[27rem] md:bottom-[-21.5rem]  "}
                      search={true}
                      color=""
                    />
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs mb-3 text-textColor">Vehicle Year</p>
                    <Select
                      data={carYear}
                      style={"w-full p-3"}
                      positon={"p-4"}
                      value={year}
                      setValue={setYear}
                      dropDownWidth={
                        "w-[18.5rem] md:w-[27rem] md:bottom-[8rem]  lg:bottom-[-22.5rem]"
                      }
                      search={true}
                      color=""
                    />
                  </div>

                  <div className="col-span-1">
                    <p className="text-xs mb-3 text-textColor">Vehicle Color</p>
                    <Select
                      data={carColor}
                      style={"w-full p-3"}
                      positon={"p-4 "}
                      value={color}
                      setValue={setColor}
                      colorSelect={true}
                      other={true}
                      dropDownWidth={
                        "w-[18.5rem]  md:w-[27rem] md:bottom-[8rem]  lg:bottom-[-20.3rem]"
                      }
                      search={true}
                      color=""
                    />
                  </div>
                </div>
                {/* drag and drop for vehicle images */}
                {!vehicle_editable && vehicle.statusCode === undefined ? (
                  <div className="flex md:flex-row justify-center items-center flex-col space-y-8 md:space-y-0 md:space-x-5 my-5 md:my-10">
                    {vehicle?.images?.map((item, idx) => (
                      <div key={idx}>
                        <img
                          src={item}
                          className="rounded object-contain mb-2 max-w-full h-[150px]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 md:space-x-5 my-5 md:my-10">
                    {vehicleImg[0] === undefined ? (
                      <div
                        {...getRootProps2()}
                        className="border-dashed w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                      >
                        <>
                          <input {...getInputProps2()} />
                          <p>
                            <BsCloudUpload className="text-2xl text-scudGreen" />
                          </p>

                          <div className="space-y-3 flex flex-col items-center justify-center">
                            <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                              Click or drag your photo here
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
                        className="border-dashed w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                      >
                        <>
                          <input {...getInputProps2()} />
                          <p>
                            <BsCloudUpload className="text-2xl text-scudGreen" />
                          </p>

                          <div className="space-y-3 flex flex-col items-center justify-center">
                            <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                              Click or drag your photo here
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
                        className="border-dashed w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                      >
                        <>
                          <input {...getInputProps2()} />
                          <p>
                            <BsCloudUpload className="text-2xl text-scudGreen" />
                          </p>

                          <div className="space-y-3 flex flex-col items-center justify-center">
                            <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                              Click or drag your photo here
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
                )}

                {!vehicle_editable && (
                  <div className="flex w-full md:my-0 my-4 justify-end items-end">
                    <span
                      onClick={() => {
                        vehicle?.verification === "pending" || vehicle.statusCode !== undefined
                          ? setVehicle_editable(!vehicle_editable)
                          : enqueueSnackbar("You cannot edit verified Vehicle", {
                              variant: "info"
                            });
                      }}
                      className="flex items-center md:mr-0 mr-2 space-x-1 hover:text-scudGreen/30 text-scudGreen"
                    >
                      <BiEdit className=" " />
                      <p className="md:text-base text-xs">Edit Vehicle</p>
                    </span>
                  </div>
                )}

                {vehicle_editable && (
                  <div className=" w-full flex md:flex-row flex-col  md:px-10 px-4 justify-between items-center">
                    {license !== undefined && (
                      <button
                        onClick={() => setVehicle_editable(!vehicle_editable)}
                        className="border w-full md:w-[120px] md:mb-0 mb-4 text-sm text-red-600 rounded-md border-red-600 px-6 py-1"
                      >
                        Back
                      </button>
                    )}

                    <Button
                      loading={loading}
                      onClick={updateVehicleDetails}
                      style={" w-full md:w-[120px] font-semibold"}
                      text={"Submit"}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 33##################################################################################### */}
            {frsc && (
              <div className="w-full">
                <div className="md:flex w-full">
                  <div className="md:w-1/2  my-8  mx-4 ">
                    <div className="border-solid   h-60 rounded-md  space-y-4 border flex flex-col border-gray-300 justify-center p-10  items-center ">
                      {/* vehicle information slider ########################################################## */}
                      <CustomSlide
                        isImage={true}
                        preview={carPreview}
                        items={[
                          carPreview?.map((data, index) => [
                            <div
                              key={index}
                              className={
                                check_value(index)
                                  ? ` max-w-[50%]  text-[12px] w-[400px] animate__animated animate__zoomIn pb-2  rounded-md   `
                                  : " max-w-[50%]   text-[12px] w-[400px] animate__animated animate__fadeIn pb-2 rounded-md   "
                              }
                            >
                              <img
                                src={data}
                                alt=""
                                loading="lazy"
                                className="w-full rounded-md h-40"
                              />
                            </div>
                          ])
                        ]}
                      />
                    </div>
                  </div>

                  {/* second  space ######################################### */}
                  <div className="md:w-full  my-8 mx-4 ">
                    <div className="border-solid w-full md:w-[310px] lg:w-[400px] h-60 rounded-md  space-y-4 border flex flex-col border-gray-300 justify-center p-10  ">
                      <p className=" text-xl my-3 text-left">Vehicle Information</p>

                      <div className="grid grid-cols-2 gap-2 lg:gap-3">
                        <div className="">
                          <p className="text-sm">FRSC number:</p>
                        </div>
                        <div className="flex space-x-2">
                          <p className="text-sm font-medium">{vehicle.frsc_number}</p>
                        </div>
                        <div className="">
                          <p className="text-sm">Car Brand:</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nisan</p>
                        </div>
                        <div className="">
                          <p className="text-sm">Car Model:</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{vehicle.model}</p>
                        </div>
                        <div>
                          <p className="text-sm">Car Color:</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{vehicle.color}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-[96%] my-3 md:my-0 flex justify-end">
                  <Button
                    onClick={() => {
                      setCongratModal(true);
                    }}
                    style={"lg:px-8  font-semibold"}
                    text={"Submite for verification"}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Congratulation modal ############################################################### */}
      <Modal congrat={true} onClose={() => setCongratModal(false)} open={congratModal}>
        <div className="md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <BsCheck2Circle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Your documents has been submitted</p>
            <p className="text-sm text-textColor mt-2">We'll review them and update you </p>
          </div>
          {/* <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              Cancel
            </button>
            <Button text={"Yes, Delete"} />
          </div> */}
        </div>
      </Modal>
    </div>
  );
}

Document.getLayout = Layout;
export default Document;
export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  try {
    const [licenseRes, vehicleRes, vehicleListRes] = await Promise.all([
      fetch(`${BASE_URL}licenses/find/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }),
      fetch(`${BASE_URL}vehicles/find/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }),
      fetch(`${BASE_URL}vehicle-brands`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [license, vehicle, vehicleList] = await Promise.all([
      licenseRes.json(),
      vehicleRes.json(),
      vehicleListRes.json()
    ]);

    if (
      (license?.statusCode !== undefined && license?.statusCode === 401) ||
      (vehicle.statusCode !== undefined && vehicle.statusCode === 401) ||
      vehicleList.statusCode === 401
    ) {
      try {
        await validateToken(context);
      } catch (err) {
        return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
      }
    }

    return { props: { license, vehicle, vehicleList } };
  } catch (err) {
    console.log(err);
    return { props: { lincense: undefined, vehicle: undefined } };
  }
}
