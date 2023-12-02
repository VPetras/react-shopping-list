import React, { useState } from "react";

const EditList = (props) => {
  const [list, setList] = useState(props.list);

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setList((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(list);
  };

  return (
    <>
      <div className="col-md">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#editListModal" + list.id}>
          Edit shopping list
        </button>
      </div>

      <div
        class="modal fade"
        id={"editListModal" + list.id}
        tabindex="-1"
        aria-labelledby="editListModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="editListModalLabel">
                Edit shopping list
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white"></div>
            <div className="form-outline form-white mb-3">
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="List name"
                value={list.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-outline form-white mb-3">
              <input
                id="shared_users"
                type="text"
                className="form-control"
                placeholder="Shared with"
                value={list.shared_users}
                onChange={handleChange}
              />
            </div>
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
                onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditList;
