import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const DeleteList = (props) => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const deleteList = () => {
    let list = context.lists.filter((list) => list.name === props.id)[0];
    context.setLists(context.lists.filter((list) => list.name !== props.id));
    navigate("/");
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteListModal">
          Delete shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id="deleteListModal"
        tabindex="-1"
        aria-labelledby="deleteListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteListModalLabel">
                Delete shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
            <p>Are you sure you want to delete this List?</p>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteList}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteList;
