import React, { useState } from "react";
import Layout from "../../components/driver_layout/Layout";

import { AiFillCar, AiFillStar, AiOutlineCamera, AiOutlineCheckCircle } from "react-icons/ai";
import Button from "../../components/common/Button";
import { BsFillPeopleFill, BsGift, BsPersonCheck, BsWallet2 } from "react-icons/bs";
import { BiEdit, BiTrip } from "react-icons/bi";
import NumberSelect from "../../components/common/NumberSelect";
import CountUp from "react-countup";
import { FcCancel } from "react-icons/fc";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone, Dropzone } from "react-dropzone";
import { Loader } from "../../components/common/Loader";
import { useRef } from "react";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import axios from "axios";
import { handleUserProps } from "../../features/authSlice";
import { validateToken } from "../../components/services/validateToken";
import Rating from "../../components/common/Rating";

function Profile({ data }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const referrals = data?.referrals;
  const trips = data?.trips;
  const balance = data?.account_balance;
  const vehicles = data?.vehicles;
  const review = data?.reviews;

  const dispatch = useDispatch();

  const [emailDisabler, setEmailDisabler] = useState(true);
  const router = useRouter();
  const user = useSelector((state) => state.auth.userDetails);
  const [profilepic, setProfilePic] = useState(user.picture);
  const [profilepicobj, setProfilePicObj] = useState(null);
  const [loader, setLoader] = useState(false);
  const [defaultemail, setDefaultEmail] = useState(user?.email);

  const updateRef = useRef();

  useEffect(() => {
    if (updateRef.current) {
      updateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }, [emailDisabler]);

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
      setProfilePicObj(acceptedFiles);
      setEmailDisabler(false);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:flex mb-10 justify-between w-full md:w-5/6 items-center">
        <div className="flex justify-between md:space-x-6">
          <p className="text-lg tracking-wider font-semibold">My Profile</p>
          {user.is_active ? (
            <div className="flex space-x-1 justify-center items-center px-2 rounded-md bg-green-600/10">
              <AiOutlineCheckCircle className=" text-green-600" />
              <p className="text-xs text-green-600">Verified</p>
            </div>
          ) : (
            <div className="flex space-x-1 justify-center items-center px-2 rounded-md bg-red-600/10">
              <FcCancel className="" />
              <p className="text-xs text-red-600">Not Verified</p>
            </div>
          )}
        </div>
        <span className="flex space-x-2 mt-4 md:mt-0">
          <Button
            onClick={() => {
              router.push("/driver_profile/driver_document");
            }}
            social={true}
            SocialIcon={BsPersonCheck}
            style={"lg:px-5  font-semibold"}
            text={"Edit Profile"}
          />
        </span>
      </div>
      <div className="w-full md:w-5/6 md:flex justify-between md:space-x-7">
        <div className="rounded-md shadow-sm flex flex-col justify-center items-center p-5 my-4 border md:w-2/5">
          <div {...getRootProps()} className="">
            {/* profile upload section ################################## */}
            <img
              className="rounded-full h-24 w-24 object-cover"
              src={profilepic === null || profilepic === undefined ? "/user.png" : profilepic}
              alt="profile_img"
            />
            <div>
              <AiOutlineCamera className="text-white bg-scudGreen text-2xl rounded-full p-1 relative left-[70%] bottom-5  cursor-pointer hover:text-[#ececec]" />
              <input {...getInputProps()} type="file" className="hidden" />
            </div>
          </div>
          <div className="my-1">
            <p className="font-semibold"> {user?.first_name + " " + user?.last_name}</p>
          </div>
          {/* <div className="rounded-full bg-[#fff7e8] text-[#FFBD3D] flex space-x-2 px-5">
            <BsGift className="mt-1" />
            <p>Tier 1</p>
          </div> */}
          {/* Ratings Section $##################################*/}
          <div className="flex space-x-1 my-2">
            <Rating readOnly={true} rating={user?.rating} />
          </div>
          <div>
            <p className="text-scudGreen">{review.length} review</p>
          </div>
        </div>

        {/* TRip completed section############################### */}

        <div className="rounded-md  p-5 my-4 border shadow-sm w-full md:w-2/3">
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            <div className="flex space-x-4">
              <BiTrip className="text-scudGreen text-2xl " />
              <p className="text-sm md:text-base">Completed trips:</p>
            </div>
            <div>
              <p className="text-sm md:text-base">
                <CountUp
                  className="text-scudGreen font-bold"
                  start={0}
                  end={trips.length}
                  duration={2.75}
                  // decimals={4}
                  // prefix="EUR "
                  // suffix=" left"
                />{" "}
                trip completed
              </p>
            </div>
            <div className="flex space-x-4">
              <BsWallet2 className="text-scudGreen mt-1 text-xl" />
              <p className="text-sm md:text-base">Total Earnings:</p>
            </div>
            <div>
              <p className="text-sm md:text-base">
                <CountUp
                  className="text-scudGreen font-bold"
                  start={0}
                  end={balance}
                  duration={2.75}
                  // decimals={4}
                  prefix="₦"
                  // suffix=" left"
                />{" "}
                earned
              </p>
            </div>
            <div className="flex space-x-4">
              <AiFillCar className="text-scudGreen mt-1 text-2xl" />
              <p className="text-sm md:text-base">Number of vehicles:</p>
            </div>
            <div>
              <p className="text-sm md:text-base">
                <CountUp
                  className="text-scudGreen font-bold"
                  start={0}
                  end={vehicles.length}
                  duration={2.75}
                  // decimals={4}
                  // prefix="EUR "
                  // suffix=" left"
                />{" "}
              </p>
            </div>
            <div className="flex space-x-4">
              <BsFillPeopleFill className="text-scudGreen mt-1 text-2xl" />
              <p className="text-sm md:text-base">Number of refereals:</p>
            </div>
            <div>
              <p className="text-sm md:text-base">
                <CountUp
                  className="text-scudGreen font-bold"
                  start={0}
                  end={referrals.length}
                  duration={2.75}
                  // decimals={4}
                  // prefix="EUR "
                  // suffix=" left"
                />{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* User profile completion section ############################################## */}
      <div className=" flex justify-center border shadow-sm rounded-t-md items-center lg:flex lg:justify-end md:flex md:justify-end w-full md:w-5/6 ">
        <div className="w-full  pt-10  md:p-5 justify-center flex items-center">
          <div className="w-4/5">
            <p className="text-[15px] font-semibold italic my-6">
              Profile Information:
              <span className="text-[#FF6C6C] font-normal ml-3 text-sm">
                Kindly note that you can only change your email address
              </span>
            </p>

            <div className="md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">First Name</label>
              <input
                disabled={true}
                defaultValue={user?.first_name}
                type={"text"}
                placeholder="First Name "
                className="border-[1px] rounded-md  outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Last Name</label>
              <input
                disabled={true}
                defaultValue={user?.last_name}
                type={"text"}
                placeholder="Last Name"
                className="border-[1px]  rounded-md outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Gender</label>
              <input
                disabled={true}
                defaultValue={user?.gender}
                type={"text"}
                placeholder="Last Name"
                className="border-[1px]  rounded-md outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>

            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Email</label>
              <div className="flex space-x-0.5 w-full md:w-3/4">
                <div className=" w-full md:w-4/5">
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
                  <BiEdit className=" text-2xl md:text-xl" />{" "}
                  <pre className="hidden md:block">&nbsp; Edit Email</pre>
                </button>
              </div>
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Phone</label>
              <div className="w-full md:w-3/4">
                <NumberSelect disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center border shadow-sm rounded-b-md items-center lg:flex lg:justify-end md:flex md:justify-end w-full  md:w-5/6 ">
        <div className="w-full  pt-10  md:p-5 justify-center flex items-center">
          <div className="w-4/5">
            <p className="text-[15px] font-semibold italic my-6">Location Information</p>
            <div className="md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Country</label>
              <input
                disabled={true}
                defaultValue={"Nigeria"}
                type={"text"}
                placeholder="Enter Country "
                className="border-[1px] rounded-md  outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">State</label>
              <input
                defaultValue={user?.state?.name}
                disabled={true}
                type={"text"}
                placeholder="Enter State"
                className="border-[1px]  rounded-md outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>
            <div className=" md:flex w-full justify-between mb-4">
              <label className="text-sm font-semibold">Address</label>
              <input
                defaultValue={user?.address}
                disabled={true}
                type={"text"}
                placeholder="Enter City"
                className="border-[1px]  rounded-md outline-0 w-full md:w-3/4 p-1 border-gray-300"
              />
            </div>
            <div>
              {" "}
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

            <span ref={updateRef}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.getLayout = Layout;
export default Profile;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  // const id = context.req.cookies.user_id || "";
  const res = await fetch(`${BASE_URL}auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
