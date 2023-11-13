import React, { useState, useContext, useEffect } from "react";
import ItemList from "../components/items/itemlist";
import AddItem from "../components/items/additem";
import DeleteList from "../components/listcard/deletelist";
import EditList from "../components/listcard/editlist";

import { ShoppingListContext } from "../context/shoppingListContext";
import ArchiveList from "../components/listcard/archivelist";
import UnArchiveList from "../components/listcard/unarchivelist";

const ShoppingList = (props) => {
  const context = useContext(ShoppingListContext);

  let list = context.lists.filter((list) => list.name === props.id)[0];

  const handleEditList = (l) => {
    context.setLists([...context.lists, l]);
  };

  useEffect(() => {
    list = context.lists.filter((list) => list.name === props.id)[0];
  });

  return (
    <>
      <div className="container p-5">
        <h1>{props.id}</h1>
        <div className="row">
          {context.user.nickname === list.owner && (
            <>
              <DeleteList id={props.id} />
              <EditList id={props.id} handleEdit={handleEditList} />
              {!list.archived ? (
                <ArchiveList id={props.id} />
              ) : (
                <UnArchiveList id={props.id} />
              )}
            </>
          )}
        </div>
        <ItemList id={props.id} />
        {!list.archived && <AddItem id={props.id} />}
      </div>
    </>
  );
};

export default ShoppingList;
