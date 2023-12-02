import React from "react";

const ArchiveList = (props) => {
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
                onClick={props.handleArchive}>
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
