
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="btn btn-ghost normal-case text-xl">Jacob Paulson</div>
      </div>
      <div className="navbar-end">
        <Link to="https://www.instagram.com/_jacobpaulson_/">
          <i className="fa-brands fa-instagram m-2 lg:m-3"></i>
        </Link>
        <Link to="https://www.tiktok.com/@jacobryanpaulson">
          <i className="fa-brands fa-tiktok m-2 lg:m-3"></i>
        </Link>
        <Link to="https://twitter.com/JRPaulyStreams">
          <i className="fa-brands fa-twitter m-2 lg:m-3"></i>
        </Link>

        <Link
          to="/ContactMe"
          className="btn btn-outline lg:mr-6 "
        >
          Contact Me!
        </Link>
      </div>
    </div>
  );
}
