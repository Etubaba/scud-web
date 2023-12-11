import React from "react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const CheckList = ({ setValue, data, value, item: { id, name }, setItemId, itemid }) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    if (!checked) {
      setValue((prev) => [...prev, { id, name }]);
      setItemId((prev) => [...prev, id]);
    } else {
      const newArr = value?.filter((item) => item.id !== id);
      const newArr2 = itemid?.filter((item) => item !== id);

      newArr.length !== 0 ? setValue(newArr) : setValue([]);
      newArr2.length !== 0 ? setItemId(newArr2) : setItemId([]);
    }

    // if (!checked) {
    //   setValue((prev) => [...prev, { id, name }]);
    // } else {
    //   data.forEach((element) => {
    //     if (element.id === id) {
    //       const newArr = value?.filter((item) => {
    //         return item.id !== id;
    //       });
    //       console.log(newArr);
    //       setValue(newArr);
    //     }
    //   });
    // }

    setChecked(!checked);
  };

  return (
    <div className="flex hover:bg-adminbg p-1 space-x-1 items-center">
      <div
        onClick={handleChecked}
        className={`border w-3.5 h-3.5  flex items-center justify-center rounded ${
          checked ? "border-scudGreen " : "p-1.5"
        } `}
      >
        {checked && <AiOutlineCheck className="text-scudGreen text-lg" />}
      </div>
      <p className="flex items-center text-textColor text-xs  px-2 rounded-md py-1">{name}</p>
    </div>
  );
};

export default CheckList;
