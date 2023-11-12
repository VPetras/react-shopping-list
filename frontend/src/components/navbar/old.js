import React from "react";

import profile_picture from "../../images/profile.png";

import { ShoppingListContext } from "../../context/shoppingListContext";

class Navbar extends React.Component {
  static contextType = ShoppingListContext;
  constructor(props) {
    super(props);
    this.state = {};
    this.context = { user: { nickname: "VPetras" } };
  }

  logout = () => {
    this.context.setLogged(false);
  };

  login = (nickname) => () => {
    this.context.setLogged(nickname);
  };

  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            {/*<img height="70" alt="Logo" loading="lazy" />*/}
            Shopping List
          </a>

          {this.context.logged !== false ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="/account"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Logged as: {this.context.logged}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                      <button className="dropdown-item" onClick={this.logout}>
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
                      {this.context.users.map((user) => (
                        <>
                          {console.log(user)}
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={this.login(user.nickname)}>
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
    );
  }
}

export default Navbar;
