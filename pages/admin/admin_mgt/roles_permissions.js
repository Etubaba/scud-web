import React from "react";
import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import Button from "../../../components/common/Button";
import { BsArrowLeft, BsArrowRight, BsPersonCircle, BsSearch } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline, MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import Modal from "../../../components/common/Modal";
import { useRouter } from "next/router";
import { getToken } from "../../../components/services/refresh";
import { useEffect } from "react";
import { BASE_URL } from "../../../api/base";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import { handleEditRoles } from "../../../features/editSlice";
import { useDispatch } from "react-redux";
import SearchInput from "../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import Table from "../../../components/common/table/Table";
import { rolesDisplayKeys, rolesTableHead } from "../../../components/common/table";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { forwardRef } from "react";

const Roles = forwardRef(({ roles }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchState, setSearchState] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [roleList, setRoleList] = useState(roles);
  const [roletodelete, setRoleToDelete] = useState(null);
  const [editRole, setEditRole] = useState(false);
  const [loading, setLoading] = useState(false);

  //  reload my serverside props
  async function refreshData() {
    await router.replace(router.asPath);
  }

  const handleRoleDelete = (e) => {
    setRoleToDelete(e);
    setSuccessAction(e.name);
    setDeleteModal(true);
  };

  const deleteRole = async () => {
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios.delete(BASE_URL + `roles/${roletodelete.id}`).then((res) => {
        if (res) {
          refreshData();
          setSuccessModal(true);
          setDeleteModal(false);
          setRoleToDelete(null);
        }
      });
    } catch (err) {
      // refresh token adn reload page

      if (err.response.message === "Unauthorized" || err.response.statusCode == 401) {
        await getToken(true);
        enqueueSnackbar(`Try again something happened`, {
          variant: "info"
        });
      } else {
        enqueueSnackbar(err.response.data.message, {
          variant: "error"
        });
      }
    }
  };

  const handleEditRole = (el) => {
    setLoading(true);
    dispatch(handleEditRoles(el));
    router.push("/admin/admin_mgt/create_roles");
    setLoading(false);
  };

  //table actions
  const action = [
    {
      label: "edit",
      iconName: <FiEdit className="text-white" />,
      function: (el) => {
        handleEditRole(el);
      }
    },
    {
      label: "delete",
      iconName: <RiDeleteBin6Line className="text-white" />,
      function: (e) => {
        handleRoleDelete(e);
        setEditRole(false);
      }
    }
  ];

  const tableRole = roleList.filter((el) => {
    if (searchState === "") return el;
    else if (el.name?.toLowerCase().includes(searchState.toLowerCase())) return el;
  });

  const componentToPrintRef = useRef(null);

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "admin users",
    onAfterPrint: () => null
  });

  return (
    <div>
      <div className="flex  md:flex-row mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Roles & Permissions</p>

        <Button
          onClick={() => router.push("/admin/admin_mgt/create_roles")}
          text={"Create role"}
          social={true}
          SocialIcon={AiOutlinePlus}
        />
      </div>
      <div className="my-10 block md:hidden">
        <SearchInput value={searchState} setValue={setSearchState} />
      </div>
      <div className=" md:flex items-center justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#roles_permission"}
          file_name={"roles-and -permissions"}
        />
        <div className="mt-4 hidden md:block">
          <SearchInput value={searchState} setValue={setSearchState} />
        </div>
      </div>
      {/* table start here  */}
      {roles.length === 0 ? (
        <div className="mt-4">
          <EmptyTable
            Icon={MdOutlineAdminPanelSettings}
            title={"No role available"}
            name={"role"}
          />
        </div>
      ) : (
        <div ref={componentToPrintRef} style={{ height: window.innerHeight, width: "100%" }}>
          <Table
            actions={action}
            tableBodyData={tableRole}
            displaykeys={rolesDisplayKeys}
            tableHeadData={rolesTableHead}
          />
        </div>
      )}
      {/* table end here  */}

      {/* <Pagination /> */}
      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            {editRole ? (
              <FiEdit className="text-scudGreen text-5xl" />
            ) : (
              <MdErrorOutline className="text-red-600 text-5xl" />
            )}
            {editRole ? (
              <>
                <p className="text-lg font-semibold mt-2">Edit role details</p>
                <p className="text-sm text-textColor mt-2">You are about to edit this role</p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold mt-2">Delete role details</p>
                <p className="text-sm text-textColor mt-2">You are about to delete this role</p>
              </>
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
              onClick={() => {
                editRole ? handleEditRole() : deleteRole();
              }}
              text={editRole ? "Yes, Edit" : "Yes, Delete"}
            />
          </div>
        </div>
      </Modal>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">{successAction} deleted successfully</p>
            <p className="text-sm text-center text-textColor mt-2">
              The {successAction} role has been deleted
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
});

Roles.getLayout = Layout;
export default Roles;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  try {
    const [rolesRes] = await Promise.all([
      fetch(`${BASE_URL}roles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    ]);

    const [roles] = await Promise.all([rolesRes.json()]);
    if (roles?.statusCode !== undefined && roles?.statusCode === 401) {
      try {
        await validateToken(context, true);
      } catch (err) {
        return { redirect: { destination: `/admin/auth`, permanent: false } };
      }
    }

    return { props: { roles } };
  } catch (err) {
    console.log(err);
  }
}
