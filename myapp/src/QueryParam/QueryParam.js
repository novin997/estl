import { MDBBtn, MDBContainer, MDBRow } from "mdbreact";
import React, { useState } from "react";
import SelectBox from "./Input/SelectBox";
import InputNum from "./Input/InputNum";
import { tableColumns } from "../Table/Table";

export default function QueryParam({ setTable }) {
  const sortOrderList = ["Ascending", "Descending"];
  const sortByList = ["id", "login", "name", "salary"];

  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(4000);
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [sortBy, setSortBy] = useState("id");

  const queryDB = async () => {
    const sort = (sortOrder === "Ascending" ? "+" : "-").concat(sortBy);
    const response = await fetch(
      "/users?" +
        new URLSearchParams({
          minSalary: minSalary,
          maxSalary: maxSalary,
          offset: 0,
          limit: 30,
          sort: sort,
        })
    );
    const table = await response.json();
    setTable({
      columns: tableColumns,
      rows: table.results,
    });
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
