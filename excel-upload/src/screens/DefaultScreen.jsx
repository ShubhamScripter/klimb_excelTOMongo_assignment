import { Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

const DefaultScreen = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.prevent.default();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("server error");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <input
          type="submit"
          value="upload"
          className="btn btn-primary btn-block"
        />
      </Form>
    </>
  );
};

export default DefaultScreen;