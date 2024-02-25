import { useRef, useState } from "react";
import Spinner from "../components/Spinner";
import "./App.css";
import axios from "axios";
import { DeleteIcon, Upload_icon } from "../components/Icons";
function App() {
  const [Loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const [FileType, setFileType] = useState(null);
  const [Form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    residentAddress: {
      street1: "",
      street2: "",
    },
    permanentAddress: {
      street1: "",
      street2: "",
    },
    pdfFile: {
      fileName: "",
      fileType: "",
      file: null,
    },
    imageFile: {
      fileName: "",
      fileType: "",
      file: null,
    },
  });
  const formData = new FormData();
  formData.append("firstName", Form.firstName);
  formData.append("lastName", Form.lastName);
  formData.append("birthDate", Form.birthDate);
  formData.append("email", Form.email);
  formData.append("pAddressstreet1", Form.permanentAddress.street1);
  formData.append("pAddressstreet2", Form.permanentAddress.street2);
  formData.append("rAddressstreet1", Form.residentAddress.street1);
  formData.append("rAddressstreet2", Form.residentAddress.street2);
  formData.append("image", Form.imageFile.file);
  formData.append("pdf", Form.pdfFile.file);
  function handleCheckbox(e) {
    const { checked } = e.target;
    if (checked) {
      setForm({
        ...Form,
        permanentAddress: {
          street1: Form.residentAddress.street1,
          street2: Form.residentAddress.street2,
        },
      });
    } else {
      setForm({
        ...Form,
        permanentAddress: {
          street1: "",
          street2: "",
        },
      });
    }
  }
  function changeBirthdate(e) {
    const { value } = e.target;
    const Birthdate = new Date(value);
    const today = new Date();
    const ageDiff = today - Birthdate;
    const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));
    if (age < 18) {
      alert("Date of birth should be greater than 18");
    } else {
      setForm({
        ...Form,
        birthDate: value,
      });
    }
  }
  const [files, setFiles] = useState([
    { fileName: "", fileType: "", file: null },
  ]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    const imageFormat = ["image/jpeg", "image/png"];
    const pdfFormat = "application/pdf";
    if (FileType === "Pdf") {
      if (file.type === pdfFormat) {
        setForm({
          ...Form,
          pdfFile: { fileName: file.name, fileType: "pdf", file: file },
        });
      } else {
        alert("Pdf should be in pdf format");
      }
    } else if (FileType === "Image") {
      if (imageFormat.includes(file.type)) {
        setForm({
          ...Form,
          imageFile: { fileName: file.name, fileType: "image", file: file },
        });
      } else {
        alert("Image should be jpeg and png format");
      }
    }
    const newFiles = [...files];
    newFiles[index].fileName = file.name;
    newFiles[index].fileType = FileType;
    setFiles(newFiles);
  };

  const handleFileNameChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].fileName = event.target.value;
    setFiles(newFiles);
  };

  const handleFileTypeChange = (index, event) => {
    const { value } = event.target;
    if (value === "Pdf") {
      setFileType("Pdf");
    } else if (value === "Image") {
      setFileType("Image");
    }
    const newFiles = [...files];
    newFiles[index].fileType = value;
    setFiles(newFiles);
  };

  const handleAddFile = (index) => {
    setFiles([...files, { fileName: "", fileType: "", file: null }]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/submit",
        formData
      );
      if (res.data.success) {
        setLoading(false);
        alert(res.data.message);
        return;
      } else {
        setLoading(false);
        alert(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  }
  return (
    <div className="parent">
      <h1
        style={{
          textAlign: "center",
          textDecoration: "uppercase",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        mern stack machine test
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-ele">
          <div className="input">
            <label htmlFor="fistName" className="label">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="fistName"
              required
              onChange={(e) =>
                setForm({
                  ...Form,
                  firstName: e.target.value,
                })
              }
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
              placeholder="Enter your first name here ..."
            />
          </div>
          <div className="input">
            <label htmlFor="lastName" className="label">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              required
              onChange={(e) =>
                setForm({
                  ...Form,
                  lastName: e.target.value,
                })
              }
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
              placeholder="Enter your last name here ..."
            />
          </div>
          <div className="input">
            <label htmlFor="email" className="label">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) =>
                setForm({
                  ...Form,
                  email: e.target.value,
                })
              }
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
              placeholder="ex: myname@example.com"
            />
          </div>
          <div className="input">
            <label htmlFor="dob" className="label">
              Date of Birth<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              id="dob"
              onChange={changeBirthdate}
              required
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
              placeholder="Date of birth"
            />
            <span
              style={{
                color: "gray",
                fontSize: "12px",
                fontWeight: "500",
                marginTop: "4px",
                fontFamily: "Roboto",
              }}
            >
              (Min. age should be 18 Years)
            </span>
          </div>
        </div>
        <h4 style={{ fontFamily: "Roboto" }}>Residental Address</h4>
        <div className="form-ele">
          <div className="input">
            <label htmlFor="street1" className="label">
              Street 1 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="street1"
              required
              onChange={(e) => {
                setForm({
                  ...Form,
                  residentAddress: {
                    ...Form.residentAddress,
                    street1: e.target.value,
                  },
                });
              }}
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="input">
            <label htmlFor="street2" className="label">
              Street 2 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="street2"
              required
              onChange={(e) => {
                setForm({
                  ...Form,
                  residentAddress: {
                    ...Form.residentAddress,
                    street2: e.target.value,
                  },
                });
              }}
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            id="check"
            onChange={handleCheckbox}
            style={{ width: "16px" }}
            className="custom-checkbox"
          />
          <label htmlFor="check" style={{ fontFamily: "Roboto" }}>
            Same as Residental Address
          </label>
        </div>
        <h4 style={{ fontFamily: "Roboto", marginTop: "20px" }}>
          Permanent Address
        </h4>
        <div className="form-ele">
          <div className="input">
            <label htmlFor="street1" className="label">
              Street 1
            </label>
            <input
              type="text"
              id="street1"
              required
              onChange={(e) =>
                setForm({
                  ...Form,
                  permanentAddress: {
                    street1: e.target.value,
                  },
                })
              }
              value={Form.permanentAddress.street1}
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="input">
            <label htmlFor="street2" className="label">
              Street 2
            </label>
            <input
              type="text"
              id="street2"
              value={Form.permanentAddress.street2}
              required
              onChange={(e) =>
                setForm({
                  ...Form,
                  permanentAddress: {
                    street2: e.target.value,
                  },
                })
              }
              style={{
                padding: "10px",
                border: "grey 1px solid",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
        <h4 style={{ fontFamily: "Roboto", marginTop: "20px" }}>
          Upload Documents
        </h4>
        <div>
          {files.map((file, index) => (
            <div key={index} className="file-input">
              <div className="inputs">
                <label className=" label">
                  File Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={file.fileName}
                  required
                  className="input-wrapper"
                  onChange={(e) => handleFileNameChange(index, e)}
                />
              </div>
              <div className="inputs">
                <label htmlFor="typefile" className=" label">
                  Type of File <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="typefile"
                  value={file.fileType}
                  className="input-wrapper"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "9px",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => handleFileTypeChange(index, e)}
                >
                  <option value="">Select</option>
                  <option value="Pdf">Pdf</option>
                  <option value="Image">Image</option>
                </select>
                <span
                  style={{
                    color: "gray",
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    marginTop: "3px",
                    fontWeight: 500,
                  }}
                >
                  (image and pdf.)
                </span>
              </div>
              <div className="inputs">
                <label htmlFor="file" className="label">
                  Upload Document <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  id="file"
                  ref={hiddenFileInput}
                  style={{ display: "none", marginTop: "10px" }}
                  onChange={(e) => handleFileChange(index, e)}
                />
                <button className="upload-btn" onClick={handleClick}>
                  <Upload_icon />
                </button>
              </div>
              <div
                style={{ display: "flex", height: "60px", marginTop: "16px" }}
              >
                {index > 0 ? (
                  <button
                    onClick={() => handleDeleteFile(index)}
                    style={{
                      padding: "6px 14px",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "26px",
                      marginTop: "20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <DeleteIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddFile(index)}
                    style={{
                      padding: "6px 14px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "26px",
                      marginTop: "20px",
                      backgroundColor: "#0a0a0a",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="buttonP">
          <button disabled={Loading} className="button">
            {Loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
