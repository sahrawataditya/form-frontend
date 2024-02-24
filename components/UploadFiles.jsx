import React from "react";

const UploadFiles = () => {
    const [files, setFiles] = useState([
        { fileName: "", fileType: "PDF", file: null },
      ]);
    
      const handleFileChange = (index, event) => {
        const newFiles = [...files];
        newFiles[index].file = event.target.files[0];
        setFiles(newFiles);
      };
    
      const handleFileNameChange = (index, event) => {
        const newFiles = [...files];
        newFiles[index].fileName = event.target.value;
        setFiles(newFiles);
      };
    
      const handleFileTypeChange = (index, event) => {
        const newFiles = [...files];
        newFiles[index].fileType = event.target.value;
        setFiles(newFiles);
      };
    
      const handleAddFile = () => {
        setFiles([...files, { fileName: "", fileType: "PDF", file: null }]);
      };
    
      const handleDeleteFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
      };
  return (
    <div>
      {files.map((file, index) => (
        <div key={index}>
          <label>File Name:</label>
          <input
            type="text"
            value={file.fileName}
            onChange={(e) => handleFileNameChange(index, e)}
          />
          <label>Type of File:</label>
          <select
            value={file.fileType}
            onChange={(e) => handleFileTypeChange(index, e)}
          >
            <option value="PDF">PDF</option>
            <option value="Image">Image</option>
          </select>
          <input type="file" onChange={(e) => handleFileChange(index, e)} />
          <button onClick={() => handleDeleteFile(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddFile}>+</button>
    </div>
  );
};

export default UploadFiles;
