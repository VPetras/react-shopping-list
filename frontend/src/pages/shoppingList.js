import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../context/shoppingListContext";
import ShoppingListList from "../components/shoppingList";

const ShoppingList = (props) => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1 className="center">{props.id}</h1>
      </div>
    </>
  );
};

export default ShoppingList;
