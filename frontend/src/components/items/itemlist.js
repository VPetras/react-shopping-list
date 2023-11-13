import React, { useState, useContext } from "react";
import { ShoppingListContext } from "../../context/shoppingListContext";
import DeleteItem from "./deleteitem";
import EditItem from "./edititem";

const ItemList = (props) => {
  const context = useContext(ShoppingListContext);

  const [item, setItem] = useState({
    name: "",
    quantity: "",
    checked: false,
  });

  const handleDelete = (item) => {
    let list = context.lists.filter((list) => list.name === props.id)[0];
    console.log("list", list);
    list.items = list.items.filter((i) => i.id !== item.id);
    console.log("list", list);

    context.setLists([...context.lists, list]);
  };

  const handleEdit = (item) => {
    let list = context.lists.filter((list) => list.name === props.id)[0];
    list.items.forEach((i) => {
      if (i.id === item.id) {
        list.items[list.items.indexOf(i)] = item;
      }
    });

    context.setLists([...context.lists, list]);
  };

  const checkItem = (itemName) => {
    let list = context.lists.filter((list) => list.name === props.id)[0];
    console.log(list);

    list.items.forEach((item) => {
      if (item.name === itemName) {
        item.checked = !item.checked;
      }
    });

    context.setLists([...context.lists, list]);
  };

  const showItems = () => {
    const items = context.lists.filter((list) => list.name === props.id)[0]
      .items;

    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
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
                    checkItem(item.name);
                  }}
                />
              </th>
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

  return <>{showItems()}</>;
};

export default ItemList;
