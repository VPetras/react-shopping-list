import React, { useState, useContext } from "react";

import { ShoppingListContext } from "../../context/shoppingListContext";

const EditItem = (props) => {
  const context = useContext(ShoppingListContext);
  const [item, setItem] = useState({
    id: props.item.id,
    name: props.item.name,
    quantity: props.item.quantity,
    unit: props.item.unit,
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
        {context.language === "en" ? "Edit" : "Edituj položku"}
      </button>

      <div
        className="modal fade"
        id={"editItemModal" + item.id}
        tabindex="-1"
        aria-labelledby="editItemModalLabel"
        aria-hidden="true"
        data-bs-theme={context.theme}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editItemModalLabel">
                {context.language === "en" ? "Edit item" : "Edituj položku"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-outline mb-3">
                <label htmlFor="name" className="form-label">
                  {context.language === "en" ? "Name" : "Název"}
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
                <label htmlFor="quantity" className="form-label">
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
                <label htmlFor="unit" className="form-label">
                  {context.language === "en" ? "Unit" : "Jednotka"}
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                {context.language === "en" ? "Close" : "Zavřít"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={editItem}>
                {context.language === "en" ? "Save changes" : "Uložit změny"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
