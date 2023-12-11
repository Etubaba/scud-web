import React, { forwardRef, useEffect, useRef } from "react";
import { BsFilterSquare, BsGenderAmbiguous, BsPerson } from "react-icons/bs";

import Layout from "../../../components/Admin/Layout";
import DashboardCompo from "../../../components/common/DashboardCompo";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Select2 from "../../../components/admincomponents/Select2";
import Pagination from "../../../components/common/Pagination";
import { AiOutlineMail, AiOutlinePhone, AiOutlinePrinter, AiOutlineSetting } from "react-icons/ai";

import { MdOutlineLocationOn } from "react-icons/md";
import { useState } from "react";
import { BiHash, BiRefresh } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import { BASE_URL, STATE_URL } from "../../../api/base";
import EmptyTable from "../../../components/common/EmptyTable";
import { HiOutlineUserGroup } from "react-icons/hi";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useReactToPrint } from "react-to-print";

const Rider = forwardRef(({ data, stats, states, trips: totalTrips }) => {
  const users = data?.data;
  const riders = users?.filter((rider) => rider?.roles.includes("rider"));
  const [filter, setFilter] = useState("Filter Riders");
  const [location, setLocation] = useState("Locations");
  const [search, setSearch] = useState("");
  const [riderList, setRiderList] = useState(riders);
  const router = useRouter();
  const trips = totalTrips?.data;

  const completedTripsCount = trips.filter((item) => item.status === "completed");
  const canceledTripsCount = trips.filter((item) => item.status === "canceled");

  const stateList = states?.map((item) => item.name);

  const filterOptions = {
    option1: {
      title: "Filter By Status :",
      value1: "Active Riders",
      value2: "Inactive Riders"
    },
    option2: {
      title: "Filter By Gender :",
      value1: "Male",
      value2: "Female"
    },
    func: applyFilter
  };

  useEffect(() => {
    if (location === "Locations") return;
    const filterriders = riders.filter(
      (el) => el.state?.name?.toLowerCase() == location.toLowerCase()
    );
    setRiderList(filterriders);
  }, [location]);

  const rows = riderList
    .filter((item) => {
      if (search === "") return item;
      else if (
        item?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    })
    ?.map((element) => (
      <tr
        onClick={() => {
          router.push({
            pathname: "/admin/rider_mgt/rider_profile",
            query: element.id
          });
        }}
        className=" text-center hover:translate-x-2  hover:shadow-md hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-base text-xs p-3">{element.id}</td>
        <td className="md:text-base text-xs p-3">{element.first_name}</td>
        <td className="md:text-base text-xs p-3">{element.last_name}</td>
        <td className="md:text-base text-xs p-3">{element.email}</td>
        <td className="md:text-base text-xs p-3">{element.gender}</td>
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
              onClick={() => {
                setDeleteModal(true);
                // setSuccessAction(element.first_name + " " + element.lastname);
              }}
              className="bg-red-600 border flex space-x-2 hover:to-red-300   rounded-md p-1"
            >
              <RiDeleteBin6Line className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "riders_management",
    onAfterPrint: () => null
  });

  function applyFilter(active, inactive, male, female) {
    if (female && !male && !active && !inactive) {
      //filter by female
      const filterData = riders.filter((user) => {
        return user.gender === "female";
      });
      setRiderList(filterData);
    } else if (!female && male && !active && !inactive) {
      //filter by male
      const filterData = riders.filter((user) => {
        return user.gender === "male";
      });
      setRiderList(filterData);
    } else if (female && !male && active && !inactive) {
      //filter by active and female
      const filterData = riders.filter((user) => {
        return user.is_active && user.gender === "female";
      });
      setRiderList(filterData);
    } else if (!female && male && active && !inactive) {
      //filter by active and male
      const filterData = riders.filter((user) => {
        return user.is_active && user.gender === "male";
      });
      setRiderList(filterData);
    } else if (!female && male && !active && inactive) {
      //filter by inactive and male
      const filterData = riders.filter((user) => {
        return user.is_active === false && user.gender === "male";
      });
      setRiderList(filterData);
    } else if (female && !male && !active && inactive) {
      //filter by inactive and female
      const filterData = riders.filter((user) => {
        return user.is_active === false && user.gender === "female";
      });
      setRiderList(filterData);
    } else if (!female && !male && !active && inactive) {
      //filter by inactive
      const filterData = riders.filter((user) => {
        return user.is_active === false;
      });
      setRiderList(filterData);
    } else if (!female && !male && active && !inactive) {
      //filter by active
      const filterData = riders.filter((user) => {
        return user.is_active;
      });
      setRiderList(filterData);
    }
  }
  return (
    <div>
      {" "}
      <p className="tracking-wide  font-semibold text-lg">Manage Riders</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10 mt-6 gap-4 ">
        <DashboardCompo
          link={"/admin/trips_mgt/trips"}
          title={"Total Trips"}
          value={trips.length}
          filled={true}
          Icon={BsPerson}
        />
        <DashboardCompo
          title={"Completed Trips"}
          link={"/admin/trips_mgt/trips"}
          value={completedTripsCount.length}
          filled={true}
          color="green"
          Icon={BsPerson}
        />

        <DashboardCompo
          title={"Canceled Rides"}
          value={canceledTripsCount.length}
          color="red"
          filled={true}
          Icon={BsPerson}
          link={"/admin/trips_mgt/ride_request"}
        />
      </div>
      <div className="flex items-center mb-10 justify-between">
        {" "}
        <p className="font-semibold text-sm">List of Riders</p>
        <SearchInput value={search} setValue={setSearch} />
      </div>
      <div>
        <div className="space-y-5  sm:space-y-0 flex justify-between flex-wrap">
          {" "}
          <PrintTable
            handlePrintDoc={handlePrintDoc}
            table_id={"#riders_managt"}
            file_name={"riders_management"}
          />
          <div className="flex space-x-3 items-center">
            {/* <DateInput setValue={setDateValue} value={dateValue} /> */}
            <Select2
              data={stateList}
              Icon={MdOutlineLocationOn}
              setValue={setLocation}
              value={location}
              position={"mt-[18rem]"}
            />

            <Select2
              position={"mt-[16rem]"}
              filter={true}
              filterOptions={filterOptions}
              Icon={BsFilterSquare}
              setValue={setFilter}
              value={filter}
              multiple={true}
            />
          </div>
        </div>
      </div>
      {/* table start here  */}
      {riders.length === 0 ? (
        <div className="mt-4">
          <EmptyTable title={"No rider records"} Icon={HiOutlineUserGroup} name="rider" />
        </div>
      ) : (
        <div
          id="riders_managt"
          style={{ height: window.innerHeight, width: "100%" }}
          ref={componentToPrintRef}
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
      )}
      {/* table end here  */}
      {/* <Pagination /> */}
    </div>
  );
});

Rider.getLayout = Layout;
export default Rider;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const [riderRes, statRes, stateRes, tripRes] = await Promise.all([
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
    }),
    fetch(`${STATE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}trips?type=trips`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [data, stats, states, trips] = await Promise.all([
    riderRes.json(),
    statRes.json(),
    stateRes.json(),
    tripRes.json()
  ]);

  if (
    (data?.statusCode !== undefined && data?.statusCode === 401) ||
    (stats.statusCode !== undefined && stats.statusCode === 401) ||
    states?.statusCode === 401 ||
    trips?.statusCode === 401
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
      stats,
      states,
      trips
    }
  };
}
