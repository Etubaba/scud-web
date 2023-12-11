import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../common/Button";

const SupportHeader = () => {
  const [show, setShow] = useState(false);
  const checkDriverIsloggedIn = useSelector((state) => state.auth.isDriverLoggedIn);
  const checkRiderIsloggedIn = useSelector((state) => state.auth.isRiderLoggedIn);
  const checkAdminIsloggedIn = useSelector((state) => state.auth.isAdminIn);

  useEffect(() => {
    if (
      checkAdminIsloggedIn !== false ||
      checkDriverIsloggedIn !== false ||
      checkRiderIsloggedIn !== false
    ) {
      setShow(true);
    }
  }, []);

  const router = useRouter();
  return (
    <div className=" px-3 md:px-8 py-3 z-50  font-sans flex shadow-sm bg-white sticky top-0 justify-between items-center">
      <div onClick={() => router.push("/")} className="flex justify-center items-center">
        <img src="/scudLogo.png" className="w-10 h-10 mt-0.5" alt="Scud Logo" />
      </div>

      {show && <Button onClick={() => router.push("/support/issues/ticket")} text={"Ticket"} />}
    </div>
  );
};

export default SupportHeader;
