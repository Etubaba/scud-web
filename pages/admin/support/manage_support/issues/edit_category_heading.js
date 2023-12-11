import React, { useState } from "react";
import Layout from "../../../../../components/Admin/Layout";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import MyStatefulEditor from "../../../../../components/common/Editor";
import Input from "../../../../../components/common/Input";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../../../api/base";
import Modal from "../../../../../components/common/Modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSnackbar } from "notistack";
import Button from "../../../../../components/common/Button";
import { useEffect } from "react";

const edit_category_heading = () => {
  const router = useRouter();
  const categoryDetails = router.query;
  const [searching, setSearching] = useState("");
  const [editvalue, setEditValue] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    let first = true;
    if (first) {
      setEditValue(categoryDetails.name);
    }
    return () => {
      first = false;
    };
  }, [categoryDetails.id]);

  const addQuestion = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.patch(`${BASE_URL}support-categories/${categoryDetails.id}`, {
        name: editvalue
      });

      if (data) {
        setLoading(false);
        setSuccessModal(true);
        setEditValue("");
        router.back();
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error"
          });
        } else {
          for (let i = 0; i < msg.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error"
            });
          }
        }
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error"
        });
      }
    }
  };

  const disabled = editvalue === "" ? true : false;
  return (
    <>
      <BreadCrumbs
        index={"Manage support questions  "}
        indexPath={"/admin/support/manage_support"}
        secondItem={categoryDetails.name}
        thirditem={"Edit"}
      />
      <div className="md:mt-5 mt-8 w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="">
          <span className="text-sm text-textColor mb-7">
            <p className="text-sm text-textColor font-bold mb-2">{categoryDetails.name}</p>
          </span>
          <div className="grid grid-cols-1   gap-5 md:gap-8 mb-10">
            <div className="">
              <p className="text-sm text-textColor mb-2">Question Heading</p>
              <Input
                value={editvalue}
                onChange={(e) => setEditValue(e.target.value)}
                inputbg={"bg-white"}

                // Icon={TbWorld}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="mt-2">
              <button
                // onClick={() => router.push("/admin/admin_mgt/create_admin")}
                className="bg-white border-red-500 border flex space-x-2  text-[14px] text-red-500 px-4 rounded-md p-1 "
              >
                <span className="flex justify-between">
                  <p>Cancel</p>
                </span>
              </button>
            </div>
            <Button onClick={addQuestion} loading={loading} disabled={disabled} text={"Save"} />
          </div>
        </div>
        {/* success modal */}
        <Modal onClose={() => setSuccessModal(false)} open={successModal}>
          <div className=" w-[20rem] md:w-[24rem]  h-auto">
            <div className="flex flex-col space-y-3 justify-center items-center">
              <AiOutlineCheckCircle className="text-green-600 text-5xl" />
              <p className="text-lg font-semibold mt-2">Question edited.</p>
              <p className="text-sm text-center text-textColor mt-2">
                Question has been edited successfully.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

edit_category_heading.getLayout = Layout;
export default edit_category_heading;
