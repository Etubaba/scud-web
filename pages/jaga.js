import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompleteSignup from "../components/common/CompleteSignup";
import UploadLicenseCard from "../components/common/UploadLicenseCard";
import BackDrop from "../components/common/BackDrop";
import { refreshToken, validateToken } from "../components/services/validateToken";
import { BASE_URL } from "../api/base";
import { setCookie } from "cookies-next";
import SignUpOtpForm from "../components/common/SignUpOtpForm";

import SignupForm from "../components/common/SignupForm";
import Table from "../components/common/table/Table";
import { BsGenderAmbiguous, BsPerson } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BiHash } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import RefreshIcon from "../components/common/RefreshIcon";
import { useReducer } from "react";
import Carousel from "../components/slider/CustomCarousel";
import { getTimeAgo } from "../components/services/getTimeAgo";
import { Testing } from "../components/Testing";
import VehicleDetails from "../components/common/VehicleDetailsCard";

const jaga = React.forwardRef(({ data }) => {
  const [isDriverFound, setIsDriverFound] = useState(false);
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    { counts: 60 * 5, hidden: false }
  );

  const users = data?.data;

  const dispatch = useDispatch();
  const center = useSelector((state) => state.scud.origin);
  const destination = useSelector((state) => state.scud.destination);

  const dataHead = [
    {
      name: "Id",
      iconName: <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "First Name",
      iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Last Name",
      iconName: <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Email",
      iconName: <AiOutlineMail className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Gender",
      iconName: <BsGenderAmbiguous className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Phone",
      iconName: <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Date",
      iconName: <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
    },
    {
      name: "Status",
      iconName: <RefreshIcon />
    }
  ];

  const displaykeys2 = [
    {
      key: "id"
    },
    {
      key: "first_name"
    },
    {
      key: "last_name"
    },
    {
      key: "email"
    },
    {
      key: "gender"
    },
    {
      key: "phone"
    },
    {
      key: "created_at",
      func: getTimeAgo
    },
    {
      key: "is_active"
    }
  ];

  const action = [
    {
      label: "delete",
      iconName: <RiDeleteBin6Line className="text-white" />,
      function: () => console.log("detete worked")
    },
    {
      label: "edit",
      iconName: <FiEdit className="text-white" />,
      function: () => console.log("edit worked")
    }
  ];

  return (
    <div>
      {/* <Testing /> */}
      <div className="flex justify-between px-20 pt-10">
        <p
        // onClick={() => handleCount()}
        >
          Action
        </p>
        <p>{isDriverFound ? "Yes" : "Loading"}</p>
      </div>

      <div>
        <VehicleDetails />
      </div>
    </div>
  );
});

export default jaga;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    const isAdmin = true;
    try {
      await validateToken(context, isAdmin);
    } catch (err) {
      const login_url = isAdmin ? `/admin/auth` : `/signin/driver-signin`;
      return { redirect: { destination: login_url, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
