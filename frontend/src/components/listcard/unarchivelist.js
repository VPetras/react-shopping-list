import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const UnArchiveList = (props) => {
  const context = useContext(ShoppingListContext);

  const unArchiveList = (e) => {
    e.preventDefault();

    if (!context.logged) {
      alert("You must be logged in to unArchive a list.");
      return;
    }

    let list = context.lists.filter((list) => list.name === props.id)[0];
    let user = context.users.filter(
      (user) => user.nickname === context.user.nickname
    )[0];
    user.lists.archived = user.lists.archived.filter(
      (list) => list !== props.id
    );
    user.lists.active.push(props.id);
    context.setUsers([...context.users, user]);

    list.archived = false;

    context.setLists([...context.lists, list]);
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#unArchiveListModal" + props.id}>
          Unarchive shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id={"unArchiveListModal" + props.id}
        tabindex="-1"
        aria-labelledby="unArchiveListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="unArchiveListModalLabel">
                unArchive shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
            <p>Are you sure you want to unArchive this List?</p>
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
                onClick={unArchiveList}>
                {" "}
                unArchive
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnArchiveList;
