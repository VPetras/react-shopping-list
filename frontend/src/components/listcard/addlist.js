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
      <div className="col-md-6">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addListModal">
          Add shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id="addListModal"
        tabindex="-1"
        aria-labelledby="addListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="addListModalLabel">
                Add shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white">
              <div className="form-outline form-white mb-3">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="List name"
                  value={list.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addList}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddList;
