import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const AddItem = (props) => {
  const context = useContext(ShoppingListContext);
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
      unit: "",
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
        {context.language === "en" ? "Add item" : "Přidat položku"}
      </button>

      <div
        class="modal fade"
        id="addItemModal"
        tabindex="-1"
        aria-labelledby="addItemModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addItemModalLabel">
                {context.language === "en" ? "Add item" : "Přidat položku"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="form-outline mb-3">
                <label for="name" className="form-label">
                  {context.language === "en" ? "Item name" : "Název položky"}
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control text-dark"
                  placeholder="Item name"
                  value={item.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-outline mb-3">
                <label for="quantity" className="form-label">
                  {context.language === "en" ? "Quantity" : "Množství"}
                </label>
                <input
                  id="quantity"
                  type="text"
                  className="form-control text-dark"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-outline mb-3">
                <label for="unit" className="form-label">
                  {context.language === "en" ? "Unit" : "Jednotky"}
                </label>
                <input
                  id="unit"
                  type="text"
                  className="form-control text-dark"
                  placeholder="Unit"
                  value={item.unit}
                  onChange={handleChange}
                />
              </div>
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
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addItem}>
                {context.language === "en" ? "Add item" : "Přidat položku"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
