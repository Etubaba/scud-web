import React from "react";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/common/Button";
import NumberSelect from "../../components/common/NumberSelect";
import Layout from "../../components/riderLayout/Layout";
import "animate.css";
import { Loader } from "../../components/common/Loader";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getToken } from "../../components/services/refresh";
import { handleUserProps } from "../../features/authSlice";
import { useDropzone, Dropzone } from "react-dropzone";

const Profile = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.auth.userDetails);
  const [emailDisabler, setEmailDisabler] = useState(true);
  const [defaultemail, setDefaultEmail] = useState(userDetails?.email);
  const [loader, setLoader] = useState(false);
  const [profilepic, setProfilePic] = useState(userDetails.picture);
  const [profilepicobj, setProfilePicObj] = useState(null);

  //  email field onchange function ############################################################

  const handleUpdateEmail = (e) => {
    setDefaultEmail(e.target.value);
  };

  // Function for updating email ############################################################
  const EmailUpdate = async () => {
    const formdata = new FormData();
    profilepicobj !== null && formdata.append("image", profilepicobj[0]);

    try {
      if (defaultemail === "") {
        return enqueueSnackbar("field can't be empty", {
          variant: "error"
        });
      }
      setLoader(true);
      const url = BASE_URL + "auth/profile";
      const url2 = BASE_URL + "auth/picture";

      const token = Cookies.get("accessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      defaultemail !== defaultemail &&
        (await axios
          .patch(url, {
            email: defaultemail
          })
          .then((res) => {
            console.log(res);

            if (res.data) {
              enqueueSnackbar(`profile updated`, {
                variant: "success",
                id: 1
              });
              dispatch(handleUserProps(res.data));
              setEmailDisabler(true);
              setLoader(false);
            }
          }));
      profilepicobj !== null &&
        (await axios.patch(url2, formdata).then((res) => {
          console.log(res);

          if (res.data) {
            enqueueSnackbar(`profile updated`, {
              variant: "success",
              id: 1
            });

            dispatch(handleUserProps(res.data));
            setEmailDisabler(true);
            setLoader(false);
          }
        }));
    } catch (error) {
      setLoader(false);
      if (error.status === 401 || error.response?.data?.message === "Unauthorized") {
        getToken();
        enqueueSnackbar("Please, try again", {
          variant: "info"
        });
      } else {
        enqueueSnackbar(`${error.message}`, {
          variant: "error"
        });
      }
      // console.log(error.response?.data);
    }
  };

  // Profile picture update #######################################################################

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
      setProfilePicObj(acceptedFiles);
      setEmailDisabler(false);
      // for (let i = 0; i < acceptedFile.length; i++) {
      //   let loopedFile = acceptedFiles[i];

      //   if (files2.length >= 3) {
      //     return;
      //   } else {
      //   }
      // }
      // setFiles2((prevState) => [...prevState, acceptedFiles]);
    }
  });
  return (
    <div className="flex flex-col justify-center p-2 md:p-5 items-center">
      <div className="flex mb-10 justify-between w-full md:w-5/6 items-center">
        <div className="flex space-x-6">
          <p className="text-lg tracking-wider font-semibold">My Profile</p>
        </div>
        {/* <span className="flex space-x-2">
          <Button
            onClick={() => {
              router.push("/driver_document");
            }}
            social={true}
            SocialIcon={BsPersonCheck}
            style={"lg:px-5  font-semibold"}
            text={"Complete Profile"}
          />
        </span> */}
      </div>

      {/* User profile completion section ############################################## */}
      <div className=" flex justify-center border shadow-sm rounded-md items-center lg:flex lg:justify-end md:flex md:justify-end w-full  md:w-5/6 ">
        {/* 3########################################################################################### */}
        <div className="w-full  pt-10  p-5 justify-center flex items-center">
          <div className="md:w-4/5">
            <div className="rounded-md shadow-sm flex flex-col justify-center items-center md:p-5 my-4 ">
              <div className="">
                {/* profile upload section ################################## */}
                <img
                  className="rounded-full h-24 w-24 object-cover"
                  src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
                  alt="profile_img"
                  loading="lazy"
                />
                <div {...getRootProps()}>
                  <AiOutlineCamera className="text-white bg-scudGreen text-2xl rounded-full p-1 relative left-[70%] bottom-5  cursor-pointer hover:text-[#ececec]" />
                  <input {...getInputProps()} type="file" className="hidden" />
                </div>
              </div>
              <div className="my-1">
                <p className="font-semibold">
                  {userDetails?.first_name + " " + userDetails?.last_name}
                </p>
              </div>
            </div>
            <p className="text-[15px] font-semibold italic my-6">
              Profile Information:
              <span className="text-[#FF6C6C] font-normal ml-3 text-sm">
                Kindly note that you can only change your email address
              </span>
            </p>
            <div className="md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">First Name</label>
              <div className="md:w-4/5">
                <input
                  defaultValue={userDetails?.first_name}
                  disabled={true}
                  type={"text"}
                  placeholder="First Name "
                  className="border-[1px] rounded-md  outline-0 w-full  p-1 border-gray-300"
                />
              </div>
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Last Name</label>
              <div className="md:w-4/5">
                <input
                  defaultValue={userDetails?.last_name}
                  disabled={true}
                  type={"text"}
                  placeholder="Last Name"
                  className="border-[1px]  rounded-md outline-0 w-full  p-1 border-gray-300"
                />
              </div>
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Gender</label>
              <div className="md:w-4/5">
                <input
                  defaultValue={userDetails?.gender}
                  disabled={true}
                  type={"text"}
                  placeholder="Last Name"
                  className="border-[1px]  rounded-md outline-0 w-full  p-1 border-gray-300"
                />
              </div>
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Phone</label>
              <div className="md:w-4/5">
                <NumberSelect disabled={true} />
              </div>
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Email</label>
              <div className="flex space-x-0.5 w-full md:w-4/5">
                <div className="w-full md:w-4/5">
                  <input
                    onChange={handleUpdateEmail}
                    disabled={emailDisabler}
                    defaultValue={defaultemail}
                    type={"email"}
                    placeholder="Email"
                    className={`border-[1px] rounded-md outline-0 w-full p-1 border-gray-300 ${
                      emailDisabler && "bg-slate-200"
                    }`}
                  />
                </div>
                <button
                  onClick={() => setEmailDisabler(!emailDisabler)}
                  className="p-1 mt-1 mb-4 flex rounded-md text-scudGreen text-[14px]  font-semibold  hover:bg-[#dce2f8] "
                >
                  <BiEdit className="mt-1" /> &nbsp;
                  <p className="hidden md:block">Edit Email</p>
                </button>
              </div>
            </div>
            {!emailDisabler && (
              <button
                onClick={EmailUpdate}
                className="p-3 animate__animated animate__fadeIn mb-2 mt-2 justify-center items-center  rounded-md text-scudGray text-[12px] px-16 font-semibold bg-scudGreen hover:bg-[#4747e1] w-full "
              >
                {loader ? (
                  <div className="justify-center  flex items-center">
                    <Loader />
                  </div>
                ) : (
                  <p>Update</p>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.getLayout = Layout;
export default Profile;
