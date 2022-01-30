import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import profilephoto from "../../Images/ManojKumarThapa.png";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      const newCat = [...new Set(res.data.map((cat) => cat.name))];
      setCats(newCat);
    };
    getCats();
  }, []);
  return (
    <>
      <div className="text-center border-bottom border-dark m-3">
        <p className="my-3 text-bold">Developed By</p>
        <img className="author-photo" src={profilephoto} alt="Author Photo" />
        <p className="text-bold">
          Software Engineer, Bangalore
          <i className="fas fa-laptop-code fa-2x mx-2"></i>
        </p>
      </div>
      <div className="border-bottom border-dark my-4">
        <p className="text-center text-bold">Categories</p>
        <div className="row m-2">
          {cats.map((c, index) => (
            <div key={index} className="col-md-6 display-column">
              <NavLink to={`/?cat=${c}`} className="link text-tag">
                {c}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-bold">Follow me</p>
        <a
          href="https://manojkumarthapa.netlify.app"
          className="social"
          target="_blank"
        >
          <i className="fas fa-user-circle fa-2x m-3"></i>
        </a>
        <a
          href="https://www.github.com/Manoj-Thapa"
          className="social"
          target="_blank"
        >
          <i className="fab fa-github fa-2x m-3"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/manoj-kumar-thapa-7595a5168"
          className="social"
          target="_blank"
        >
          <i className="fab fa-linkedin fa-2x m-3"></i>
        </a>
        <a
          href="https://www.instagram.com/manojthapaa"
          className="social"
          target="_blank"
        >
          <i className="fab fa-instagram fa-2x m-3"></i>
        </a>
        <a
          href="https://www.facebook.com/iammanozz"
          className="social"
          target="_blank"
        >
          <i className="fab fa-facebook-square fa-2x m-3"></i>
        </a>
      </div>
      <div className="text-center text-bold">
        <i className="far fa-copyright mx-2"></i>
        <span className="copyright">Codes4Real 2022 All rights reserved.</span>
      </div>
    </>
  );
}
