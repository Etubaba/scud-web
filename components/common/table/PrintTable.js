import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import FileSaver from "file-saver";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function downloadCsv(table_id, file_name) {
  let csv = [];
  const rows = document.querySelectorAll(`${table_id} tr`);

  for (const row of rows.values()) {
    const cells = row.querySelectorAll("td, th");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;"
  });

  FileSaver.saveAs(csvFile, `${file_name}.csv`);
}
function downloadExcel(table_id, file_name) {
  let csv = [];
  const rows = document.querySelectorAll(`${table_id} tr`);

  for (const row of rows.values()) {
    const cells = row.querySelectorAll("td, th");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/xls;charset=utf-8;"
  });

  FileSaver.saveAs(csvFile, `${file_name}.xls`);
}

const PrintTable = ({ table_id, file_name, handlePrintDoc, hideExcel, hideCsv, hidePrint }) => {
  return (
    <div className="flex mt-6 md:mt-0 space-x-5">
      {!hideCsv && (
        <button
          onClick={() => downloadCsv(table_id, file_name)}
          className="bg-[#F2F5FF] justify-center  items-center border hover:border-scudGreen hover:text-scudGreen flex space-x-2  text-[14px]  rounded-md p-1 px-3"
        >
          <GrDocumentCsv className=" hover:text-scudGreen" /> <p>CSV</p>
        </button>
      )}
      {!hideExcel && (
        <button
          onClick={() => downloadExcel(table_id, file_name)}
          className="bg-[#F2F5FF] justify-center items-center hover:border-scudGreen hover:text-scudGreen border flex space-x-2  text-[14px]  rounded-md p-1 px-3"
        >
          <SiMicrosoftexcel className=" hover:text-scudGreen" /> &nbsp;&nbsp;Excel
        </button>
      )}
      {!hidePrint && (
        <button
          onClick={() => handlePrintDoc()}
          className="bg-[#F2F5FF] justify-center items-center  border hover:border-scudGreen hover:text-scudGreen flex space-x-2  text-[14px]  rounded-md p-1 px-3"
        >
          <AiOutlinePrinter className=" hover:text-scudGreen" /> &nbsp;&nbsp;Print
        </button>
      )}
    </div>
  );
};

export default PrintTable;
