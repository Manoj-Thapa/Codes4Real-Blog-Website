import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Context } from "../../context/Context";
import DefaultPhoto from "../../Images/Default-Photo.png";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  const editor = useRef(null);
  const { user } = useContext(Context);
  const [err, setErr] = useState(false);
  const PF = "http:localhost:5000/images/";
  const config = {
    readonly: false,
    height: 400,
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      await axios.post("/api/categories/removeCat", {
        rcat: post.categories[0],
      });
      navigate("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc: content,
      });
      setUpdateMode(false);
      window.location.replace(`/post/${post._id}`);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="my-4">
      {post.photo && (
        <img src={PF + post.photo} alt="Post" className="singlePostImg" />
      )}
      {!post.photo && (
        <img src={DefaultPhoto} alt="Post" className="singlePostImg" />
      )}
      {updateMode ? (
        <>
          <label htmlFor="title" className="form-label fs-3 my-2 text-bold">
            Title
          </label>
          <input
            type="text"
            value={title}
            className="form-control"
            id="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      ) : (
        <>
          <h1 className="text-center singleposttitle">{title}</h1>
          {post.username === user?.username && (
            <div className="text-end">
              <i
                className="fas fa-edit fa-2x m-3"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Edit"
                onClick={() => setUpdateMode(true)}
              ></i>

              <i
                className="fas fa-trash fa-2x m-4"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Delete"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </>
      )}
      <div className="row text-bold">
        <p className="col-6 px-4">
          Author:
          <Link
            to={`/?user=${post.username}`}
            className="mx-2 link author-name"
          >
            {post.username}
          </Link>
        </p>
        <p className="col-6 px-4 text-end">
          {new Date(post.createdAt).toDateString()}
        </p>
      </div>

      {updateMode ? (
        <>
          <label
            htmlFor="description"
            className="form-label fs-3 my-2 text-bold"
          >
            Description
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </>
      ) : (
        <p
          className="singlepostdesc"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      )}
      {updateMode && (
        <button
          className="btn btn-dark text-white w-25 p-2 fs-5 my-3"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
      {err && (
        <p className="text-center text-danger text-bold">Title already exist</p>
      )}
    </div>
  );
}
