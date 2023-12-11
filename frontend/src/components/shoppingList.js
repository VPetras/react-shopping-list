import React, { useContext, useEffect } from "react";
import { ShoppingListContext } from "../context/shoppingListContext";
import ListCard from "./listcard/listcard";
import AddList from "./listcard/addlist";
import { addListFetch, getListsFetch } from "../fetch/listFetches";

const ShoppingListList = (props) => {
  const context = useContext(ShoppingListContext);

  const handleAdd = (list) => {
    addListFetch(list, context.user).then((list) => {
      context.setLists((prevState) => ({
        ...prevState,
        active_lists: [...prevState.active_lists, list],
      }));
    });
    console.log("add list");
  };

  useEffect(() => {
    getListsFetch(context.user)
      .then((lists) => {
        context.setLists(lists);
      })
      .catch((error) => console.log(error));
  }, [context]);

  const showLists = () => {
    if (context.logged) {
      let userLists = [];

      if (context.visualList === "active") {
        userLists = context.lists.active_lists;
      } else if (context.visualList === "shared") {
        userLists = context.lists.shared_lists;
      } else {
        userLists = context.lists.archived_lists;
      }
      console.log(context.lists);
      if (userLists === undefined) {
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
        return userLists.map((list) => (
          <ListCard
            id={list._id}
            key={list._id}
            name={list.name}
            owner={list.owner_name}
            status={`${
              list.item_list.filter((i) => i.checked === true).length
            }/${list.item_list.length}`}
          />
        ));
      }
    } else {
      return <p>You must be logged in to see your lists.</p>;
    }
  };

  return (
    <>
      <div className="container pb-5">
        <div>
          {context.visualList === "active" && (
            <h1>
              {context.language === "en"
                ? "Your active shoping lists"
                : "Aktivní nákupní seznamy"}
            </h1>
          )}
          {context.visualList === "shared" && (
            <h1>
              {context.language === "en"
                ? "Your shared shoping lists"
                : "Sdílené nákupní seznamy"}
            </h1>
          )}
          {context.visualList === "archived" && (
            <h1>
              {context.language === "en"
                ? "Your archived shoping lists"
                : "Archivované nákupní seznamy"}
            </h1>
          )}
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
