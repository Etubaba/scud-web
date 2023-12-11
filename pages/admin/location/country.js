import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AiOutlinePhone, AiOutlinePlus, AiOutlinePrinter, AiOutlineSetting } from "react-icons/ai";
import { BiHash, BiRefresh } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdGTranslate, MdLanguage } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import SearchInput from "../../../components/admincomponents/SearchInput";
import EmptyTable from "../../../components/common/EmptyTable";
import Pagination from "../../../components/common/Pagination";
import { editCountry } from "../../../features/editSlice";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useReactToPrint } from "react-to-print";
// import { country } from '../../../dummy';

const Country = ({ data }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const countries = data;
  const rows = countries
    .filter((item) => {
      if (search === "") return item;
      else if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
        return item;
      }
    })
    .map((element) => (
      <tr
        className=" text-center  hover:rounded-lg hover:border text-sm  text-textColor border-b"
        key={element.id}
      >
        <td className="md:text-sm text-xs p-3">{element.id}</td>
        <td className="md:text-sm  text-xs p-3">{element.name}</td>
        <td className="md:text-sm text-xs p-3">{element.iso3}</td>
        <td className="md:text-sm text-xs p-3">{element.phone_code}</td>

        <td className="text-center">
          <div className="flex justify-center items-center">
            {element.is_active ? (
              <div className=" max-w-[100px] px-3 py-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-xs">Active</p>
              </div>
            ) : (
              <div className=" max-w-[100px] px-3 p-1 rounded-lg bg-[#fff4f4]">
                <p className="text-red-600  text-xs">Inactive</p>
              </div>
            )}
          </div>
        </td>
        <td className="md:text-base text-xs p-3 ">
          <span className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                router.push("/admin/location/add/add_country");
                dispatch(editCountry(element));
              }}
              className="bg-scudGreen border flex space-x-2 hover:to-blue-500   rounded-md p-1"
            >
              <FiEdit className="text-white" />
            </button>
          </span>
        </td>
      </tr>
    ));

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "countries",
    onAfterPrint: () => null
  });

  return (
    <div>
      {" "}
      <div className="flex flex-row mb-7 md:mb-5 justify-between items-center">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Manage Country</p>
        {/* <span className="">
               <button
                  onClick={() => router.push('/admin/location/add/add_country')}
                  className="bg-scudGreen flex space-x-2 hover:bg-scudGreenHover text-[8px] md:text-[14px] text-white rounded-md p-2 "
               >
                  <AiOutlinePlus className="md:text-xl md:mt-0 -mt-0.5 text-sm" />
                  &nbsp;Add Country
               </button>
            </span> */}
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <PrintTable
          handlePrintDoc={handlePrintDoc}
          table_id={"#countries_"}
          file_name={"countries"}
        />
        <SearchInput value={search} setValue={setSearch} style={"mb-4 md:mb-0"} />
      </div>
      {/* table start here  */}
      {countries.length === 0 ? (
        <div className="mt-4">
          <EmptyTable Icon={TbWorld} title={"No country "} name="countries" />
        </div>
      ) : (
        <div
          id="countries_"
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
                    <MdLanguage className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Country</p>
                  </div>
                </td>
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <HiOutlineDocumentText className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Short Name</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Phone code</p>
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
};

Country.getLayout = Layout;
export default Country;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}countries`, {
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
