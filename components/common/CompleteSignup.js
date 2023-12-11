import React from "react";
import { useEffect } from "react";
import { BsHouseDoor, BsPerson, BsShare } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  goBackSignupLevel,
  handleDriverSignupLevel,
  handleRidersignupLevel,
  handleSignupLevel
} from "../../features/scudSlice";
import Input from "./Input";
import Select from "./Select";
import axios from "axios";
import { useSnackbar } from "notistack";
import { BASE_URL, STATE_URL } from "../../api/base";
import Cookies from "js-cookie";
import useFetch from "../../Hooks/useFetch";
import { Loader } from "./Loader";
import { getToken } from "../services/refresh";
import { useRouter } from "next/router";
import { handleExtraSpace, handleRiderLogin, handleUserProps } from "../../features/authSlice";
import { useDropzone } from "react-dropzone";
import { AiOutlineCamera } from "react-icons/ai";
import Button from "./Button";

const CompleteSignup = ({ rider }) => {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("Gender");
  const [address, setAddress] = React.useState("");
  const [states, setStates] = React.useState("State");
  const [loader, setLoader] = React.useState(false);

  const [profilepic, setProfilePic] = React.useState(null);
  const [profilepicobj, setProfilePicObj] = React.useState(null);

  const code = useSelector((state) => state.auth.referral_code);
  const [referral, setReferral] = React.useState(code);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const genderList = ["male", "female", "other"];
  const dispatch = useDispatch();
  const query = router?.query;

  const { fetchData, loading } = useFetch(STATE_URL);
  const stateList = fetchData?.map((item) => item.name);

  const selectedState = fetchData?.filter((item) => item.name === states)[0]?.id;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
      setProfilePicObj(acceptedFiles);
    }
  });

  const uploadAvatar = async () => {
    const formdata = new FormData();
    profilepicobj !== null && formdata.append("image", profilepicobj[0]);
    try {
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "multipart/form-data";
      const { data } = await axios.patch(`${BASE_URL}auth/picture`, formdata);

      if (data) {
        dispatch(handleUserProps(data));
        enqueueSnackbar(`Profile updated Successfully`, {
          variant: "success"
        });
        if (query.resubmission_step !== undefined && query.user_resubmission_phone == undefined) {
          enqueueSnackbar("submitted", {
            variant: "success"
          });
          router.push("/");
        } else if (rider !== undefined) {
          router.push("/rider_profile");
          dispatch(handleRiderLogin(true));
          Cookies.set("user_id", data?.id, { expires: 30 });
          dispatch(handleRidersignupLevel(1));
          // if (typeof window !== "undefined") {
          //   if (typeof window?.Android !== "undefined") {
          //     onSuccess();
          //   }
          // }
        } else {
          Cookies.set("user_id", data?.id, { expires: 30 });
          dispatch(handleDriverSignupLevel(4));
        }
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg?.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      } else {
        enqueueSnackbar(`Picture not uploaded. Try again`, {
          variant: "error"
        });
      }
    }
  };

  const updateProfile = async () => {
    try {
      setLoader(true);
      const url = BASE_URL + "auth/profile";
      const dataform = {
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
        address,
        state_id: +selectedState,
        provider: "phone",
        referral
      };
      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(url, dataform);
      if (data) {
        //when successful upload avatar
        uploadAvatar();
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        setLoader(false);
        enqueueSnackbar(err.response?.data?.message, {
          variant: "error"
        });
      } else {
        enqueueSnackbar(err.message, {
          variant: "error"
        });
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateProfile();
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

  const disable =
    profilepicobj === null ||
    states === "State" ||
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    gender === "Gender" ||
    address === ""
      ? true
      : false;

  const goBackPayload = rider ? "ridersignup" : "driversignup";

  return (
    <div className="bg-white  animate__fadeIn animate__animated shadow-figma mb-10 -mt-4 rounded-xl w-full md:w-[500px] p-3 md:p-4">
      <p className="text-center text-lg text-[#1e202a] font-semibold">
        {rider === undefined ? "Sign up as driver" : "Sign up as rider "}
      </p>
      <p className="text-center text-sm text-[#7c7f8a] mb-5">Profile Information</p>
      <div className="mt-4 flex justify-center items-center">
        {profilepicobj === null ? (
          <div className=" bg-[#E6EBFF] flex h-16 w-16 md:h-20 md:w-20 justify-center items-center rounded-full">
            <div {...getRootProps()}>
              <AiOutlineCamera className="text-white bg-scudGreen text-xl rounded-full p-1 relative   cursor-pointer hover:text-[#ececec]" />
              <input {...getInputProps()} type="file" className="hidden" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={profilepic} className="md:w-20  h-16 w-16 md:h-20 rounded-full" alt="" />
            <div {...getRootProps()}>
              <AiOutlineCamera className="text-white -mt-6 ml-12 md:ml-14 absolute bg-scudGreen text-base md:text-xl rounded-full  p-1  cursor-pointer hover:text-[#ececec]" />
              <input {...getInputProps()} type="file" className="hidden" />
            </div>
          </div>
        )}
      </div>
      <p className="text-textColor/40 text-xs text-center mt-2 mb-6">Upload Profile Image</p>
      <div className="grid w-full gap-3  ">
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">First Name</p>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // placeholder={"First Name"}
            Icon={BsPerson}
            inputbg="bg-white"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Last Name</p>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // placeholder={"Last Name"}
            Icon={BsPerson}
            inputbg="bg-white"
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Your Email Address</p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder={"Last Name"}
            Icon={MdOutlineMailOutline}
            inputbg="bg-white"
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Select Gender </p>
          <Select
            data={genderList}
            style={"w-full p-3"}
            position={"p-4"}
            value={gender}
            setValue={setGender}
            dropDownWidth={" w-full mt-1"}
            color=""
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Select State </p>
          <Select
            data={stateList}
            search={true}
            style={"w-full  p-3"}
            positon={"p-4"}
            value={states}
            setValue={setStates}
            dropDownWidth={" w-full mt-1"}
            color=""
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5"> Address</p>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            Icon={BsHouseDoor}
            inputbg="bg-white"
            onFocus={() => dispatch(handleExtraSpace(true))}
            onBlur={() => dispatch(handleExtraSpace(false))}
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-textColor/70 mb-1.5">Referral</p>
          <Input
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            Icon={BsShare}
            inputbg="bg-white"
            onFocus={() => dispatch(handleExtraSpace(true))}
            onBlur={() => dispatch(handleExtraSpace(false))}
          />
        </div>
      </div>
      {query.resubmission_step !== undefined ? (
        <div className="w-full mt-3 flex justify-center items-center">
          <Button
            disabled={disable}
            style={"w-full"}
            text={"Continue"}
            loading={loader}
            onClick={updateProfile}
          />
        </div>
      ) : (
        <div className="w-full mt-3 items-center flex space-x-4">
          <button
            onClick={() => dispatch(goBackSignupLevel(goBackPayload))}
            className="py-2 hover:bg-gray-100 w-full text-textColor bg-[#f2f5ff] rounded-md"
          >
            Back
          </button>
          <Button
            disabled={disable}
            style={"w-full"}
            text={"Continue"}
            loading={loader}
            onClick={updateProfile}
          />
          {/* <button
          // onClick={() => dispatch(handleSignupLevel())}
          onClick={updateProfile}
          className="py-2 w-full hover:bg-scudGreen/50 text-white bg-scudGreen rounded-md"
        >
          {loader ? (
            <div className="justify-center  flex items-center">
              <Loader />
            </div>
          ) : (
            <p> Continue</p>
          )}
        </button> */}
        </div>
      )}
    </div>
  );
};

export default CompleteSignup;
