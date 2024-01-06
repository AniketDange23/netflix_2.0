import {Link} from "react-router-dom";
import Logo from "../../image/logo.png"

import { BiSearch } from "react-icons/bi";
const Header = () => {
    return (
        <>
            <nav className="header">
                <Link to="/">                <img src={Logo} alt="logo" className="logo" />
                </Link>

              <div className="links">
                  <Link to="/tv-shows">
                      TV Shows
                  </Link>
                  <Link to="/movies">
                      Movies
                  </Link>
                  <Link to="/recent_watch">
                  Recent Add </Link>
                  <Link to="/my_list">
                  My List
              </Link>
              </div>
                <BiSearch className="search"/>
            </nav>
        </>
    )
}
export default Header