import React, { useState } from "react";
import "./Upload.css";

export default function Upload() {
  const [file, setFile] = useState("");

  function fileChange(e) {
    const file = e.target.files[0];

    // Check for the file if it is csv file format else alert user file format invalid
    if (file.type === "text/csv") setFile(file);
    else alert("Invalid File Type");
    console.log(file.type);
  }

  async function uploadFile() {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiPost = await fetch("http://localhost:8080/users/upload", {
        method: "POST",
        body: formData,
      });

      const data = await apiPost.json();
      console.log(data);
    } catch (err) {
      console.log("error");
    }
  }

  return (
    <div>
      <div className="App">
        <h1>Upload CSV</h1>
      </div>
      <div className="App">
        <input type="file" onChange={fileChange} />
        <button onClick={uploadFile} className="upbutton">
          Upload
        </button>
      </div>
    </div>
  );
}
