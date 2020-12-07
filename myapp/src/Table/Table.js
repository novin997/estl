import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBDataTableV5, MDBRow } from "mdbreact";
import QueryParam from "../QueryParam/QueryParam";

export const tableColumns = [
  {
    label: "Id",
    field: "id",
    width: 150,
    attributes: {
      "aria-controls": "DataTable",
      "aria-label": "Name",
    },
  },
  {
    label: "Login",
    field: "login",
    width: 270,
  },
  {
    label: "Name",
    field: "name",
    width: 200,
  },
  {
    label: "Salary",
    field: "salary",
    sort: "disabled",
    width: 100,
  },
];

export default function Table() {
  const [datatable, setDatatable] = React.useState({
    columns: tableColumns,
    rows: [],
  });

  return (
    <div>
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center">
          <QueryParam setTable={setDatatable} />
        </MDBRow>
        <MDBRow>
          <MDBCol size="2"></MDBCol>
          <MDBCol size="8">
            <MDBDataTableV5
              hover
              entriesOptions={[5, 10]}
              entries={5}
              data={datatable}
              fullPagination
            />
          </MDBCol>
          <MDBCol size="2"></MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
