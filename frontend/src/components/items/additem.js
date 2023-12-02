import React, { useState } from "react";

const AddItem = (props) => {
  const [item, setItem] = useState({
    name: "",
    quantity: "",
    checked: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    props.handleAddItem(item);
    setItem({
      name: "",
      quantity: "",
      checked: false,
    });
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addItemModal">
        Add item
      </button>

      <div
        class="modal fade"
        id="addItemModal"
        tabindex="-1"
        aria-labelledby="addItemModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="addItemModalLabel">
                Add item
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-white">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addItem}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
