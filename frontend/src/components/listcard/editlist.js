import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const EditList = (props) => {
  const context = useContext(ShoppingListContext);
  const [list, setList] = useState(props.list);

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setList((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(list);
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#editListModal" + list.id}>
          {context.language === "en" ? "Edit shopping list" : "Upravit seznam"}
        </button>
      </div>

      <div
        class="modal fade"
        id={"editListModal" + list.id}
        tabindex="-1"
        aria-labelledby="editListModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editListModalLabel">
                {context.language === "en"
                  ? "Edit shopping list"
                  : "Upravit seznam"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
              <div className="form-outline mb-3">
                <label for="description" className="form-label text-dark">
                  {context.language === "en" ? "Shared with" : "Sdíleno s "}
                </label>
                <input
                  id="shared_users"
                  type="text"
                  className="form-control text-dark"
                  placeholder="Shared with"
                  value={list.shared_users}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                {context.language === "en" ? "Close" : "Zavřít"}
              </button>
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={handleEdit}>
                {context.language === "en" ? "Edit" : "Upravit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditList;
