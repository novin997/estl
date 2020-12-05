import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBDataTableV5, MDBRow } from "mdbreact";

export default function Table() {
  const [datatable, setDatatable] = React.useState({
    columns: [
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
    ],
    rows: [
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
      {
        id: "Tiger Nixon",
        login: "System Architect",
        name: "Edinburgh",
        salary: "61",
      },
    ],
  });

  return (
    <div>
      <MDBContainer>
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
