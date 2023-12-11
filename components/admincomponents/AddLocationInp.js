import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BiCurrentLocation } from "react-icons/bi";
import { IoHandRightOutline, IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useDispatch } from "react-redux";
import "animate.css";
import { handleOrigin, handleDestination, handleRoute } from "../../features/scudSlice";
import { AiOutlineSelect } from "react-icons/ai";

function AddLocationInp({ onClick, activecursor, path, setPath }) {
  // const show = useSelector((state) => state.scud.resizeDiv);
  const [origin, setOrigin] = useState(null);

  // console.log("origin", JSON.stringify(origin));
  // console.log("destination", destination);

  const dispatch = useDispatch();
  useEffect(() => {
    geocodeByAddress(origin?.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => dispatch(handleOrigin({ lat, lng })));
  }, [origin]);

  return (
    <div className="flex   flex-row justify-end  md:space-x-7 w-full items-end  z-50">
      {/* <div className="  w-[75%]  md:w-[60%] h-20   px-4"> */}

      <div className="flex space-x-1 w-full  justify-end   ">
        {path?.length === 0 ? null : (
          <div className="bg-white rounded-md  transition-all shadow-sm p-1 flex space-x-5">
            <span
              onClick={() => setPath([])}
              className="px-2 transition-all animate__animated animate__fadeIn flex justify-center items-center bg-slate-200 rounded-md text-red-500 text-sm"
            >
              cancel
            </span>
          </div>
        )}
        <div className="w-[60%]">
          <GooglePlacesAutocomplete
            apiKey={process.env.MAPS_API_KEY3}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
            selectProps={{
              placeholder: "Select region",
              origin,
              onChange: setOrigin
            }}
            autocompletionRequest={{
              componentRestrictions: {
                country: ["ng"]
              }
            }}
            apiOptions={{
              region: "NG",

              types: ["establishment", "geocode", "address", "regions", "cities"]
            }}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default AddLocationInp;
