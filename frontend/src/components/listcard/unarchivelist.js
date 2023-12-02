import React from "react";

const UnArchiveList = (props) => {
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
                onClick={props.handleUnArchive}>
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
