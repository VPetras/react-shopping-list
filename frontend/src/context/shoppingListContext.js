import React, { useState, createContext } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [visualList, setVisualList] = useState("active");
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const languages = [
    { code: "en", name: "English" },
    { code: "cs", name: "Čeština" },
  ];

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
        theme,
        setTheme,
        language,
        setLanguage,
        languages,
      }}>
      {props.children}
    </ShoppingListContext.Provider>
  );
};
