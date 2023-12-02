import React, { useState, useEffect } from "react";

import DeleteItem from "./deleteitem";
import EditItem from "./edititem";

const ItemList = (props) => {
  console.log("ItemList", props.items);

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
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Bought</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
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
              <td>{item.quantity}</td>
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
