import { MDBInput } from "mdbreact";
import React from "react";

export default function InputNum({ title, val, setVal }) {
  const updateVal = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
  };

  return (
    <div className="m-4">
      <label htmlFor="MDBInput">{title}</label>
      <MDBInput type="number" value={val} id="MDBInput" onChange={updateVal} />
    </div>
  );
}
