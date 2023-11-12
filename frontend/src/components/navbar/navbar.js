import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const NavBar = () => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();

    context.setIsAuth(false);
    context.setUser({});
    context.setToken("");

    navigate("/login");
  };

  useEffect(() => {
    if (!context.isAuth) {
      console.log("Not logged in");
      if (localStorage.getItem("token")) {
        fetch("https://api.uu.vojtechpetrasek.com/v4/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success === true) {
              context.setUser(data.user);
              context.setIsAuth(true);
              context.setToken(localStorage.getItem("token"));
            }
          });
      }
    } else {
      console.log("Already logged in");
    }
  }, []);

  console.log(context);

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
              {context.isAuth && (
                <li className="nav-item">
                  <Link className="nav-link" to="/active">
                    My active
                  </Link>
                  <Link className="nav-link" to="/shared">
                    Shared with me
                  </Link>
                  <Link className="nav-link" to="/archived">
                    Archived
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {context.isAuth ? (
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
                        Account
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
