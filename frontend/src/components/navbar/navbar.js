import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const NavBar = () => {
  const context = useContext(ShoppingListContext);

  const logout = (event) => {
    event.preventDefault();
    context.setLogged(false);
    context.setUser({});
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shopping List
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/docs">
                  Docs (API)
                </Link>
              </li>
              {/*context.logged && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      My active
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/shared">
                      Shared with me
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/archived">
                      Archived
                    </Link>
                  </li>
                </>
              )*/}
            </ul>
          </div>
          {context.logged ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="!#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Logged as: {context.user.nickname}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                      <Link className="dropdown-item" to="/account">
                        TODO: Account
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Log out
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
