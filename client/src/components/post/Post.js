import { NavLink } from "react-router-dom";
import DefaultPhoto from "../../Images/Default-Photo.png";
import "./post.css";

export default function Post({ post }) {
  const PF = "http:localhost:5000/images/";
  return (
    <div className="col-lg-6 my-3">
      <NavLink className="text-title" to={`/post/${post._id}`}>
        <div className="card card-design">
          {post.photo && (
            <img
              src={PF + post.photo}
              className="card-img-top img-design"
              alt="Photo"
            />
          )}
          {!post.photo && (
            <img
              src={DefaultPhoto}
              className="card-img-top img-design"
              alt="Photo"
            />
          )}
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>

            <span className="text-muted text-design">
              {new Date(post.createdAt).toDateString()}
            </span>
            <span className="text-muted text-design text-author">
              By {post.username}
            </span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
