import React from "react";
import { useRef } from "react";
import PrintTable from "./common/table/PrintTable";

export const Testing = React.forwardRef(() => {
  const doctoprint = useRef();

  return (
    <>
      <PrintTable
        catchRef={doctoprint.current}
        table_id={"#admin_users"}
        file_name={"admin_users"}
          />{" "}
          
          
      <div ref={doctoprint}>jdjdj</div>
    </>
  );
});
