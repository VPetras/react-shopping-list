import React, { useState } from "react";

const EditItem = (props) => {
  const [item, setItem] = useState({
    id: props.item.id,
    name: props.item.name,
    quantity: props.item.quantity,
    checked: false,
  });

  const editItem = (e) => {
    e.preventDefault();
    props.handleEdit(item);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={"#editItemModal" + item.id}>
        Edit item
      </button>

      <div
        className="modal fade"
        id={"editItemModal" + item.id}
        tabindex="-1"
        aria-labelledby="editItemModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="editItemModalLabel">
                Edit item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body bg-dark text-white">
              <div className="form-outline form-white mb-3">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Item name"
                  value={item.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-outline form-white mb-3">
                <input
                  id="quantity"
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={editItem}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
