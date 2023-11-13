import React from "react";

const DeleteItem = (props) => {
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
        Delete item
      </button>

      <div
        class="modal fade"
        id={"deleteItemModal" + props.item.id}
        tabindex="-1"
        aria-labelledby="deleteItemModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteItemModalLabel">
                Delete item
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
            <p>Are you sure you want to delete this item?</p>
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
                onClick={deleteItem}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
