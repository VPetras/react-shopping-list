import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../context/shoppingListContext";
import ShoppingListList from "../components/shoppingList";

const ShoppingList = (props) => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const items = context.lists.filter((list) => list.name === props.id)[0].items;

  const showItems = () => {
    return items.map((item) => (
      <div class="input-group mb-3 mt-5">
        <span class="input-group-text w-50" id="inputGroup-sizing-lg">
          {item.name}
        </span>
        <span class="input-group-text w-25" id="inputGroup-sizing-sm">
          {item.quantity}
        </span>
        <button class="input-group-text" id="inputGroup-sizing-sm">
          {item.checked ? "checked" : "unchecked"}
        </button>
      </div>
    ));
  };

  return (
    <>
      <div className="container">
        <h1 className="">{props.id}</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">{showItems()}</div>
      </div>
    </>
  );
};

export default ShoppingList;
