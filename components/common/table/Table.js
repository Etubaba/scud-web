import { useRouter } from "next/router";
import { AiOutlineSetting } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

function Table({ ref, tableHeadData, tableBodyData, actions, displaykeys, rowPath }) {
  const router = useRouter();
  return (
    <div
      ref={ref}
      id="roles_permission"
      className="mt-5 mb-6 bg-white w-full overflow-auto md:overflow-x-hidden border shadow pb-4  rounded-xl"
    >
      <table className="w-full min-w-[700px] ">
        <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
          <tr className="border-b">
            {tableHeadData.map((headItem, index) => (
              <td className="md:py-4 py-2" key={index}>
                {headItem.name === "status" ? (
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>
                    <p className="md:text-base text-xs ">Status</p>
                  </div>
                ) : (
                  <div className="flex md:text-base text-xs justify-center">
                    {headItem.iconName}
                    <p className="md:text-base text-xs">{headItem.name}</p>
                  </div>
                )}
              </td>
            ))}

            {actions !== undefined && (
              <td>
                {" "}
                <div className="flex   justify-center">
                  <AiOutlineSetting className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                  <p className="md:text-base text-xs ">Actions</p>
                </div>
              </td>
            )}
          </tr>
        </thead>
        <tbody>
          {tableBodyData.map((rowData, rowIndex) => (
            <tr
              onClick={() => {
                if (rowPath !== undefined) router.push({ pathname: rowPath, query: rowData.id });
                else return;
              }}
              className=" text-center py-3  cursor-pointer transition-all hover:border text-sm  text-textColor border-b"
              key={rowIndex}
            >
              {displaykeys.map((key, cellIndex) => (
                <td className="md:text-base text-xs p-3" key={cellIndex}>
                  {key.key === "is_active" ? (
                    <div>
                      {rowData[key.key] === true ? (
                        <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
                          <p className="text-green-600 text-xs">Active</p>
                        </div>
                      ) : (
                        <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
                          <p className="text-red-600 text-xs">Inactive</p>
                        </div>
                      )}
                    </div>
                  ) : key.key === "status" ? (
                    <div
                      className={`max-w-[100px] p-1  rounded-lg ${
                        rowData[key.key] === "completed"
                          ? "bg-[#f2fbf6]"
                          : rowData[key.key] === "canceled"
                          ? "bg-[#fff4f4]"
                          : "bg-[#F2F5FF]"
                      } `}
                    >
                      <p
                        className={`${
                          rowData[key.key] === "completed"
                            ? "text-green-600"
                            : rowData[key.key] === "canceled"
                            ? "text-red-600"
                            : "text-scudGreen"
                        } `}
                      >
                        {rowData[key.key] === "completed"
                          ? "Completed"
                          : rowData[key.key] === "canceled"
                          ? "Canceled"
                          : "Ongoing"}
                      </p>
                    </div>
                  ) : (
                    <p>
                      {key.hasOwnProperty("func") ? key.func(rowData[key.key]) : rowData[key.key]}
                    </p>
                  )}
                </td>
              ))}

              {actions !== undefined && (
                <td>
                  {" "}
                  <span className="flex space-x-3 justify-center">
                    {actions.map((actn, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          actn.function(rowData);
                        }}
                        className={` ${
                          actn.label === "edit"
                            ? "bg-scudGreen"
                            : actn.label === "view"
                            ? "bg-green-600"
                            : "bg-red-600"
                        } border flex space-x-2 hover:to-blue-500 text-white cursor-pointer  rounded-md p-1`}
                      >
                        {actn.iconName}
                      </button>
                    ))}{" "}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
