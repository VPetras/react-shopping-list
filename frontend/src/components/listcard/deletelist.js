import React, { useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const DeleteList = (props) => {
  const context = useContext(ShoppingListContext);
  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteListModal">
          {context.language === "en"
            ? "Delete shopping list"
            : "Smazat nákupní seznam"}
        </button>
      </div>

      <div
        class="modal fade"
        id="deleteListModal"
        tabindex="-1"
        aria-labelledby="deleteListModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteListModalLabel">
                {context.language === "en"
                  ? "Delete shopping list"
                  : "Smazat nákupní seznam"}
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
                  ? "Are you sure you want to delete this List?"
                  : "Opravdu chcete smazat tento seznam?"}
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
                onClick={props.handleDelete}>
                {context.language === "en" ? "Delete" : "Smazat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteList;
