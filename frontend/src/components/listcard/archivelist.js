import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const ArchiveList = (props) => {
  const context = useContext(ShoppingListContext);

  const archiveList = (e) => {
    e.preventDefault();

    if (!context.logged) {
      alert("You must be logged in to archive a list.");
      return;
    }

    let list = context.lists.filter((list) => list.name === props.id)[0];
    let user = context.users.filter(
      (user) => user.nickname === context.user.nickname
    )[0];

    user.lists.active = user.lists.active.filter((list) => list !== props.id);
    user.lists.archived.push(props.id);
    context.setUsers([...context.users, user]);

    list.archived = true;

    context.setLists([...context.lists, list]);
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#archiveListModal" + props.id}>
          Archive shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id={"archiveListModal" + props.id}
        tabindex="-1"
        aria-labelledby="archiveListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="archiveListModalLabel">
                Archive shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
            <p>Are you sure you want to archive this List?</p>
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
                onClick={archiveList}>
                {" "}
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveList;
