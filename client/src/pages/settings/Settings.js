import { useContext, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import DefaultProfilePhoto from "../../Images/Default-Profile-Photo.png";
import "./settings.css";

function formReducer(state, action) {
  switch (action.type) {
    case "USERNAME_FIELD": {
      const usernameError =
        action.value.length < 5
          ? "Username must be at least 5 character long"
          : "";
      return {
        ...state,
        username: action.value,
        usernameError,
      };
    }
    case "EMAIL_FIELD": {
      const emailError = !action.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
        ? "Invalid Email"
        : "";
      return {
        ...state,
        email: action.value,
        emailError,
      };
    }
    case "PASSWORD_FIELD": {
      const strongPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      ).test(action.value);
      const passwordError = !strongPassword
        ? `<li>Password must be 8 character long</li>
          <li>Password must contain at least one lowercase and one uppercase letter</li>
          <li>Password must contain one digit and one special character</li>`
        : "";
      return {
        ...state,
        password: action.value,
        passwordError,
      };
    }
    default:
      return state;
  }
}

export default function Settings() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user, dispatch, error: err } = useContext(Context);
  const [curState, send] = useReducer(formReducer, {
    username: user.username,
    email: user.email,
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const PF = "http:localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: curState.username,
      email: curState.email,
      password: curState.password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const onDeleteHandler = async () => {
    try {
      await axios.post(`/api/users/${user._id}`, { userId: user._id });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const checkButtonDisable =
    curState.username.length === 0 ||
    curState.usernameError.length > 0 ||
    curState.email.length === 0 ||
    curState.emailError.length > 0 ||
    curState.password.length === 0 ||
    curState.passwordError.length > 0
      ? true
      : false;

  return (
    <div className="container text-bold my-4">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 text-center fs-3">Update Your Account</div>
            <div
              className="col-md-6 text-end text-center"
              onClick={onDeleteHandler}
            >
              <span className="btn btn-danger text-white w-50 p-2 fs-5 my-3">
                Delete Account
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <span className="fs-3 text-bold my-4">Upload Profile Picture</span>
            <label htmlFor="fileInput">
              <i
                className="fas fa-user-circle fa-2x mx-3 my-4"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Upload Profile Picture"
              ></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              className="set-img d-block"
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic
                  ? PF + user.profilePic
                  : DefaultProfilePhoto
              }
              alt=""
            />

            <label htmlFor="username" className="form-label fs-3 my-3">
              Username
            </label>
            <input
              type="text"
              value={curState.username}
              className="form-control"
              id="username"
              onChange={(e) =>
                send({ type: "USERNAME_FIELD", value: e.target.value })
              }
            />
            <p className="text-danger">{curState.usernameError}</p>

            <label htmlFor="email" className="form-label fs-3">
              Email
            </label>
            <input
              type="email"
              value={curState.email}
              className="form-control"
              id="email"
              onChange={(e) =>
                send({ type: "EMAIL_FIELD", value: e.target.value })
              }
            />
            <p className="text-danger">{curState.emailError}</p>

            <label htmlFor="password" className="form-label fs-3">
              Password
            </label>
            <input
              type="password"
              value={curState.password}
              className="form-control"
              id="password"
              onChange={(e) =>
                send({ type: "PASSWORD_FIELD", value: e.target.value })
              }
            />
            <div className="text-danger">
              <ul
                dangerouslySetInnerHTML={{ __html: curState.passwordError }}
              ></ul>
            </div>

            <button
              className="btn btn-dark text-white w-25 p-2 fs-5 my-3"
              type="submit"
              disabled={checkButtonDisable}
            >
              Update
            </button>
            {success && (
              <span className="text-success text-center d-block">
                Profile has been updated
              </span>
            )}
            {error && <p className="text-danger text-center text-bold">User not found</p>}
            {err && (
              <p className="text-danger text-center text-bold">User already exist</p>
            )}
          </form>
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
