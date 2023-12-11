import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

const Api_Credentials = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <p className="text-lg mb-7 tracking-wide font-semibold">
        Manage API Credentials
      </p>
      <p className="text-sm mb-4 text-textColor">Enter APIs Credentials</p>
      <div className="  w-full bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Google Map Key</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Google Map Server Key
              </p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>

            {/* <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Status</p>
              <Select
                data={statusList}
                style={"w-full p-3"}
                positon={"p-4"}
                value={status}
                setValue={setStatus}
                dropDownWidth={" w-[16.5rem] md:w-[27rem] mt-1"}
                color=""
              />
            </div> */}
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Amazon SNS Access Key
              </p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Amazon SNS Secret</p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Amazon SNS Region</p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Amazon SNS Version</p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">FCM Server Key</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">FCM Sender Id</p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Facebook Client ID</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Facebook Client Secret
              </p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Google Client ID</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Google Client Secret
              </p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Sinch Key</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Sinch Secret Key</p>
              <Input
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple Service Id</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple Team Id</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple Key Id</p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple Key File</p>
              <Input
                type={"file"}
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
        <div className="bg-adminbg mb-4 rounded-md md:h-auto p-3 md:p-6">
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Firebase Database URL
              </p>
              <Input
                inputbg={"bg-white"}
                // value={languagename}
                // onChange={(e) => setLanguagename(e.target.value)}
                // Icon={MdGTranslate}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">
                Firebase Service Account File (JSON)
              </p>
              <Input
                type={"file"}
                inputbg={"bg-white"}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // Icon={BsTranslate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          //   disabled={disabled}
          onClick={() => {
            setSuccessModal(true);
            // setOpen(false);
          }}
          text={"Save changes"}
        />
      </div>
    </div>
  );
};

Api_Credentials.getLayout = Layout;
export default Api_Credentials;
