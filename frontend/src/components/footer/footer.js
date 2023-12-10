import React, { useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const Footer = () => {
  const context = useContext(ShoppingListContext);

  return (
    <>
      <div
        className={
          "container-fluid fixed-bottom " +
          (context.theme === "dark" ? "bg-dark" : "")
        }
        style={context.theme === "light" ? { backgroundColor: "#e3f2fd" } : {}}>
        <footer className="text-lg-start">
          <div
            className={
              "text-center p-3 " +
              (context.theme === "dark" ? "text-white" : "text-dark")
            }>
            {"© 2023 Copyright: "}
            <a
              className={context.theme === "dark" ? "text-white" : "text-dark"}
              href="https://vojtechpetrasek.com/">
              Vojtěch Petrásek
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
