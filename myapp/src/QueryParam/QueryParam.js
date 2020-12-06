import { MDBBtn, MDBContainer, MDBRow } from "mdbreact";
import React, { useState } from "react";
import SelectBox from "./Input/SelectBox";
import InputNum from "./Input/InputNum";

export default function QueryParam() {
  const sortOrderList = ["Ascending", "Descending"];
  const sortByList = ["id", "login", "name", "salary"];

  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(4000);
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [sortBy, setSortBy] = useState("id");

  const queryDB = async () => {
    const url = new URL("http://localhost:3000/users");
    const sort = (sortOrder === "Ascending" ? "+" : "-").concat(sortBy);
    const params = {
      minSalary: minSalary,
      maxSalary: maxSalary,
      offset: 0,
      limit: 30,
      sort: sort,
    };

    url.search = new URLSearchParams(params).toString();
    console.log(url);
    const response = await fetch(url);
    console.log(response);
  };

  return (
    <div className="m-4">
      <MDBContainer>
        <MDBRow>
          <InputNum title="MinSalary" val={minSalary} setVal={setMinSalary} />
          <InputNum title="MaxSalary" val={maxSalary} setVal={setMaxSalary} />
        </MDBRow>
        <div className="d-flex justify-content-center">
          <SelectBox
            title="Sort Order"
            list={sortOrderList}
            val={sortOrder}
            setVal={setSortOrder}
          />
          <SelectBox
            title="Sort By"
            list={sortByList}
            val={sortBy}
            setVal={setSortBy}
          />
        </div>
        <div className="d-flex justify-content-center">
          <MDBBtn onClick={queryDB} color="dark">
            QueryDB
          </MDBBtn>
        </div>
      </MDBContainer>
    </div>
  );
}
