import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

export const AuthCompo = ({ type, description, buttontext, path }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-52 space-y-3">
      <div className="border-b w-12 border-gray-400 border-2" />
      <p className="font-sans font-light text-2xl md:text-3xl">{type}</p>
      <p className="tracking-wider text-sm font-sans">{description}</p>
      <Button onClick={() => router.push(path)} icon={true} text={buttontext} />
    </div>
  );
};
