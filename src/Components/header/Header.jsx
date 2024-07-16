import { Link } from "react-router-dom";
import Logo from "../../image/logo.png";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="flex justify-center ">
      <nav className="header w-1/2 fixed top-0 text-center rounded-full   z-50  mt-4  bg-gray-950 p-1 flex items-center justify-center gap-32">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="logo h-14" />
        </Link>

        <div className="links flex gap-4">
          <Link to="/tv-shows" className="text-white hover:text-gray-300">TV Shows</Link>
          <Link to="/movies" className="text-white hover:text-gray-300">Movies</Link>
          <Link to="/my_list" className="text-white hover:text-gray-300">My List</Link>
        </div>

        <BiSearch className="search text-white text-2xl cursor-pointer" />
      </nav>
    </div>
  );
};

export default Header;
