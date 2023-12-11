import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const PreviewImage = ({
  files,
  files2,
  setFiles,
  setFiles2,
  index = 0,
  signup,
}) => {
  const handleRemovetag = (tag1, tag2) => {
    const newArr = files.filter((tag) => {
      return tag !== tag1;
    });
    const newArr2 = files2.filter((tag) => {
      return tag.name !== tag2.name;
    });
    setFiles(newArr);
    setFiles2(newArr2);
  };

  const handleDeleteImage = (index) => {
    let newFiles = [...files];
    let newFiles2 = [...files2];
    newFiles[index] = null;
    newFiles2[index] = null;
    setFiles(newFiles);
    setFiles2(newFiles2);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div
        onClick={() =>
          signup === undefined
            ? handleRemovetag(files[index], files2[index])
            : handleDeleteImage(index)
        }
        className="z-30 w-full  flex justify-end items-end "
      >
        <div className="p-1 bg-gray-200 hover:bg-adminbg/50 rounded-md">
          <AiOutlineClose className="text-[18px] text-red-600   " />
        </div>
      </div>
      <img
        src={files[index]}
        className="rounded object-contain -mt-3 mb-2 max-w-full h-[130px]"
      />
    </div>
  );
};

export default PreviewImage;
