import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../context/shoppingListContext";
import ListCard from "./listcard/listcard";
import AddList from "./listcard/addlist";

const ShoppingListList = (props) => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
  };

  const showLists = () => {
    if (context.logged) {
      let userLists = [];
      if (context.visualList === "active") {
        userLists = context.lists.filter(
          (list) => list.owner === context.user.nickname
        );
      } else if (context.visualList === "shared") {
        let user_shared_lists = context.users.filter(
          (user) => user.nickname === context.user.nickname
        );
        userLists = context.lists.filter((list) =>
          user_shared_lists[0].lists.shared.includes(list.name)
        );
      } else if (context.visualList === "archived") {
        let user_archived_lists = context.users.filter(
          (user) => user.nickname === context.user.nickname
        );
        userLists = context.lists.filter((list) =>
          user_archived_lists[0].lists.archived.includes(list.name)
        );
      }

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
        <div>
          <h1>Your {context.visualList} shopping list</h1>
        </div>
        {context.visualList === "active" && (
          <div className="row pb-5">{<AddList handleAdd={handleAdd} />}</div>
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">{showLists()}</div>
      </div>
    </>
  );
};

export default ShoppingListList;
