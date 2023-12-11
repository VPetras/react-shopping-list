import React, { useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const DeleteItem = (props) => {
  const context = useContext(ShoppingListContext);
  const deleteItem = (e) => {
    e.preventDefault();
    console.log("delete item", props.item);
    props.handleDelete(props.item);
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={"#deleteItemModal" + props.item.id}>
        {context.language === "en" ? "Delete" : "Odebrat"}
      </button>

      <div
        class="modal fade"
        id={"deleteItemModal" + props.item.id}
        tabindex="-1"
        aria-labelledby="deleteItemModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteItemModalLabel">
                {context.language === "en" ? "Delete item" : "Odebrat položku"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>
                {context.language === "en"
                  ? "Are you sure you want to delete this item?"
                  : "Opravdu chcete odebrat tuto položku?"}
              </p>
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
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteItem}>
                {context.language === "en" ? "Delete" : "Odebrat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
