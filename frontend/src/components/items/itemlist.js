import React, { useState, useEffect, useContext } from "react";

import DeleteItem from "./deleteitem";
import EditItem from "./edititem";

import { ShoppingListContext } from "../../context/shoppingListContext";

const ItemList = (props) => {
  const context = useContext(ShoppingListContext);

  const [items, setItems] = useState(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const handleDelete = (item) => {
    props.handleDeleteItem(item);
  };

  const handleEdit = (item) => {
    props.handleEditItem(item);
  };

  const checkItem = (item) => {
    props.handleCheckItem(item);
  };

  const showItems = () => {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">
              {context.language === "en" ? "Item" : "Položka"}
            </th>
            <th scope="col">
              {context.language === "en" ? "Quantity" : "Množství"}
            </th>
            <th scope="col">
              {context.language === "en" ? "Bought" : "Nakoupeno"}
            </th>
            <th scope="col">
              {context.language === "en" ? "Edit" : "Editace"}
            </th>
            <th scope="col">
              {context.language === "en" ? "Delete" : "Mazání"}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    checkItem(item);
                  }}
                />
              </th>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.quantity + " " + item.unit}</td>
              <td>{item.checked ? "Yes" : "No"}</td>
              <td>
                <EditItem id={props.id} item={item} handleEdit={handleEdit} />
              </td>
              <td>
                <DeleteItem
                  id={props.id}
                  item={item}
                  handleDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  if (props.items === undefined) {
    //return loading spinner
    return (
      <div>
        Loading...
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"></span>
      </div>
    );
  } else {
    return <>{showItems()}</>;
  }
};

export default ItemList;
