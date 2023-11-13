import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const EditList = (props) => {
  const context = useContext(ShoppingListContext);

  let l = context.lists.filter((list) => list.name === props.id)[0];

  const [list, setList] = useState({
    id: l.id,
    owner: l.owner,
    name: l.name,
    items: l.items,
    shared: l.shared,
    created: l.created,
    archived: l.archived,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setList({ ...list, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#editListModal" + list.id}>
          Edit shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id={"editListModal" + list.id}
        tabindex="-1"
        aria-labelledby="editListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="editListModalLabel">
                Edit shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
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
            <div className="form-outline form-white mb-3">
              <input
                id="shared"
                type="text"
                className="form-control"
                placeholder="Shared with"
                value={list.shared}
                onChange={handleChange}
              />
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
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={props.handleEditList}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditList;
