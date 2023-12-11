import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/base";
import { handleDriverLogin, handleLogin } from "../../features/authSlice";
import {
  goBackSignupLevel,
  handleDriverSignupLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import useFetch from "../../Hooks/useFetch";
import Input from "./Input";
import { Loader } from "./Loader";
import PreviewImage from "./PreviewImage";
import Select from "./Select";
import { getYearsArray } from "../services/yearList";

const VehicleDetails = () => {
  const [loading, setLoading] = useState(false);
  const [pNumber, setPNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [carModel, setCarModel] = useState([]);

  const [licenseImg, setLicenseImg] = useState([null, null, null]);
  const [licenseFile, setLicenseFile] = useState([null, null, null]);

  const [activeindex, setActiveIndex] = useState();

  const [acceptedFiles, setAcceptedFiles] = useState();
  const [acceptedFilesobj, setAcceptedFilesObj] = useState();
  const router = useRouter();
  const query = router?.query;
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userDetails?.id);

  const { fetchData: carBrand } = useFetch(`${BASE_URL}vehicle-brands`);

  const getBrandId = carBrand?.filter((item) => item.name == brand)[0];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchmodel = async () => {
      if (brand == "") {
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
  }, [brand]);
  useEffect(() => {
    let newFiles = [...licenseImg];
    let newFiles2 = [...licenseFile];
    newFiles[activeindex] = acceptedFiles;
    newFiles2[activeindex] = acceptedFilesobj;
    setLicenseImg(newFiles);
    setLicenseFile(newFiles2);
  }, [acceptedFiles, acceptedFilesobj]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(URL.createObjectURL(acceptedFiles[0]));
      setAcceptedFilesObj(acceptedFiles);
    }
  });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(URL.createObjectURL(acceptedFiles[0]));
      setAcceptedFilesObj(acceptedFiles);
    }
  });
  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(URL.createObjectURL(acceptedFiles[0]));
      setAcceptedFilesObj(acceptedFiles);
    }
  });

  //upload vehicle details

  const uploadVehicleDetails = async () => {
    if (
      pNumber === "" ||
      color === "" ||
      brand === "" ||
      year === "" ||
      model === "" ||
      licenseFile.includes(null)
    )
      return enqueueSnackbar("Complete all required fields", {
        variant: "error"
      });

    setLoading(true);
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

    const user_id = userId === null || userId === undefined ? Cookies.get("user_id") : userId;

    const formData = new FormData();
    formData.append("images", licenseFile[0][0]);
    formData.append("images", licenseFile[1][0]);
    formData.append("images", licenseFile[2][0]);
    formData.append("model", model);
    formData.append("frsc_number", pNumber);
    formData.append("color", color);
    formData.append("user_id", Number(user_id));
    formData.append("vehicle_brand_id", +getBrandId?.id); //to be editted
    formData.append("manufacture_date", year); //to be editted
    try {
      const { data } =
        query.resubmission_step !== undefined
          ? await axios.patch(`${BASE_URL}vehicles/${Number(query.doc_id)}`, formData)
          : await axios.post(`${BASE_URL}vehicles`, formData);

      if (data && query.resubmission_step !== undefined) {
        enqueueSnackbar("submitted", {
          variant: "success"
        });
        router.push("/");
      } else if (data) {
        setLoading(false);
        // dispatch(handleSignupLevel(6));
        dispatch(handleDriverSignupLevel(6));
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      uploadVehicleDetails();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", handleKeyPress);
    }
    // Add event listener when the component mounts

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className="bg-white mb-8 animate__fadeIn animate__animated shadow-figma rounded-md w-full md:w-[470px] p-3 md:p-5 ">
      <p className="text-center mb-2 text-lg text-[#1e202a] font-semibold">Sign up as driver</p>
      <p className="text-center text-[#7c7f8a] text-xs mb-5">Upload your vehicle details</p>

      {/* inputs  */}

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <div className="col-span-2 ">
          <p className="text-xs text-textColor/70 mb-1.5">Plate Number</p>
          <Input
            value={pNumber.toUpperCase()}
            onChange={(e) => setPNumber(e.target.value)}
            placeholder={"type here..."}
            inputbg="bg-white"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Vehicle Brand </p>
          <Select
            data={carBrand}
            style={"w-full p-3"}
            positon={"p-4"}
            value={brand}
            colorSelect={true}
            setValue={setBrand}
            dropDownWidth={" w-full mt-1"}
            color=""
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Vehicle Model </p>
          <Select
            data={carModel}
            style={"w-full p-3"}
            positon={"p-4"}
            value={model}
            setValue={setModel}
            dropDownWidth={" w-full mt-1"}
            colorSelect={true}
            color=""
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Year </p>
          <Select
            data={getYearsArray("2000")}
            style={"w-full p-3"}
            positon={"p-4"}
            value={year}
            setValue={setYear}
            dropDownWidth={" w-full mt-1"}
            color=""
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Vehicle Color </p>
          <Select
            data={["Red", "Green", "Blue", "Gray", "Silver", "Black"]}
            style={"w-full p-3"}
            positon={"p-4"}
            value={color}
            setValue={setColor}
            dropDownWidth={" w-full mt-1"}
            color=""
          />
        </div>
      </div>

      {/* upload images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {licenseFile.map((item, idx) => (
          <div
            onClick={(e) => {
              setActiveIndex(idx);
            }}
            onDragEnter={(e) => {
              setActiveIndex(idx);
            }}
          >
            {idx === 0 ? (
              <p className="text-xs text-textColor mb-3">
                {" "}
                Upload the <b className="font-semibold">FRONT</b> view here
              </p>
            ) : idx === 1 ? (
              <p className="text-xs text-textColor mb-3">
                {" "}
                Upload the <b className="font-semibold">BACK</b> view here
              </p>
            ) : (
              <p className="text-xs text-textColor mb-3">
                {" "}
                Upload the <b className="font-semibold">INTERIOR</b> view here
              </p>
            )}
            {item === null ? (
              <>
                {idx === 0 ? (
                  <div
                    key={idx}
                    {...getRootProps()}
                    className="border-dashed w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                  >
                    <>
                      <input {...getInputProps()} />
                      <p>
                        <BsCloudUpload className="text-2xl text-scudGreen" />
                      </p>

                      <div className="space-y-3 flex flex-col items-center justify-center">
                        <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                          Click or drag your photo here{" "}
                        </p>
                      </div>
                    </>
                  </div>
                ) : idx === 1 ? (
                  <div
                    key={idx}
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
                          Click or drag your photo here{" "}
                        </p>
                      </div>
                    </>
                  </div>
                ) : (
                  <div
                    key={idx}
                    {...getRootProps3()}
                    className="border-dashed w-full h-40 rounded-md  space-y-4 border-2 flex flex-col border-gray-300 justify-center p-10  items-center hover:border-scudGreen "
                  >
                    <>
                      <input {...getInputProps3()} />
                      <p>
                        <BsCloudUpload className="text-2xl text-scudGreen" />
                      </p>

                      <div className="space-y-3 flex flex-col items-center justify-center">
                        <p className=" text-xs text-[#9E9FA3] lg:text-sm text-center">
                          Click or drag your photo here{" "}
                        </p>
                      </div>
                    </>
                  </div>
                )}
              </>
            ) : (
              <div
                key={idx}
                className="border-dashed w-full h-40  rounded-md flex border-2 justify-center  items-center hover:border-scudGreen "
              >
                <PreviewImage
                  files={licenseImg}
                  files2={licenseFile}
                  setFiles={setLicenseImg}
                  setFiles2={setLicenseFile}
                  index={idx}
                  signup={true}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* button  */}
      {query.resubmission_step !== undefined ? (
        <div className="flex justify-center mt-3 items-center">
          <button
            onClick={uploadVehicleDetails}
            className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
          >
            {loading ? (
              <div className="justify-center  flex items-center">
                <Loader />
              </div>
            ) : (
              <p> Submit</p>
            )}
          </button>
        </div>
      ) : (
        <div className="flex justify-between space-x-5">
          <button
            onClick={() => dispatch(goBackSignupLevel("driversignup"))}
            className="p-3 my-4 rounded-md text-gray-400 bg-slate-200 text-[12px] px-8 font-semibold  hover:bg-slate-100 w-full "
          >
            Back
          </button>

          <button
            onClick={uploadVehicleDetails}
            className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
          >
            {loading ? (
              <div className="justify-center  flex items-center">
                <Loader />
              </div>
            ) : (
              <p>Continue</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
