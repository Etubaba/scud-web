import React from "react";
import Layout from "../../../../components/Admin/Layout";
// import { sosreport } from "../../../../dummy";
import { AiOutlinePlus, AiOutlinePrinter, AiOutlineWarning } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import SearchInput from "../../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../../components/common/EmptyTable";
import Button from "../../../../components/common/Button";
import { BiHash, BiRefresh } from "react-icons/bi";
import { BsCalendarDate, BsPerson } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { getTimeAgo } from "../../../../components/services/getTimeAgo";
import { useState } from "react";
import { useRouter } from "next/router";
import { validateToken } from "../../../../components/services/validateToken";
import { BASE_URL } from "../../../../api/base";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTable from "../../../../components/common/table/PrintTable";
import Pagination from "../../../../components/common/Pagination";
const index = ({ reports }) => {
  const [tableFilter, setTableFilter] = useState("all");
  const [search, setSearch] = useState("");
  const sosreport = reports.data;
  const [SOSReportList, setSOSReportList] = useState(sosreport);
  const router = useRouter();

  const rows = SOSReportList?.filter((it) => {
    if (search === "") return it;
    else if (
      it.location.toLowerCase().includes(search.toLowerCase()) ||
      it.sos_options?.reason.toLowerCase().includes(search.toLowerCase())
    ) {
      return it;
    }
  }).map((element) => (
    <tr
      onClick={() =>
        router.push({
          pathname: "/admin/support/sos/sos_details",
          query: element.id
        })
      }
      className=" text-center hover:translate-x-1 cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="md:text-base text-xs p-3">{element.reporter_id}</td>
      <td className="md:text-base text-xs p-3">{element.location}</td>

      <td className="md:text-base text-textColor text-xs p-3">
        {getTimeAgo(element.created_at) +
          "/" +
          new Date(element.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          })}
      </td>
      <td className="md:text-base text-xs p-3">{element?.sos_options?.reason}</td>
      <td align="center" className="text-center ">
        {element.status === "resolved" ? (
          <div className=" max-w-[100px] ml-10 p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600 ">Resolved</p>
          </div>
        ) : (
          <div className=" max-w-[100px] ml-10 p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">Pending</p>
          </div>
        )}
      </td>
    </tr>
  ));

  const filterStatus = (status) => {
    const filteredReport = sosreport.filter((item) => {
      return item["status"] === status.toLowerCase();
    });
    setSOSReportList(filteredReport);
  };

  const getLength = (status) => {
    const filteredReport = sosreport.filter((item) => {
      return item["status"] === status.toLowerCase();
    });
    return filteredReport.length;
  };

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "sos",
    onAfterPrint: () => null
  });
  return (
    <div>
      <div className="flex flex-row  mb-5 justify-between items-center">
        <p className="md:text-lg text-sm text-title tracking-wide font-semibold">SOS Reports</p>

        <Button
          onClick={() => router.push("/admin/support/sos/sos_settings")}
          text={"SOS settings"}
          social={true}
          SocialIcon={AiOutlinePlus}
        />
      </div>

      {sosreport?.length !== 0 && (
        <div>
          <p className=" tracking-wide  mb-7 text-textColor">Emergency Reports</p>
          <div className="flex flex-col-reverse md:flex-row md:justify-between">
            <PrintTable handlePrintDoc={handlePrintDoc} table_id={"#sos_"} file_name={"sos"} />
            <SearchInput setValue={setSearch} value={search} />
          </div>
        </div>
      )}
      {sosreport?.length !== 0 && (
        <div className="flex space-x-2 items-center my-6">
          <div
            onClick={(e) => {
              setTableFilter("all", setSOSReportList(sosreport));
            }}
            className={`rounded-lg border py-1.5 px-4 flex justify-center ${
              tableFilter === "all"
                ? "border-scudGreen text-scudGreen bg-adminbg"
                : "text-textColor"
            } items-center`}
          >
            <p className="text-sm ">All ({sosreport.length})</p>
          </div>
          <div
            onClick={(e) => {
              setTableFilter("pending"), filterStatus("pending");
            }}
            className={`rounded-lg py-1.5 px-4 border flex justify-center ${
              tableFilter === "pending"
                ? "border-scudGreen text-scudGreen bg-adminbg"
                : "text-textColor"
            } items-center`}
          >
            <p className="text-sm">Pending ({getLength("pending")})</p>
          </div>
          <div
            onClick={(e) => {
              setTableFilter("resolved");
              filterStatus("resolved");
            }}
            className={`rounded-lg py-1.5 px-4 border flex justify-center ${
              tableFilter === "resolved"
                ? "border-scudGreen text-scudGreen bg-adminbg"
                : "text-textColor"
            } items-center`}
          >
            <p className="text-sm">Resolved ({getLength("resolved")})</p>
          </div>
        </div>
      )}

      {/* table start here  */}
      {sosreport?.length === 0 ? (
        <EmptyTable Icon={AiOutlineWarning} name={"SOS report"} title={"No SOS Report"} />
      ) : (
        <div
          id="sos_"
          style={{ height: window.innerHeight, width: "100%" }}
          ref={componentToPrintRef}
          className="mt-4 mb-6 bg-white  w-full overflow-x-scroll md:overflow-x-hidden border shadow pb-4  rounded-xl"
        >
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-title  text-xs">id</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2  md:mt-1" />
                    <p className="md:text-base text-xs text-title">User id</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Location</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsCalendarDate className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">Date/Time</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlineWarning className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs text-title">SOS Options</p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs text-title">Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}

      {SOSReportList?.length > 20 && (
        <Pagination setData={setSOSReportList} serverData={reports} isAdmin={true} />
      )}
    </div>
  );
};

index.getLayout = Layout;
export default index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}sos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const reports = await res.json();

  if (reports?.statusCode !== undefined && reports?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  // console.log(reports);
  return {
    props: {
      reports
    }
  };
}
