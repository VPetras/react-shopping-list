import React, { useContext, useEffect } from "react";

import { ShoppingListContext } from "../context/shoppingListContext";
import ShoppingListList from "../components/shoppingList";
import { getListsFetch } from "../fetch/listFetches";

const Home = (props) => {
  const context = useContext(ShoppingListContext);

  useEffect(() => {
    if (context.logged) {
      getListsFetch(context.user)
        .then((lists) => {
          context.setLists(lists);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [context.logged]);

  const setVisual = (visual) => {
    context.setVisualList(visual);
  };

  return (
    <>
      <div className="container">
        {context.logged !== false ? (
          <>
            <div className="input-group mb-3 mt-5">
              <button
                type="submit"
                className="btn btn-primary mb-3 form-control border border-dark"
                style={{ borderRadius: "20px 0px 0px 20px" }}
                onClick={() => setVisual("active")}>
                My active
              </button>
              <button
                type="submit"
                className="btn btn-primary mb-3 form-control border border-dark"
                onClick={() => setVisual("shared")}>
                Shared
              </button>
              <button
                type="submit"
                className="btn btn-primary mb-3 form-control border border-dark "
                style={{ borderRadius: "0px 20px 20px 0px" }}
                onClick={() => setVisual("archived")}>
                Archived
              </button>
            </div>
            <ShoppingListList />
          </>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="display-4 mt-5">Shopping List</h1>
                <p className="lead">
                  Shopping List is a simple application for managing your
                  shopping lists.
                </p>
                <p className="lead">
                  You can create your own lists, share them with your friends,
                  and more!
                </p>
                <a>Please log in</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
