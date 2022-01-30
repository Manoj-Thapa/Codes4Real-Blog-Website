import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

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
        ? `<li>Password must be 8 character long.</li>
          <li>Password must contain at least one lowercase and one uppercase letter.</li>
          <li>Password must contain one digit and one special character.</li>`
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

export default function Register() {
  const [curState, dispatch] = useReducer(formReducer, {
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username: curState.username,
        email: curState.email,
        password: curState.password,
      });
      res.data && navigate("/login");
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
    <div className="wrapper my-4">
      <p className="text-center fs-2">
        <i className="fas fa-user-edit fa-2x"></i>
      </p>
      <form onSubmit={handleSubmit}>
        <label className="form-label text-bold" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          value={curState.username}
          onChange={(e) =>
            dispatch({ type: "USERNAME_FIELD", value: e.target.value })
          }
        />
        <p className="text-danger">{curState.usernameError}</p>
        <label className="form-label text-bold" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          value={curState.email}
          onChange={(e) =>
            dispatch({ type: "EMAIL_FIELD", value: e.target.value })
          }
        />
        <p className="text-danger">{curState.emailError}</p>
        <label className="form-label text-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={curState.password}
          onChange={(e) =>
            dispatch({ type: "PASSWORD_FIELD", value: e.target.value })
          }
        />
        <div className="text-danger">
          <ul dangerouslySetInnerHTML={{ __html: curState.passwordError }}></ul>
        </div>
        <button
          className="btn btn-dark text-white w-100 p-2 fs-5"
          type="submit"
          disabled={checkButtonDisable}
        >
          Register
        </button>
      </form>
      {error && (
        <p className="text-danger text-center text-bold m-3">Username already exist</p>
      )}
    </div>
  );
}
