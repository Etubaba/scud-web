import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import Input from "../../../components/common/Input";
import { Loader } from "../../../components/common/Loader";
import SigninOption from "../../../components/common/SigninOption";
import SignupForm from "../../../components/common/SignupForm";
import SignUpOtpForm from "../../../components/common/SignUpOtpForm";

function index() {
  const level = useSelector((state) => state.scud.ridersigninlevel);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [outline, setOutline] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [type, setType] = useState("password");

  return (
    <div className="bg-[url('/Rectangle138.png')]  bg-left-top flex justify-center items-center w-full p-5 h-screen">
      {level == 1 ? (
        <SignupForm signin={true} admin={true} />
      ) : (
        <SignUpOtpForm admin={true} signin={true} />
      )}
    </div>
  );
}

export default index;
