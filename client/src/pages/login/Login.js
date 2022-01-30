import axios from "axios";
import { useContext, useReducer } from "react";
import { Context } from "../../context/Context";
import "./login.css";

function formReducer(state, action) {
  switch (action.type) {
    case "USERNAME_FIELD":
      return { ...state, username: action.value };
    case "PASSWORD_FIELD":
      return { ...state, password: action.value };
    default:
      return state;
  }
}

export default function Login() {
  const [curState, send] = useReducer(formReducer, {
    username: "",
    password: "",
  });

  const { dispatch, error } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        username: curState.username,
        password: curState.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const checkButtonDisable =
    curState.username.length === 0 || curState.password.length === 0
      ? true
      : false;

  return (
    <div className="wrapper">
      <p className="text-center fs-2">
        <i className="fas fa-sign-in-alt fa-2x"></i>
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
            send({
              type: "USERNAME_FIELD",
              value: e.target.value,
            })
          }
        />
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
            send({
              type: "PASSWORD_FIELD",
              value: e.target.value,
            })
          }
        />
        <button
          className="btn btn-dark text-white w-100 p-2 my-3 fs-5"
          type="submit"
          disabled={checkButtonDisable}
        >
          Login
        </button>
        {error && (
          <p className="text-danger text-center text-bold m-3">
            Username or Password is incorrect
          </p>
        )}
      </form>
    </div>
  );
}
