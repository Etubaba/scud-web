import React from "react";
import Layout from "../../../components/Admin/Layout";
import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { BsArrowLeft, BsArrowRight, BsPerson, BsSearch } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline, MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import SearchInput from "../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../components/common/EmptyTable";
import Modal from "../../../components/common/Modal";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../../../api/base";
import { useEffect } from "react";
import { getToken } from "../../../components/services/refresh";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { handleEditAd } from "../../../features/editSlice";
import Pagination from "../../../components/common/Pagination";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const Users = forwardRef(({ roles, users }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [adminUser, setAdminUser] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editAdmin, setEditAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editAdminDetails, setEditAdminDetails] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  // reload my server side props
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const newUsers = (arr, arr2) => {
    let result = [];
    for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr2[i].roles.includes(arr[j])) {
          result.push(arr2[i]);
        }
      }
    }
    return result;
  };
  useEffect(() => {
    let cleanUp = true;
    setAdminUser([]);

    let adminRoles = roles.filter((item) => {
      return item.name !== "driver" && item.name !== "rider";
    });

    // all roles name string in an array ########################
    let allRoles = adminRoles.map((itm) => {
      return itm.name !== undefined && itm.name;
    });
    // checking if token has expired so i can refresh it and get data ##################################
    if (roles.statusCode === 401 || roles.message === "Unauthorized") {
      getToken(true);
    }
    if (users.statusCode === 401 || users.message === "Unauthorized") {
      getToken(true);
    }
    // ++++++++++++++++++++++++++++++___________________++++++++++++++++++++++++++++++
    if (cleanUp) {
      const rr = newUsers(allRoles, users?.data);
      setAdminUser(rr);
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  // +++++++++++++++++++++++++++++++++++++++++++++++__________________________________

  // delete adminfunction ####################___________________

  const handleDeleteAdmin = (element) => {
    setEditAdmin(false);
    setDeleteModal(true), setSuccessAction(element.first_name + " " + element.last_name);
    setDeleteUser(element);
  };

  const deleteAdminUser = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios.delete(BASE_URL + `users/${deleteUser.id}`).then((res) => {
        if (res.data) {
          refreshData();
          setLoading(false);
          setSuccessModal(true);
          setDeleteModal(false);
        }
      });
    } catch (err) {
      console.log(err);
      // refresh token adn reload page
      if (err.response.data.message === "Unauthorized" || err.response.data.statusCode == 401) {
        setLoading(false);
        await getToken(true);
        enqueueSnackbar(`Try again something happened`, {
          variant: "info"
        });
      } else {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, {
          variant: "error"
        });
      }
    }
  };

  const rows = adminUser
    .filter((el) => {
      if (searchState === "") return el;
      else if (
        el.first_name.toLowerCase().includes(searchState.toLowerCase()) ||
        el.last_name.toLowerCase().includes(searchState.toLowerCase()) ||
        el.email.toLowerCase().includes(searchState.toLowerCase())
      ) {
        return el;
      }
    })
    .map((element) => (
      <tr
        className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
        key={element?.id}
      >
        <td className="md:text-base text-xs p-3">{element?.id}</td>
        <td className="md:text-base text-xs p-3">
          {element?.first_name + " " + element?.last_name}
        </td>
        <td className="md:text-base text-xs p-3">{element?.roles[0]}</td>
        <td className="md:text-base text-xs p-3">{element?.email}</td>
        <td className="text-center">
          {element.is_active ? (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Active</p>
            </div>
          ) : (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600">Inactive</p>
            </div>
          )}
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                setEditAdmin(true);
                setDeleteModal(true);
                setEditAdminDetails(element);
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
            <button
              onClick={() => {
                handleDeleteAdmin(element);
              }}
              className="bg-red-500 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const handleEditAdmin = () => {
    setLoading(true);
    dispatch(handleEditAd(editAdminDetails));
    router.push("/admin/admin_mgt/create_admin");
    setLoading(false);
  };

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "admin users",
    onAfterPrint: () => null
  });

  return (
    <div>
      <div className="flex  mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Admin Users</p>
        <span className="">
          <button
            onClick={() => router.push("/admin/admin_mgt/create_admin")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl " />
            &nbsp;Add Admin
          </button>
        </span>
      </div>

      <div className="block md:hidden my-10">
        <SearchInput value={searchState} setValue={setSearchState} />
      </div>
      <div className=" space-y-10 md:space-y-0 items-center  md:flex justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#admin_users"}
          file_name={"admin_users"}
        />
        <div className="mt-4 hidden md:block">
          <SearchInput value={searchState} setValue={setSearchState} />
        </div>
      </div>
      {/* table start here  */}
      {adminUser.length === 0 ? (
        <div className="mt-4">
          <EmptyTable
            Icon={MdOutlineAdminPanelSettings}
            title={"No admin available"}
            name={`admin`}
          />
        </div>
      ) : (
        <div ref={componentToPrintRef} style={{ height: window.innerHeight, width: "100%" }}>
          <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
            <table id="admin_users" className="w-full min-w-[700px] ">
              <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
                <tr className="border-b ">
                  <td className="">
                    <div className="flex md:text-base text-xs justify-center">
                      <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                      <p className="md:text-base  text-xs">id</p>
                    </div>
                  </td>
                  <td className="md:py-4 py-2 ">
                    <div className="flex  md:text-base text-xs justify-center">
                      <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                      <p className="md:text-base text-xs ">Username</p>
                    </div>
                  </td>
                  <td className="md:py-4 py-2 ">
                    <div className="flex  md:text-base text-xs justify-center">
                      <MdOutlineAdminPanelSettings className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                      <p className="md:text-base text-xs ">Roles</p>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex  justify-center">
                      <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                      <p className="md:text-base text-xs ">Email</p>
                    </div>
                  </td>
                  <td className=" ">
                    <div className="flex  justify-center">
                      <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                        <BiRefresh className="text-scudGreen text-sm " />
                      </div>

                      <p className="md:text-base text-xs ">Status</p>
                    </div>
                  </td>
                  <td className=" text-left">
                    <div className="flex   justify-center">
                      <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                      <p className="md:text-base text-xs ">Actions</p>
                    </div>
                  </td>
                </tr>
              </thead>

              <tbody className="mx-4">{rows}</tbody>
            </table>
          </div>
        </div>
      )}
      {/* table end here  */}

      {/* <Pagination /> */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            {editAdmin ? (
              <FiEdit className="text-scudGreen text-5xl" />
            ) : (
              <MdErrorOutline className="text-red-600 text-5xl" />
            )}
            {editAdmin ? (
              <p className="text-lg font-semibold mt-2">Edit Admin User</p>
            ) : (
              <p className="text-lg font-semibold mt-2">Delete Admin User</p>
            )}
            {editAdmin ? (
              <p className="text-sm text-textColor mt-2">You are about to edit an admin user</p>
            ) : (
              <p className="text-sm text-textColor mt-2">You are about to delete an admin user</p>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              loading={loading}
              onClick={editAdmin ? handleEditAdmin : deleteAdminUser}
              text={editAdmin ? "Yes, edit" : "Yes, Delete"}
            />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">{successAction} deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              The {successAction} has been deleted.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
});

Users.getLayout = Layout;
export default Users;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  // try {
  const [rolesRes, usersRes] = await Promise.all([
    fetch(`${BASE_URL}roles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [roles, users] = await Promise.all([rolesRes.json(), usersRes.json()]);

  if (
    (roles?.statusCode !== undefined && roles?.statusCode === 401) ||
    users?.statusCode !== undefined
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  // console.log(roles, users);
  return { props: { roles, users } };
  // } catch (err) {
  //   console.log(err);
  // }
  // console.log(token);
}
