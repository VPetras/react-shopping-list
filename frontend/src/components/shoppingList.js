import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../context/shoppingListContext";
import ListCard from "./listcard/listcard";

const ShoppingListList = () => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const showLists = () => {
    if (context.logged) {
      const userLists = context.lists.filter(
        (list) => list.owner === context.user.nickname
      );
      return userLists.map((list) => (
        <ListCard
          key={list._id}
          name={list.name}
          owner={list.owner}
          created={list.created}
          status={`${list.items.filter((i) => i.checked === true).length}/${
            list.items.length
          }`}
        />
      ));
    } else {
      return <p>You must be logged in to see your lists.</p>;
    }
  };

  return (
    <>
      <div className="container pb-5">
        <h1>Shopping List List</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">{showLists()}</div>
      </div>
    </>
  );
};

export default ShoppingListList;
