import React, { useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const ArchiveList = (props) => {
  const context = useContext(ShoppingListContext);
  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#archiveListModal" + props.id}>
          {context.language === "en"
            ? "Archive shopping list"
            : "Archivovat seznam"}
        </button>
      </div>

      <div
        class="modal fade"
        id={"archiveListModal" + props.id}
        tabindex="-1"
        aria-labelledby="archiveListModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="archiveListModalLabel">
                {context.language === "en"
                  ? "Archive shopping list"
                  : "Archivovat seznam"}
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
                  ? "Are you sure you want to archive this List?"
                  : "Opravdu chcete archivovat tento seznam?"}
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
                onClick={props.handleArchive}>
                {context.language === "en" ? "Archive" : "Archivovat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveList;
