import React, { useState, createContext } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [visualList, setVisualList] = useState("active");
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);

  return (
    <ShoppingListContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        token,
        setToken,
        lists,
        setLists,
        logged,
        setLogged,
        visualList,
        setVisualList,
      }}>
      {props.children}
    </ShoppingListContext.Provider>
  );
};
