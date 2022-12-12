import React from "react";
import { useDropzone } from "react-dropzone";
import StyleCard from "../StyleCard";

function Dropzone({ onDrop, open }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
      useDropzone({
        onDrop,
      });
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
      <StyleCard style={{ background: 'rgb(218, 220, 224)' }}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="dropzone-content">
                Release to drop the files here
              </p>
            ) : (
              <p className="dropzone-content">
                Drag & drop some files here, or click to select files
              </p>
            )}
            <button type="button" onClick={open} className="btn">
              Click to select files
            </button>
          </div>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </StyleCard>
    );
  }
  export default Dropzone;