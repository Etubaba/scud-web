import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import { sideNavList } from "../../../dummy";
import useToggle from "../../../Hooks/useToggle";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../../../components/services/refresh";
import { useDispatch, useSelector } from "react-redux";
import { handleEditRoles } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";

const CreateRoles = ({ permission }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  const isEditRoles = useSelector((state) => state.edit.edit_adminRoles);
  const [permissions, setPermissions] = useState(
    isEditRoles !== null ? isEditRoles.permissions : []
  );

  const [successModal, setSuccessModal] = useState(false);
  const [successModal2, setSuccessModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roletitle, setRoleTitle] = useState(isEditRoles !== null ? isEditRoles.name : "");
  const [disableForm, setdisableForm] = useState(true);
  const [selectedPermission, setSelectedPermission] = useState(
    isEditRoles !== null ? isEditRoles.permisions : []
  );

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  useEffect(() => {
    if (roletitle !== "" || selectedPermission.length !== 0) {
      setdisableForm(false);
    } else setdisableForm(true);
  }, [roletitle, selectedPermission.length >= 0]);

  // ###########################################

  useEffect(() => {
    let cleanUp = true;
    setPermissions([]);
    if (permission.statusCode === 401 || permission === "Unauthorized") {
      getToken(true);
      refreshData();
    }
    if (cleanUp) {
      setPermissions(permission);
    }
    return () => {
      cleanUp = false;
    };
  }, []);

  const handleToggle = (item) => {
    if (selectedPermission.includes(item)) {
      let newPerm = selectedPermission.filter((itm) => {
        return itm !== item;
      });
      // console.log(newPerm, "new...");
      setSelectedPermission(newPerm);
    } else setSelectedPermission((prev) => [...prev, item]);
  };

  const handleCreateRole = () => {
    setLoading(true);
    if (roletitle === "" || selectedPermission.length === 0) {
      enqueueSnackbar("Role title can't be empty", {
        variant: "error"
      });
    } else {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      {
        isEditRoles !== null
          ? axios
              .patch(BASE_URL + `roles/${isEditRoles.id}`, {
                name: isEditRoles.name === roletitle ? undefined : roletitle,
                permissions: selectedPermission
              })
              .then((res) => {
                if (res) {
                  setLoading(false);
                  setSuccessModal2(true);
                  dispatch(handleEditRoles(null));
                  setTimeout(() => {
                    router.push("/admin/admin_mgt/roles_permissions");
                  }, 3000);
                }
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
              })
          : axios
              .post(BASE_URL + "roles", {
                name: roletitle,
                permissions: selectedPermission
              })
              .then((res) => {
                if (res) {
                  setLoading(false);
                  setSuccessModal(true);
                  setSelectedPermission([]);
                  setRoleTitle("");
                }
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

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-5  md:mb-10 justify-center md:justify-between items-center">
        <p className="text-lg tracking-wide cursor-pointer font-semibold">
          <span
            className="text-gray-500 hover:underline"
            onClick={() => {
              router.push("/admin/admin_mgt/roles_permissions");
              dispatch(handleEditRoles(null));
            }}
          >
            Roles & Permissions
          </span>
          &gt;
          {isEditRoles !== null ? <span>Edit Role</span> : <span>Create Role</span>}
        </p>
      </div>
      <div className="border rounded-md md:p-10">
        <div className="p-5 w-full space-y-3">
          <label className="text-sm font-semibold">Enter role details</label>
          <div className="flex justify-between space-x-5 ">
            <input
              onChange={(e) => setRoleTitle(e.target.value)}
              value={roletitle}
              type={"text"}
              placeholder="role title"
              className="border-[1px] px-4  rounded-md outline-0 w-full md:w-2/4 p-1 border-gray-300"
            />
            <input
              type={"text"}
              placeholder="display name"
              className="border-[1px]  rounded-md px-4 outline-0 w-full md:w-2/4 p-1 border-gray-300"
            />
          </div>
          {/* <div>
            <textarea
              cols={30}
              rows={5}
              placeholder="Write discription here..."
              className="border-[1px]  px-4 rounded-md outline-0 w-full  p-1 border-gray-300"
            ></textarea>
          </div> */}
        </div>
        <div className=" pl-2 md:p-5 w-full space-y-3">
          <label className="text-sm font-semibold">Select Permissions</label>
          {permissions?.map((item, index) => (
            <div key={index} className={"border rounded-md p-2"}>
              <div>
                <div className="flex justify-between items-center">
                  <div className=" flex space-x-2">
                    <input
                      type={"checkbox"}
                      onChange={() => {
                        handleToggle(item);
                      }}
                      checked={selectedPermission.includes(item) ? true : false}
                    />
                    <label className="text-sm tracking-wider text-[#3D4151] my-2">
                      {item.toUpperCase()}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 p-2">
          <button
            onClick={() => {
              router.push("/admin/admin_mgt/roles_permissions");
              dispatch(handleEditRoles(null));
            }}
            className="bg-white border  text-red-500 border-red-500   hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold mr-2"
          >
            Cancel
          </button>
          <Button
            loading={loading}
            disabled={disableForm}
            onClick={handleCreateRole}
            text={isEditRoles !== null ? "Save" : "Create role"}
          />
        </div>
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Role Created</p>
            <p className="text-sm text-center text-textColor mt-2">
              Riders manager role has been created
            </p>
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal2(false)} open={successModal2}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Role Edited</p>
            <p className="text-sm text-center text-textColor mt-2">
              role has been edited successfully
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

CreateRoles.getLayout = Layout;
export default CreateRoles;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  try {
    const [permissionRes] = await Promise.all([
      fetch(`${BASE_URL}permissions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [permission] = await Promise.all([permissionRes.json()]);

    if (permission?.statusCode !== undefined && permission?.statusCode === 401) {
      try {
        await validateToken(context, true);
      } catch (err) {
        return { redirect: { destination: `/admin/auth`, permanent: false } };
      }
    }

    return { props: { permission } };
  } catch (err) {
    console.log(err);
  }
}
