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

    let newId = 0;
    if (context.lists.length > 0) {
      newId = context.lists[context.lists.length - 1].id + 1;
    }

    let newList = {
      id: newId,
      owner: context.user.nickname,
      name: list.name,
      items: [],
      created: new Date().toISOString,
    };

    let user = context.users.filter(
      (user) => user.nickname === context.user.nickname
    )[0];
    user.lists.active.push(newList.name);
    context.setUsers([...context.users, user]);

    context.setLists([...context.lists, newList]);
    setList({
      name: "",
    });
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
