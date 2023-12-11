import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  AiOutlineCamera,
  AiOutlineCheckCircle,
  AiOutlineMail,
  AiOutlinePhone
} from "react-icons/ai";
import { BsLock, BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, STATE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Select from "../../../components/common/Select";
import { getToken } from "../../../components/services/refresh";
import { useSnackbar } from "notistack";
import { handleEditAd } from "../../../features/editSlice";
import { useDropzone, Dropzone } from "react-dropzone";
import { handleAdminProps, handleUserProps } from "../../../features/authSlice";
import { validateToken } from "../../../components/services/validateToken";

const Create_admin = ({ roles, states }) => {
  const dispatch = useDispatch();
  const isEditAdmin = useSelector((state) => state.edit.edit_adminUsers);
  const Admin = useSelector((state) => state.auth.adminDetails);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [stateValue, setStateValue] = useState("Select State");
  const [lastname, setLastName] = useState(isEditAdmin !== null ? isEditAdmin.last_name : "");
  const [firstname, setFirstName] = useState(isEditAdmin !== null ? isEditAdmin.first_name : "");
  const [email, setEmail] = useState(isEditAdmin !== null ? isEditAdmin.email : "");
  const [phone, setPhone] = useState(isEditAdmin !== null ? isEditAdmin.phone : "");
  const [role, setRole] = useState(isEditAdmin !== null ? isEditAdmin.roles[0] : "Assign Role");
  const [status, setStatus] = useState("Select Status");
  const [gender, setGender] = useState(isEditAdmin !== null ? isEditAdmin.gender : "Select Gender");
  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const statusList = ["Active", "inactive"];
  const genderList = ["Male", "Female"];
  const [profilepic, setProfilePic] = useState(isEditAdmin !== null ? isEditAdmin.picture : null);
  const [profilepicobj, setProfilePicObj] = useState(null);

  //  reload my serverside props
  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  //statelist
  const stateList = states?.map((item) => item.name);
  const selectedState = states?.filter((item) => item.name === stateValue)[0]?.id;

  useEffect(() => {
    if (
      role !== "Select Role" &&
      status !== "Select Status" &&
      firstname !== "" &&
      lastname !== "" &&
      gender !== "" &&
      phone !== ""
    ) {
      setDisabled(false);
      setSuccessAction(firstname + " " + lastname);
    }
  }, [role, status, firstname, lastname, gender, phone]);

  useEffect(() => {
    let cleanUp = true;
    setRoleList([]);
    // checking if token has expired so i can refresh it and get data ##################################
    if (roles.statusCode === 401 || roles === "Unauthorized") {
      // console.log("403 roles");
      getToken(true);
      refreshData();
    }

    // all roles object minus driver and riders##################
    let adminRoles = roles.filter((item) => {
      return item.name !== "driver" && item.name !== "rider";
    });

    // all roles name string in an array ########################
    let allRoles = adminRoles.map((itm) => {
      return itm.name !== undefined && itm.name;
    });

    if (cleanUp) {
      setRoleList(allRoles);
    }

    return () => {
      // cancel the subscription
      cleanUp = false;
    };
  }, []);

  const handleCreateAdmin = async () => {
    const formdata = new FormData();
    profilepicobj !== null && formdata.append("image", profilepicobj[0]);
    const url2 = BASE_URL + "auth/picture";

    // #######################

    setLoading(true);

    {
      if (isEditAdmin !== null) {
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        await axios
          .patch(BASE_URL + `users/${isEditAdmin.id}`, {
            roles: [role],
            status: status == "Active" ? true : false,
            first_name: firstname,
            last_name: lastname,
            gender: gender.toLocaleLowerCase(),
            email,
            phone: phone.charAt(0) === "0" ? `+234${phone.slice(1)}` : "+234" + phone,
            provider: "phone",
            state_id: +selectedState
          })
          .then((res) => {
            if (res.data) {
              setLoading(false);
              setSuccessAction(role);
              setSuccessModal(true);
              setTimeout(() => {
                dispatch(handleEditAd(null)), router.push("/admin/admin_mgt/admin_users");
              }, 3000);
            }
            console.log(res);
          })
          .catch((err) => {
            if (
              err.response.data.message === "Unauthorized" ||
              err.response.data.statusCode == 401
            ) {
              setLoading(false);
              getToken(true);
              enqueueSnackbar(`Try again something happened`, {
                variant: "info"
              });
            } else {
              setLoading(false);
              enqueueSnackbar(err.response.data.message, {
                variant: "error"
              });
            }
          });
        profilepicobj !== null &&
          (await axios.patch(url2, formdata).then((res) => {
            if (res.data) {
              enqueueSnackbar(`picture uploaded`, {
                variant: "success",
                id: 1
              });
              console.log(res.data);
              res.data.id == Admin.id ? dispatch(handleAdminProps(res.data)) : null;
              setLoading(false);
            }
          }));
      } else {
        const token = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        await axios
          .post(BASE_URL + `users`, {
            roles: [role],
            status: status == "Active" ? true : false,
            first_name: firstname,
            last_name: lastname,
            gender: gender.toLocaleLowerCase(),
            email,
            phone: phone.charAt(0) === "0" ? `+234${phone.slice(1)}` : "+234" + phone,
            provider: "phone",
            state_id: +selectedState
          })
          .then((res) => {
            if (res.data) {
              setLoading(false);
              setSuccessAction(role);
              setSuccessModal(true);
              setRole("Select Role");
              setStatus("Select Status");
              setPhone("");
              setEmail("");
              setFirstName("");
              setLastName("");
              setGender("");
            }

            const createdAdmintoken = Cookies.get("adminAccessToken");
            axios.defaults.headers.common["Authorization"] = "Bearer " + createdAdmintoken;
            axios.defaults.headers.get["Content-Type"] = "application/json";

            profilepicobj !== null &&
              axios.patch(url2, formdata).then((res) => {
                if (res.data) {
                  enqueueSnackbar(`picture uploaded`, {
                    variant: "success",
                    id: 1
                  });
                  setLoading(false);
                }
              });
            console.log(res);
          })
          .catch((err) => {
            if (
              err.response.data.message === "Unauthorized" ||
              err.response.data.statusCode == 401
            ) {
              setLoading(false);
              getToken(true);
              enqueueSnackbar(`Try again something happened`, {
                variant: "info"
              });
            } else {
              setLoading(false);
              enqueueSnackbar(err.response.data.message, {
                variant: "error"
              });
            }
          });
      }
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
      setProfilePicObj(acceptedFiles);
    }
  });
  return (
    <div>
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 tracking-wide hover:underline"
          onClick={() => {
            dispatch(handleEditAd(null)), router.push("/admin/admin_mgt/admin_users");
          }}
        >
          Admin Users
        </p>
        &nbsp; &gt;
        {isEditAdmin !== null ? (
          <p className="tracking-wide">Edit admin</p>
        ) : (
          <p className="tracking-wide">Create admin</p>
        )}
      </span>
      <div className="md:mt-10 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          <p className="text-sm text-textColor mb-7">Enter admin details</p>
          <div className="rounded-md shadow-sm flex flex-col justify-center items-center md:p-5 my-4 ">
            <div className="">
              {/* profile upload section ################################## */}
              <img
                className="rounded-full h-24 w-24 object-cover"
                src={profilepic === null ? "/user.png" : profilepic}
                alt="profile_img"
              />
              <div {...getRootProps()}>
                <AiOutlineCamera className="text-white bg-scudGreen text-2xl rounded-full p-1 relative left-[70%] bottom-5  cursor-pointer hover:text-[#ececec]" />
                <input {...getInputProps()} type="file" className="hidden" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <Input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={"First-Name"}
                Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={"Last-Name"}
                Icon={BsPerson}
              />
            </div>
            <div className="col-span-1">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Email"}
                Icon={AiOutlineMail}
              />
            </div>
            <div className="col-span-1">
              <Input
                type={"tel"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={"Phone Number"}
                Icon={AiOutlinePhone}
              />
            </div>
            <div className="col-span-1">
              <Select
                data={roleList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={role}
                setValue={setRole}
                dropDownWidth={"mt-1 w-full"}
                color=""
              />
            </div>
            <div className="col-span-1">
              <Select
                search={true}
                data={genderList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={gender}
                setValue={setGender}
                dropDownWidth={" w-full mt-1"}
                color=""
              />
            </div>

            <div className="col-span-1">
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={status}
                setValue={setStatus}
                dropDownWidth={" w-full mt-1"}
                color=""
              />
            </div>

            <div className="col-span-1">
              <Select
                data={stateList}
                style={"w-full  p-3"}
                positon={"p-4"}
                value={stateValue}
                setValue={setStateValue}
                dropDownWidth={" w-full mt-1"}
                color=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => {
            dispatch(handleEditAd(null)), router.push("/admin/admin_mgt/admin_users");
          }}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          loading={loading}
          disabled={disabled}
          onClick={handleCreateAdmin}
          text={isEditAdmin !== null ? "save" : "Add Admin"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            {isEditAdmin !== null ? (
              <p className="text-lg font-semibold mt-2">
                {successAction} Admin edited successfully.
              </p>
            ) : (
              <p className="text-lg font-semibold mt-2">
                {successAction} Admin created successfully.
              </p>
            )}
            {isEditAdmin !== null ? (
              <p className="text-sm text-center text-textColor mt-2">
                {successAction} has been edited as admin .
              </p>
            ) : (
              <p className="text-sm text-center text-textColor mt-2">
                {successAction} has been added as admin .
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

Create_admin.getLayout = Layout;
export default Create_admin;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  try {
    const [rolesRes, stateRes] = await Promise.all([
      fetch(`${BASE_URL}roles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }),
      fetch(`${STATE_URL}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [roles, states] = await Promise.all([rolesRes.json(), stateRes.json()]);

    if (
      (states?.statusCode !== undefined && states?.statusCode === 401) ||
      roles.statusCode !== undefined
    ) {
      try {
        await validateToken(context, true);
      } catch (err) {
        return { redirect: { destination: `/admin/auth`, permanent: false } };
      }
    }

    return { props: { roles, states } };
  } catch (err) {
    console.log(err);
  }
}
