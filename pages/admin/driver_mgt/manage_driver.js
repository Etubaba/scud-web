import React, { forwardRef, useRef } from "react";
import { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineSetting
} from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsFilterCircle, BsFilterSquare, BsGenderAmbiguous, BsPerson } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GiPoliceOfficerHead, GiSteeringWheel } from "react-icons/gi";
import { GrDocumentCsv } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import DashboardCompo from "../../../components/common/DashboardCompo";
import Modal from "../../../components/common/Modal";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Pagination from "../../../components/common/Pagination";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { validateToken } from "../../../components/services/validateToken";
import Table from "../../../components/common/table/Table";
import { displayDriverkeys, driverTableHead } from "../../../components/common/table";
import PrintTable from "../../../components/common/table/PrintTable";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const ManageDriver = forwardRef(({ data, stats }) => {
  const [searchState, setSearchState] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [successAction, setSuccessAction] = useState("Deleted");
  const [checkedActive, setCheckedActive] = useState(false);
  const [checkedInActive, setCheckedInActive] = useState(false);

  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const users = data?.data;
  const drivers = users?.filter((driver) => driver?.roles.includes("driver"));
  const { inactive_drivers, active_drivers } = stats;

  const router = useRouter();

  const [driverList, setDriverList] = useState(drivers);

  const rows = driverList?.map((element) => (
    <tr
      onClick={() => {
        router.push({
          pathname: "/admin/driver_mgt/driver_profile",
          query: element.id
        });
      }}
      className=" text-center hover:shadow-lg hover:rounded-lg hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.first_name}</td>
      <td className="md:text-base text-xs p-3">{element.last_name}</td>
      <td className="md:text-base text-xs p-3">{element.email}</td>
      <td className="md:text-base text-xs p-3">
        {element.gender !== null
          ? element.gender?.charAt(0).toUpperCase() + element.gender?.slice(1)
          : "NIL"}
      </td>
      <td className="md:text-base text-xs p-3">{element.phone}</td>

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
            // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
            className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
          >
            <FiEdit className="text-white" />
          </button>
          <button
            onClick={(e) => {
              setDeleteModal(true),
                setSuccessAction(element.firstname + " " + element.lastname),
                e.stopPropagation();
            }}
            className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
          >
            <RiDeleteBin6Line className="text-white" />
          </button>
        </span>
      </td>
    </tr>
  ));

  //filter by search
  useEffect(() => {
    if (searchState === "") return;
    let filteredData;
    filteredData = drivers?.filter((user) => {
      return (
        user.first_name?.toLowerCase().includes(searchState.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchState.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchState.toLowerCase())
      );
    });
    setDriverList(filteredData);
  }, [searchState]);

  //apply filter
  const applyFilter = () => {
    if (female && !male && !checkedActive && !checkedInActive) {
      //filter by female
      const filterData = drivers.filter((user) => {
        return user.gender === "female";
      });
      setDriverList(filterData);
    } else if (!female && male && !checkedActive && !checkedInActive) {
      //filter by male
      const filterData = drivers.filter((user) => {
        return user.gender === "male";
      });
      setDriverList(filterData);
    } else if (female && !male && checkedActive && !checkedInActive) {
      //filter by active and female
      const filterData = drivers.filter((user) => {
        return user.is_active && user.gender === "female";
      });
      setDriverList(filterData);
    } else if (!female && male && checkedActive && !checkedInActive) {
      //filter by active and male
      const filterData = drivers.filter((user) => {
        return user.is_active && user.gender === "male";
      });
      setDriverList(filterData);
    } else if (!female && male && !checkedActive && checkedInActive) {
      //filter by inactive and male
      const filterData = drivers.filter((user) => {
        return user.is_active === false && user.gender === "male";
      });
      setDriverList(filterData);
    } else if (female && !male && !checkedActive && checkedInActive) {
      //filter by inactive and female
      const filterData = drivers.filter((user) => {
        return user.is_active === false && user.gender === "female";
      });
      setDriverList(filterData);
    } else if (!female && !male && !checkedActive && checkedInActive) {
      //filter by inactive
      const filterData = drivers.filter((user) => {
        return user.is_active === false;
      });
      setDriverList(filterData);
    } else if (!female && !male && checkedActive && !checkedInActive) {
      //filter by active
      const filterData = drivers.filter((user) => {
        return user.is_active;
      });
      setDriverList(filterData);
    }
  };
  // const applyFilter = () => {
  //   const filterData = drivers.filter((user) => {
  //     const isFemaleMatch = female && user.gender === "female";
  //     const isMaleMatch = male && user.gender === "male";
  //     const isActiveMatch = checkedActive && user.is_active;
  //     const isInactiveMatch = checkedInActive && !user.is_active;

  //     return (isFemaleMatch || isMaleMatch) && (isActiveMatch || isInactiveMatch);
  //   });
  //   setDriverList(filterData);
  // };

  //table actions
  const action = [
    {
      label: "delete",
      iconName: <RiDeleteBin6Line className="text-white" />,
      function: (e) => {
        setDeleteModal(true),
          setSuccessAction(element.firstname + " " + element.lastname),
          e.stopPropagation();
      }
    },
    {
      label: "edit",
      iconName: <FiEdit className="text-white" />,
      function: () => console.log("edit worked")
    }
  ];

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "manage_drivers",
    onAfterPrint: () => null
  });
  return (
    <div>
      <div className="flex flex-col md:flex-row mb-5  md:mb-10 justify-center md:justify-between items-center">
        <p className="text-lg mb-4 md:mb-0 tracking-wide font-semibold">Manage Drivers</p>
        {/* <span className="">
          <button
            onClick={() => router.push("/admin/driver_mgt/add-driverpages/add_driver")}
            className="bg-scudGreen flex space-x-2 hover:to-blue-500 text-[14px] text-white rounded-md p-2 "
          >
            <AiOutlinePlus className="text-xl " />
            &nbsp;Add Driver
          </button>
        </span> */}
      </div>
      <div className="grid my-10 w-full grid-cols-1 md:grid-cols-3  gap-4 ">
        <DashboardCompo
          title={"Total Drivers"}
          value={`${drivers?.length}`}
          filled={true}
          Icon={GiSteeringWheel}
          color="indigo"
        />
        <DashboardCompo
          title={"Inactive Drivers"}
          value={inactive_drivers}
          filled={true}
          Icon={GiSteeringWheel}
          color="red"
        />
        <DashboardCompo
          title={"Active Drivers"}
          value={active_drivers}
          filled={true}
          Icon={GiSteeringWheel}
          color="green"
        />
      </div>
      <div className="flex mb-8 items-center justify-between">
        <p>List of Drivers</p>
        <Button
          SocialIcon={BsFilterCircle}
          social={true}
          onClick={() => setFilterModal(true)}
          text={"Filter Drivers"}
        />
      </div>
      <div className="flex md:flex-row items-center flex-col-reverse justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#manage_drivers"}
          file_name={"manage drivers"}
        />
        <SearchInput value={searchState} setValue={setSearchState} />
      </div>
      {/* table start here  */}
      {drivers.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={GiPoliceOfficerHead} title="No driver" name={"driver"} />
        </div>
      ) : (
        // <div

        // >
        <div
          ref={componentToPrintRef}
          id="manage_drivers"
          style={{ height: window.innerHeight, width: "100%" }}
          className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl"
        >
          <table className="w-full min-w-[700px] ">
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
                    <p className="md:text-base text-xs ">First Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Last Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Email Address</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsGenderAmbiguous className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Sex</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Phone</p>
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
        // </div>
      )}
      {/* table end here  */}
      <Pagination setData={setDriverList} serverData={data} isAdmin={true} />
      {/* <Pagination /> */}

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[18rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Delete Driver</p>
            <p className="text-sm text-textColor mt-2">You are about to delete a driver.</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border hover:bg-slate-50 px-4 py-1 rounded-md text-sm font-semibold text-textColor mr-2"
            >
              No,Cancel
            </button>
            <Button
              onClick={() => {
                setSuccessModal(true);
                setDeleteModal(false);
              }}
              text={"Yes, Delete"}
            />
          </div>
        </div>
      </Modal>
      {/* success modal */}
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Driver deleted successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Driver has been deleted from driver list.
            </p>
          </div>
        </div>
      </Modal>
      {/* Filter modal */}
      <Modal title="Filter Drivers" onClose={() => setFilterModal(false)} open={filterModal}>
        <div className="md:w-[24rem]  h-auto">
          <div className="border-b my-4" />

          <div className="mb-6">
            <p className="text-sm text-[#1E202B]">Filter by driver's status</p>
            <div className="w-full text-textColor bg-adminbg flex space-x-12 justify-start items-center rounded-lg p-3 mt-3">
              <div className="flex space-x-2 items-center">
                <div
                  onClick={() => {
                    setCheckedActive(!checkedActive);
                    setCheckedInActive(false);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    checkedActive ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {checkedActive && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-sm tracking-wider text-[#3D4151] my-2">Active</label>
              </div>
              <div className="flex space-x-2 items-center">
                <div
                  onClick={() => {
                    setCheckedActive(false);
                    setCheckedInActive(!checkedInActive);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    checkedInActive ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {checkedInActive && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-sm tracking-wider text-[#3D4151] my-2">Inactive</label>
              </div>
            </div>
          </div>
          {/* <div className="mb-6">
            <p className="text-sm text-[#1E202B]">Filter by driver's levels</p>
            <div className="w-full text-textColor bg-adminbg flex space-x-12 justify-start items-center rounded-lg p-3 mt-3">
              <span className="flex justify-center items-center space-x-2">
                <input
                  value={tier1}
                  onChange={(event) => {
                    setTier1(event.currentTarget.checked), setTier2(false);
                    setTier3(false);
                  }}
                  type={"checkbox"}
                />

                <p className="mb-1 text-sm">Tier 1</p>
              </span>
              <span className="flex justify-center items-center space-x-2">
                <input
                  value={tier2}
                  onChange={(event) => {
                    setTier2(event.currentTarget.checked), setTier1(false);
                    setTier3(false);
                  }}
                  type={"checkbox"}
                />

                <p className="mb-1 text-sm">Tier 2</p>
              </span>
              <span className="flex justify-center items-center space-x-2">
                <input
                  value={tier3}
                  onChange={(event) => {
                    setTier3(event.currentTarget.checked), setTier2(false);
                    setTier1(false);
                  }}
                  type={"checkbox"}
                />

                <p className="mb-1 text-sm">Tier 3</p>
              </span>
            </div>
          </div> */}
          <div className="mb-6">
            <p className="text-sm text-[#1E202B]">Filter by driver's gender</p>
            <div className="w-full text-textColor bg-adminbg flex space-x-12 justify-start items-center rounded-lg p-3 mt-3">
              <div className="flex space-x-2 items-center">
                <div
                  onClick={() => {
                    setMale(!male), setFemale(false);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    male ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {male && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-sm tracking-wider text-[#3D4151] my-2">Male</label>
              </div>

              <div className="flex space-x-2 items-center">
                <div
                  onClick={() => {
                    setFemale(!female), setMale(false);
                  }}
                  className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
                    female ? "border-scudGreen " : "p-1.5"
                  } `}
                >
                  {female && <AiOutlineCheck className="text-scudGreen text-lg" />}
                </div>
                {/* <input type={'checkbox'} /> */}
                <label className="text-sm tracking-wider text-[#3D4151] my-2">Female</label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
            >
              Cancel
            </button>
            <Button
              disabled={!checkedActive && !checkedInActive && !male && !female ? true : false}
              onClick={applyFilter}
              text={"Apply"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
});

ManageDriver.getLayout = Layout;
export default ManageDriver;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const [driversRes, statRes] = await Promise.all([
    fetch(`${BASE_URL}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),

    fetch(`${BASE_URL}stats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [data, stats] = await Promise.all([driversRes.json(), statRes.json()]);
  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (stats.statusCode !== undefined && stats.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data,
      stats
    }
  };
}
