import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import {
  AiOutlineApple,
  AiOutlineCheckCircle,
  AiOutlineGooglePlus,
  AiOutlineInstagram,
  AiOutlineYoutube
} from "react-icons/ai";
import { BsHash } from "react-icons/bs";

import { TbBrandFacebook, TbBrandLinkedin, TbBrandPinterest, TbBrandTwitter } from "react-icons/tb";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";

const Joinus = () => {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [instagram, setInstaggram] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [youtube, setYoutube] = useState("");

  const [applestoreD, setApplestoreD] = useState("");
  const [applestoreR, setApplestoreR] = useState("");

  const [playstoreD, setPlaystoreD] = useState("");
  const [playstoreR, setPlaystoreR] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [successModal, setSuccessModal] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const addLink = async () => {
    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    try {
      const formData = {
        keys: [
          "APPLE_STORE_DRIVER_LINK",
          "PLAY_STORE_DRIVER_LINK",
          "APPLE_STORE_RIDER_LINK",
          "PLAY_STORE_RIDER_LINK",
          "FACEBOOK_LINK",
          "LINKEDIN_LINK",
          "INSTAGRAM_LINK",
          "YOUTUBE_LINK",
          "PINTEREST_LINK"
        ],
        values: [
          applestoreD,
          playstoreD,
          applestoreR,
          playstoreR,
          facebook,
          linkedin,
          instagram,
          youtube,
          pinterest
        ]
      };

      const { data } = await axios.patch(`${BASE_URL}settings/many`, formData);
      if (data) {
        setSuccessModal(true);
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          if (msg === "Unauthorized" || err.response.data.statusCode == 401) {
            enqueueSnackbar(`Try again, something went wrong`, {
              variant: "info"
            });
          } else
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
      }
    }
  };

  if (successModal) setTimeout(() => setSuccessModal(false), 3000);

  return (
    <div>
      {" "}
      <p className="text-xl text-textColor">Join Us Links</p>
      <div className="md:mt-10 mt-8 w-full  bg-white border shadow-sm rounded-md p-3 md:p-6">
        <p className="text-sm font-semibold text-textColor mb-2">Enter Social Handle Links</p>
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          {/* <p className="text-sm text-textColor mb-7"> </p> */}
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">FaceBook</p>
              <Input
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                Icon={TbBrandFacebook}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Twitter</p>
              <Input
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                Icon={TbBrandTwitter}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">LinkedIn</p>
              <Input
                value={linkedin}
                onChange={(e) => setLinkedIn(e.target.value)}
                Icon={TbBrandLinkedin}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Instagram</p>
              <Input
                value={instagram}
                onChange={(e) => setInstaggram(e.target.value)}
                Icon={AiOutlineInstagram}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Youtube </p>
              <Input
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                Icon={AiOutlineYoutube}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Pinterest</p>
              <Input
                value={pinterest}
                onChange={(e) => setPinterest(e.target.value)}
                Icon={TbBrandPinterest}
              />
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold text-textColor mt-5 mb-2">Enter Stores links</p>
        <div className="bg-adminbg rounded-md md:h-auto p-3 md:p-6">
          {/* <p className="text-sm text-textColor mb-7"> </p> */}
          <div className="grid grid-cols-1   md:grid-cols-2 gap-5 md:gap-8">
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple store link for rider</p>
              <Input
                value={applestoreR}
                onChange={(e) => setApplestoreR(e.target.value)}
                Icon={AiOutlineApple}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Apple store link for driver</p>
              <Input
                value={applestoreD}
                onChange={(e) => setApplestoreD(e.target.value)}
                Icon={AiOutlineApple}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2">Playstore link for rider</p>
              <Input
                value={playstoreR}
                onChange={(e) => setPlaystoreR(e.target.value)}
                Icon={AiOutlineGooglePlus}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm text-textColor mb-2"> Playstore link for driver</p>
              <Input
                value={playstoreD}
                onChange={(e) => setPlaystoreD(e.target.value)}
                Icon={AiOutlineGooglePlus}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7 justify-between ">
        <button
          onClick={() => router.push("/driver_profile/driver_payment")}
          className="bg-white border min-w-[120px] md:min-w-[150px] hover:bg-slate-50 px-4 py-1 rounded-md text-sm  text-textColor mr-2"
        >
          Back
        </button>
        <Button
          // disabled={disabled}
          onClick={addLink}
          text={"Save Changes"}
        />
      </div>
      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg font-semibold mt-2">Links added successfully.</p>
            <p className="text-sm text-center text-textColor mt-2">
              Join us links has been added successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Joinus.getLayout = Layout;
export default Joinus;
