import React, { useContext } from "react";
import { ShoppingListContext } from "../../context/shoppingListContext";

const UnArchiveList = (props) => {
  const context = useContext(ShoppingListContext);
  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#unArchiveListModal" + props.id}>
          {context.language === "en"
            ? "Unarchive shopping list"
            : "Odarchivovat nákupní seznam"}
        </button>
      </div>

      <div
        class="modal fade"
        id={"unArchiveListModal" + props.id}
        tabindex="-1"
        aria-labelledby="unArchiveListModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="unArchiveListModalLabel">
                {context.language === "en"
                  ? "Unarchive shopping list"
                  : "Odarchivovat nákupní seznam"}
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
                  ? "Are you sure you want to unArchive this List?"
                  : "Opravdu chcete odarchivovat tento seznam?"}
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
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={props.handleUnArchive}>
                {context.language === "en" ? "Unarchive" : "Odarchivovat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnArchiveList;
