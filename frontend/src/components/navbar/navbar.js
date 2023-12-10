import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const NavBar = () => {
  const context = useContext(ShoppingListContext);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      if (theme === "dark") {
        setDark();
      } else {
        setLight();
      }
    }
  }, []);

  const logout = (event) => {
    event.preventDefault();
    context.setLogged(false);
    context.setUser({});
  };

  const setLight = () => {
    context.setTheme("light");
    localStorage.setItem("theme", "light");
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.dataset.bsTheme = "light";
  };

  const setDark = () => {
    context.setTheme("dark");
    localStorage.setItem("theme", "dark");
    document.body.style.backgroundColor = "#343a40";
    document.body.dataset.bsTheme = "dark";
  };

  return (
    //add dark mode to classname
    <>
      <nav
        className={
          "navbar navbar-expand-lg " +
          (context.theme === "dark" ? "navbar-dark bg-dark" : "")
        }
        style={context.theme === "light" ? { backgroundColor: "#e3f2fd" } : {}}
        data-bs-theme={context.theme}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shopping List
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/docs">
                  {context.language === "en"
                    ? "Docs (API)"
                    : "Dokumentace (API)"}
                </Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown px-3">
              <a
                href="!#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {context.language === "en" ? "Theme" : "Téma"}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
                data-bs-theme={context.theme}>
                <li>
                  <button className="dropdown-item" onClick={() => setLight()}>
                    {context.language === "en" ? "Light" : "Světlé"}
                    <i class="px-2 fa-solid fa-sun"></i>
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setDark()}>
                    {context.language === "en" ? "Dark" : "Tmavé"}
                    <i class="px-2 fa-regular fa-moon"></i>
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown pe-3">
              <a
                href="!#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {context.language === "en" ? "English" : "Čeština"}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
                data-bs-theme={context.theme}>
                {context.languages.map((language) => (
                  <li key={language.code}>
                    <button
                      className="dropdown-item"
                      onClick={() => context.setLanguage(language.code)}>
                      {language.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            {context.logged ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    href="!#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {context.language === "en"
                      ? "Logged as: "
                      : "Přihlášen jako: "}
                    {context.user.nickname}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                      <Link className="dropdown-item" to="/account">
                        {context.language === "en"
                          ? "Account todo"
                          : "Účet todo"}
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        {context.language === "en" ? "Log out" : "Odhlásit se"}
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <Link
                to="/login"
                className={
                  "btn " + (context.theme === "dark" ? "btn-info" : "btn-dark")
                }>
                {context.language === "en" ? "Login" : "Přihlásit se"}
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
