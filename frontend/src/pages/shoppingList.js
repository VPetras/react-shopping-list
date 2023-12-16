import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/items/itemlist";
import AddItem from "../components/items/additem";
import DeleteList from "../components/listcard/deletelist";
import EditList from "../components/listcard/editlist";

import { ShoppingListContext } from "../context/shoppingListContext";
import ArchiveList from "../components/listcard/archivelist";
import UnArchiveList from "../components/listcard/unarchivelist";

import {
  getListFetch,
  editListFetch,
  deleteListFetch,
} from "../fetch/listFetches";
import SinglePie from "../components/Graph/Pie";

const ShoppingList = (props) => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();

  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);

  const handleArchive = (e) => {
    e.preventDefault();

    setList((prevState) => ({
      ...prevState,
      archived: true,
    }));

    console.log("archive list");
  };

  const handleUnArchive = (e) => {
    e.preventDefault();
    setList((prevState) => ({
      ...prevState,
      archived: false,
    }));
    console.log("unarchive list");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteListFetch(list._id, context.user)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));

    console.log("delete list");
  };

  const handleAddItem = (item) => {
    item.id = list.item_list.length + 1;
    setList((prevState) => ({
      ...prevState,
      item_list: [...prevState.item_list, item],
    }));
  };

  const handleEditList = (list) => {
    setList(list);
    console.log("edit list");
  };

  const handleDeleteItem = (item) => {
    setList((prevState) => ({
      ...prevState,
      item_list: prevState.item_list.filter((i) => i.id !== item.id),
    }));
  };

  const handleEditItem = (item) => {
    setList((prevState) => ({
      ...prevState,
      item_list: prevState.item_list.map((i) => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      }),
    }));
  };

  const handleCheckItem = (item) => {
    setList((prevState) => ({
      ...prevState,
      item_list: prevState.item_list.map((i) => {
        if (i.id === item.id) {
          return { ...i, checked: !i.checked };
        } else {
          return i;
        }
      }),
    }));
  };

  useEffect(() => {
    if (list._id !== undefined) {
      editListFetch(list, context.user);
    }
  }, [list, context.user]);

  useEffect(() => {
    getListFetch(props.id, context.user)
      .then((data) => {
        console.log("debug", data);
        setList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        //navigate("/404");
      });
  }, [context.user, props.id, list]);

  if (loading) {
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
    return (
      <>
        <div className="container p-5">
          <h1>{list.name}</h1>
          <div className="row">
            {context.user._id === list.owner_id && (
              <>
                <DeleteList id={list.id} handleDelete={handleDelete} />
                <EditList list={list} handleEdit={handleEditList} />
                {!list.archived ? (
                  <ArchiveList id={list.id} handleArchive={handleArchive} />
                ) : (
                  <UnArchiveList
                    id={list.id}
                    handleUnArchive={handleUnArchive}
                  />
                )}
              </>
            )}
          </div>
          <div className="row">
            <div className="col-8">
              <ItemList
                id={list.id}
                items={list.item_list}
                handleCheckItem={handleCheckItem}
                handleDeleteItem={handleDeleteItem}
                handleEditItem={handleEditItem}
              />
            </div>
            <div
              className="col-2"
              style={{ minWidth: "300px", maxHeight: "400px" }}>
              <SinglePie
                checked={
                  list.item_list.filter((i) => i.checked === true).length
                }
                items={list.item_list.length}
              />
            </div>
          </div>
          <AddItem id={list.id} handleAddItem={handleAddItem} />
        </div>
      </>
    );
  }
};

export default ShoppingList;
