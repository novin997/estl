import React from "react";

export default function SelectBox({ title, list, val, setVal }) {
  const changeVal = (e) => {
    const index = e.target.value;
    console.log(list[index]);
    setVal(list[index]);
  };
  return (
    <div className="m-4">
      <label>{title}</label>
      <select
        onChange={changeVal}
        className="mt-3 browser-default custom-select"
      >
        {list.map((item, index) => {
          return <option value={index}>{item}</option>;
        })}
      </select>
    </div>
  );
}
