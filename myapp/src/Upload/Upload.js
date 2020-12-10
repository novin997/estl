import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState("");
  const [response, setResponse] = useState("");

  function fileChange(e) {
    const file = e.target.files[0];

    // Check for the file if it is csv file format else alert user file format invalid
    if (file.type === "text/csv") setFile(file);
    else alert("Invalid File Type");
    console.log(file.type);
  }

  async function uploadFile() {
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);

    try {
      const apiPost = await fetch("/users/upload", {
        method: "POST",
        body: formData,
      });

      const data = await apiPost.json();
      setResponse(data.message);
    } catch (err) {
      setResponse(err);
    }
  }

  return (
    <div className="p-4">
      <div className="m-4 d-flex justify-content-center">
        <h1>Upload CSV</h1>
      </div>
      <div className="pl-5 m-4 d-flex justify-content-center">
        <input type="file" name="csvFile" onChange={fileChange} />
      </div>
      <div className="m-4 d-flex justify-content-center">
        <button
          onClick={uploadFile}
          type="button"
          className="btn btn-primary btn-rounded btn-sm"
        >
          Upload
        </button>
      </div>
      <div className="m-4 d-flex justify-content-center">
        <p>{response}</p>
      </div>
    </div>
  );
}
