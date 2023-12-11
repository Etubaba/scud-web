import React from "react";
import Layout from "../../../components/officer_layout/Layout";
import Rating from "../../../components/common/Rating";
import NumberSelect from "../../../components/common/NumberSelect";
import { useState } from "react";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import { TbEdit } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { handleAdminProps } from "../../../features/authSlice";

const Profile = () => {
  const [edit, setEdit] = useState(false);

  const user = useSelector((state) => state.auth.adminDetails);
  const [profilepic, setProfilePic] = useState(user.picture !== null ? user.picture : null);
  const [profilepicobj, setProfilePicObj] = useState(null);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);

  const officer_name =
    user.first_name?.charAt(0).toUpperCase() +
    user.first_name?.slice(1) +
    " " +
    user.last_name?.charAt(0).toUpperCase() +
    user.last_name?.slice(1);

  const router = useRouter();
  const dispatch = useDispatch();
  const officersManaged = user.account_managers;

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
      const createdAdmintoken = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + createdAdmintoken;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}auth/picture`, formdata);
      console.log("success", data);
      if (data) {
        enqueueSnackbar(`picture uploaded successfully`, {
          variant: "success"
        });
        dispatch(handleAdminProps(data));
      }
    } catch (err) {
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

  const updateDetails = async () => {
    try {
      const createdAdmintoken = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + createdAdmintoken;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.patch(`${BASE_URL}users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        gender,
        email
      });

      if (data) {
        enqueueSnackbar(`Profile updated successfully`, {
          variant: "success"
        });
        dispatch(handleAdminProps(data));
      }
    } catch (err) {
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

  const save = () => {
    setEdit(!edit);
    if (profilepicobj !== null) uploadAvatar();
    if (
      firstName === user.first_name &&
      lastName === user.last_name &&
      gender === user.gender &&
      email === user.email
    ) {
      return;
    }
    updateDetails();
  };

  return (
    <div>
      <div className=" flex mb-6 justify-between items-center">
        <p className="text-lg  tracking-wide font-semibold">Profile</p>{" "}
        {edit ? (
          <button
            onClick={save}
            className="text-sm flex p-2 rounded-md space-x-3 bg-scudGreen text-white"
          >
            <MdOutlineSave className="text-lg" />
            <p>Save</p>
          </button>
        ) : (
          <button
            onClick={() => setEdit(!edit)}
            className="text-sm flex p-2 rounded-md space-x-2 bg-scudGreen text-white"
          >
            <TbEdit className="text-lg" />
            <p>Edit Profile</p>
          </button>
        )}
      </div>

      <div className="py-5 px-5 mb-6 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
          <div>
            {" "}
            <img
              src={profilepic === null ? "/user.png" : profilepic}
              className="w-20 mb-4 md:mb-0 md:mr-2 h-20 rounded-full"
              alt=""
            />
            {edit ? (
              <div {...getRootProps()}>
                <AiOutlineCamera className="text-white -mt-2 bg-scudGreen text-xl rounded-full p-1 relative left-[70%] bottom-5  cursor-pointer hover:text-[#ececec]" />
                <input {...getInputProps()} type="file" className="hidden" />
              </div>
            ) : (
              <div className="w-2.5 border border-white h-2.5 rounded-full relative z-40 -mt-4  ml-[4rem] bg-green-600"></div>
            )}
            {/* <span><AiOutlineCamera/></span> */}
          </div>

          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
            <p className="text-textColor font-semibold">{officer_name}</p>
            <p className="text-textColor"> Supervisor</p>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {" "}
                <div className="rounded-full  border-2 border-white z-20">
                  {" "}
                  <img src="/user.png" className="w-3 h-3 " />
                </div>
                <div className="rounded-full  border-2 -ml-1 border-white z-10">
                  {" "}
                  <img src="/user.png" className="w-3 h-3 " />
                </div>
                <div className="rounded-full  border-2 -ml-1 border-white z-0">
                  {" "}
                  <img src="/user.png" className="w-3 h-3 " />
                </div>
              </div>

              <p className="text-xs text-textColor/50">Managing {officersManaged.length} drivers</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Rating rating={3} readOnly={true} size={"xs"} />
          <p className="text-textColor">3</p>
        </div>
      </div>
      <p className="font-semibold mb-4">Profile Information:</p>
      <div className="bg-white py-4 md:py-8   rounded w-full h-auto border ">
        <div className="md:w-[65%] px-4 md:px-6">
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor ">First Name</label>
            <input
              disabled={edit ? false : true}
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={user.first_name}
              type={"text"}
              placeholder=" "
              className="border-[0.7px] text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Last Name</label>
            <input
              disabled={edit ? false : true}
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={user.last_name}
              type={"text"}
              placeholder=" "
              className="border-[0.7px] text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Gender</label>
            {edit ? (
              <div className="w-full md:w-[75%]">
                <Select
                  data={["Male", "Female", "Other"]}
                  style={"w-full p-2"}
                  positon={"p-2"}
                  value={gender}
                  setValue={setGender}
                  dropDownWidth={
                    " w-[16.5rem] md:w-[28.8rem] bottom-[-6rem] md:bottom-[7rem] lg:bottom-[-6rem]"
                  }
                  color=""
                />
              </div>
            ) : (
              <input
                type={"text"}
                disabled={edit ? false : true}
                defaultValue={user.gender}
                placeholder=" "
                className="border-[0.7px] text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
              />
            )}
          </div>
          <div className=" md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Phone</label>
            <div className="w-full md:w-[75%]">
              <NumberSelect admin={true} readOnly={true} disabled={true} />
            </div>
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Email</label>
            <input
              disabled={edit ? false : true}
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
              type={"text"}
              placeholder=" "
              className="border-[0.7px]  text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
        </div>
        <div className="border-b my-8"></div>

        <div className="md:w-[65%] px-4 md:px-6">
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Country</label>
            <div className="w-full md:w-[75%]">
              <input
                disabled={true}
                defaultValue={"Nigeria"}
                type={"text"}
                placeholder=" "
                className="border-[0.7px]  text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[100%] p-1 border-gray-300"
              />
            </div>
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">State</label>
            <div className="w-full md:w-[75%]">
              <input
                disabled={true}
                defaultValue={user.state?.name}
                type={"text"}
                placeholder=" "
                className="border-[0.7px]  text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[100%] p-1 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {edit && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setEdit(false)}
            className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-7 py-1 rounded-md text-sm  mr-2"
          >
            Cancel
          </button>
          <Button onClick={save} text={"Save Changes"} />
        </div>
      )}
    </div>
  );
};
Profile.getLayout = Layout;
export default Profile;
