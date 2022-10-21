import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Breaking Bad
      </NavLink>
      <NavLink
        to="/better-call-saul"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Better Call Saul
      </NavLink>
    </nav>
  );
};
export default Navbar;
