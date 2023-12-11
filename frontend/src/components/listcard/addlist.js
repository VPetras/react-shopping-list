import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const AddList = (props) => {
  const context = useContext(ShoppingListContext);

  const [list, setList] = useState({
    name: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setList({ ...list, [e.target.id]: e.target.value });
  };

  const addList = (e) => {
    e.preventDefault();

    if (!context.logged) {
      alert("You must be logged in to add a list.");
      return;
    }

    let newList = {
      name: list.name,
      item_list: [],
      created: new Date().toISOString(),
    };

    setList({
      name: "",
    });

    props.handleAdd(newList);
  };

  return (
    <>
      <div classNameName="col-md-6">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addListModal">
          {context.language === "en"
            ? "Add shopping list"
            : "Přidej nákupní seznam"}
        </button>
      </div>

      <div
        className="modal fade"
        id="addListModal"
        tabindex="-1"
        aria-labelledby="addListModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addListModalLabel">
                {context.language === "en"
                  ? "Add shopping list"
                  : "Přidej nákupní seznam"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-outline mb-3">
                <label for="name" className="form-label text-dark">
                  {context.language === "en" ? "List name" : "Název seznamu"}
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control text-dark"
                  placeholder="List name"
                  value={list.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                {context.language === "en" ? "Close" : "Zavřít"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addList}>
                {context.language === "en" ? "Add" : "Přidat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddList;
