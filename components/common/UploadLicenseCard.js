import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/base";
import {
  goBackSignupLevel,
  handleDriverSignupLevel,
  handleRidersignupLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import { getToken } from "../services/refresh";
import DatePicker from "./DatePicker";
import Input from "./Input";
import { Loader } from "./Loader";
import PreviewImage from "./PreviewImage";
import { handleExtraSpace } from "../../features/authSlice";

const UploadLicense = () => {
  const [licenseImg, setLicenseImg] = useState([null, null]);
  const [licenseFile, setLicenseFile] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  const [activeindex, setActiveIndex] = useState();
  const [acceptedFiles, setAcceptedFiles] = useState();
  const [acceptedFilesobj, setAcceptedFilesObj] = useState();

  const [licenseNum, setLicenseNum] = useState("");
  const [expiration, setExpiration] = useState("");

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const query = router?.query;

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    console.log(acceptedFiles, "acceptedFiles");
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

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userDetails?.id);
  const user_id = userId === null || userId === undefined ? Cookies.get("user_id") : userId;

  const handleUpload = async () => {
    if (licenseFile.includes(null))
      return enqueueSnackbar("Upload all required image", {
        variant: "error"
      });
    setLoading(true);
    const token = Cookies.get("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

    const formData = new FormData();
    formData.append("images", licenseFile[0][0]);
    formData.append("images", licenseFile[1][0]);
    formData.append("license_number", licenseNum);
    formData.append("expiry", expiration);
    formData.append("user_id", user_id);

    try {
      const { data } =
        query.resubmission_step !== undefined
          ? await axios.patch(`${BASE_URL}licenses/${Number(query.doc_id)}`, formData)
          : await axios.post(`${BASE_URL}licenses`, formData);

      if (data && query.resubmission_step !== undefined) {
        enqueueSnackbar("submitted", {
          variant: "success"
        });
        router.push("/");
      } else if (data) {
        setLoading(false);
        dispatch(handleDriverSignupLevel(5));
        // dispatch(handleSignupLevel(5));
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
      handleUpload();
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

  const dateObj = new Date().toISOString();
  const min = dateObj.slice(0, 10);

  return (
    <div className="md:bg-white -mt-4 md:mb-7 animate__fadeIn animate__animated shadow-figma rounded-md w-full md:w-[470px] p-3 md:p-5 ">
      <p className="text-center mb-2 text-lg text-[#1e202a] font-semibold">Sign up as driver</p>
      <p className="text-center text-[#7c7f8a] text-xs mb-5">Upload your driver's license</p>
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-4">
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
            ) : (
              <p className="text-xs text-textColor mb-3">
                {" "}
                Upload the <b className="font-semibold">BACK</b> view here
              </p>
            )}
            {item === null ? (
              idx == 0 ? (
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
              ) : (
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
              )
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

      <div className="my-4">
        <p className="text-xs text-textColor/70 mb-1.5">License Number</p>
        <Input
          value={licenseNum}
          onChange={(e) => setLicenseNum(e.target.value)}
          inputbg="bg-white"
          onFocus={() => dispatch(handleExtraSpace(true))}
          onBlur={() => dispatch(handleExtraSpace(false))}
        />
      </div>

      <div className="my-4">
        <p className="text-xs text-textColor/70 mb-1.5">Expiration Date</p>
        <DatePicker onChange={(e) => setExpiration(e.target.value)} value={expiration} min={min} />
        {/* <Input
               value={licenseNum}
               onChange={(e) => setLicenseNum(e.target.value)}
               inputbg="bg-white"
            /> */}
      </div>

      {query.resubmission_step !== undefined ? (
        <div className="flex justify-center mt-3 items-center">
          <button
            onClick={handleUpload}
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
            onClick={handleUpload}
            className="p-3 my-4 rounded-md text-scudGray text-[12px] px-8 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
          >
            {loading ? (
              <div className="justify-center  flex items-center">
                <Loader />
              </div>
            ) : (
              <p> Continue</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadLicense;
