import ParticleBackground from "../../ParticleBackground";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg  animate__hinge">
          Learn To <i className="fas fa-code"></i>
        </span>
        <span className="headerTitleSm animate__animated animate__zoomInUp">
          Read and get updated on how we progress
        </span>
      </div>
      <ParticleBackground />
    </div>
  );
}
