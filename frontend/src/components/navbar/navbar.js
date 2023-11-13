import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const NavBar = () => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();

    context.setLogged(false);
    context.setUser({});
  };

  const login = (nickname) => (event) => {
    event.preventDefault();
    context.setLogged(true);
    context.setUser({ nickname: nickname });
  };

  console.log(context);

  console.log("logged: ", context.logged);

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
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Log in
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink">
                    <>
                      {context.users.map((user) => (
                        <>
                          {console.log(user)}
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={login(user.nickname)}>
                              {user.nickname}
                            </a>
                          </li>
                        </>
                      ))}
                    </>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
