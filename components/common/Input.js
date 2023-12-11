import React, { useState } from "react";
import "animate.css";
import Dropzone from "react-dropzone";
import { MdOutlineFilePresent } from "react-icons/md";

// import { IoIosMail } from "react-icons/io";

const Input = ({
  col,
  row,
  textArea,
  defaultValue,
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  Icon,
  placeholder,
  disable,
  label,
  iconbg,
  type,
  inputbg,
  style,
  setFile
}) => {
  const [outline, setOutline] = useState(false);

  if (textArea) {
    return (
      <div
        className={`w-full ${inputbg !== undefined ? inputbg : ""} px-2 rounded-md py-1.5 border ${
          outline ? " border-scudGreen" : "border-[#E5E5E4]"
        }`}
      >
        <textarea
          className={`placeholder:text-sm t h-40 ${
            inputbg !== undefined ? inputbg : "bg-adminbg"
          }  w-full outline-none`}
          defaultValue={defaultValue}
          id={label}
          cols={col}
          rows={row}
          type={type}
          disabled={disable}
          onBlur={() => {
            setOutline(false);
          }}
          onFocus={() => {
            setOutline(true);
          }}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
  return (
    <div
      className={`w-full px-2 rounded-md py-1.5 border ${
        outline ? " border-scudGreen" : "border-[#E5E5E4]"
      } ${inputbg !== undefined ? inputbg : ""}   `}
    >
      <div className="flex w-full ">
        {type === "file" ? (
          <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex space-x-2 m-1 text-textColor items-center">
                    <MdOutlineFilePresent className="text-" />
                    <p className="text-xs">{value === null ? "Upload file" : "File uploaded"}</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        ) : (
          <input
            className={`placeholder:text-xs ${style !== undefined ? style : ""} ${
              inputbg !== undefined ? inputbg : "bg-adminbg"
            } text-[13px] text-textColor  w-full outline-none`}
            id={label}
            type={type}
            disabled={disable}
            onBlur={() => {
              setOutline(false);
              if (onBlur !== undefined) {
                onBlur();
              }
            }}
            onFocus={() => {
              setOutline(true);
              if (onFocus !== undefined) {
                onFocus();
              }
            }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}
        {Icon !== undefined && (
          <div>
            {iconbg ? (
              <div className="bg-[#F2F5FF] shadow-sm rounded-md p-1">
                <Icon
                  // onClick={() => setSelect(!select)}
                  className={` text-base `}
                />
              </div>
            ) : (
              <Icon
                // onClick={() => setSelect(!select)}
                className={` mt-1 text-base ${outline ? "text-scudGreen" : "text-[#C6C6C6]"} `}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
