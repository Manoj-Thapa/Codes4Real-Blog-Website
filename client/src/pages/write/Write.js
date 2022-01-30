import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [err, setErr] = useState(false);
  const [titleerr, setTitleErr] = useState(false);
  const config = {
    readonly: false,
    height: 400,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc: content,
      categories: cat,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/api/posts", newPost);
      await axios.post("/api/categories", { name: cat });
      navigate("/post/" + res.data._id);
    } catch (err) {
      if (err.response.data.code) {
        setTitleErr(true);
        return;
      }
      setErr(true);
    }
  };

  return (
    <div className="container">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form>
        <label htmlFor="title" className="form-label fs-3 my-2 text-bold">
          Title
        </label>
        <div className="mandatory">*</div>
        <input
          type="text"
          placeholder="Title"
          className="form-control"
          autoFocus={true}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="category" className="form-label fs-3 my-2 text-bold">
          Category
        </label>
        <div className="mandatory">*</div>
        <input
          type="text"
          placeholder="Category"
          className="form-control category-input"
          id="category"
          onChange={(e) => setCat(e.target.value)}
        />

        <span className="fs-3 text-bold">Upload Image</span>
        <label htmlFor="fileInput" className="fileinput">
          <i
            className="fas fa-images fa-2x mx-4 file-logo"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Upload Image"
          ></i>
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />

        <label
          htmlFor="description"
          className="form-label fs-3 my-2 text-bold"
        >
          Description
        </label>
        <div className="mandatory">*</div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />

        <div className="mt-2">
          <div className="mandatory">*</div>
          <span className="text-bold">indicates required field</span>
        </div>

        <button
          className="btn btn-dark text-white w-25 p-2 fs-5 my-3"
          type="submit"
          onClick={handleSubmit}
        >
          Publish
        </button>
        {err && (
          <p className="text-center text-danger text-bold mt-3">
            Every field is mandatory
          </p>
        )}
        {titleerr && (
          <p className="text-center text-danger text-bold mt-3">
            Title already exist
          </p>
        )}
      </form>
    </div>
  );
}
