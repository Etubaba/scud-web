import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsFilterSquare } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import Layout from "../../../components/Admin/Layout";
import Select2 from "../../../components/admincomponents/Select2";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { CgArrowTopRight } from "react-icons/cg";
import Duration from "../../../components/admincomponents/Duration";
import PrintTable from "../../../components/common/table/PrintTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { forwardRef } from "react";
import { BASE_URL } from "../../../api/base";
import { validateToken } from "../../../components/services/validateToken";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Earnings = ({ data }) => {
  const [location, setLocation] = useState("Filter Region");
  const EarningState = useSelector((state) => state.scud.earnings);
  const [time, setTime] = useState("daily");
  const totalEarn =
    EarningState.data.length == 0
      ? 0
      : EarningState.data.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
      },0);
  
  
  
  const [series, setSeries] = useState([
    {
      name: "Earnings",
      data: EarningState.data
    }
  ]);

  const [options, setOption] = useState({
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },

    dataLabels: {
      enabled: false
    },

    xaxis: {
      zoom: {
        enabled: false
      },
      categories: EarningState.category
    }
  });

  useEffect(() => {
    setSeries([
      {
        name: "Earnings",
        data: EarningState.data
      }
    ]);
    setOption({
      chart: {
        type: "area",
        zoom: {
          enabled: false
        }
      },

      dataLabels: {
        enabled: false
      },

      xaxis: {
        zoom: {
          enabled: false
        },
        categories: EarningState.category
      }
    });
  }, [EarningState]);

  const states = [
    "Abuja",
    "Lagos",
    "Port Harcourt",
    "Ibadan",
    "Abuja",
    "Sokoto",
    "Abuja",
    "Abuja",
    "Abuja",
    "Abuja"
  ];

  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);

  const width = adminSidebar ? 1170 : 1000;

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "Earnings",
    onAfterPrint: () => null
  });
  return (
    <div>
      <p className="text-lg tracking-wide mb-8  font-semibold">Manage Earnings</p>
      <div className="md:flex justify-between">
        <div className="block md:hidden mb-5">
          <Select2
            data={states}
            Icon={BsFilterSquare}
            setValue={setLocation}
            value={location}
            position={"mt-[20rem]"}
          />
        </div>
        <PrintTable hideCsv={true} hideExcel={true} handlePrintDoc={handlePrintDoc} />
        <div className="hidden md:block">
          <Select2
            data={states}
            Icon={BsFilterSquare}
            setValue={setLocation}
            value={location}
            position={"mt-[20rem]"}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl  mt-5 w-full  px-3 pt-5 shadow h-auto ">
        <p className="text-xs mb-2 text-[#9E9FA3]">Today's total earning</p>

        <div className="md:flex justify-between">
          <div className="flex mb-3 justify-start items-end space-x-2">
            <p className="text-xl font-semibold ">₦</p>
            <p className="text-2xl font-semibold">{totalEarn}</p>
            <div className="flex space-x-2 mb-1">
              <div className=" bg-green-600 -mr-1 h-3 w-3 rounded-full flex justify-center items-center">
                <CgArrowTopRight className="text-white text-[9px]" />
              </div>
              <p className="text-green-600 text-xs">1.2%</p>
            </div>
            <p className="text-sm mb-0.5 font-[50] text-[#9E9FA3]">VS {""} YESTERDAY</p>
          </div>
          <Duration earning={data} setTime={setTime} time={time} />
        </div>

        <div
          ref={componentToPrintRef}
          className="w-full max-w-[500px] md:max-w-none overflow-x-auto overflow-y-hidden -ml-2 h-full"
        >
          {typeof window !== "undefined" && (
            <Chart width={width} height={300} options={options} series={series} type="area" />
          )}
        </div>
      </div>
    </div>
  );
};

Earnings.getLayout = Layout;
export default Earnings;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}payments/earnings/admin`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      data
    }
  };
}
