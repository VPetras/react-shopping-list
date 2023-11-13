import React, { useState, createContext } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [visualList, setVisualList] = useState("active");
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([
    {
      nickname: "VPetras",
      lists: {
        active: ["List1", "List2", "List5"],
        shared: ["List3"],
        archived: ["List4"],
      },
    },
    {
      nickname: "Sonic",
      lists: { active: ["List3"], shared: ["List2"], archived: [] },
    },
  ]);

  const [lists, setLists] = useState([
    {
      id: 0,
      name: "List1",
      owner: "VPetras",
      created: "2021-04-20",
      archived: false,
      shared: [],
      items: [
        { id: 0, name: "brambory", checked: false, quantity: "1kg" },
        { id: 1, name: "mouka", checked: true, quantity: "1kg" },
        { id: 2, name: "máslo", checked: false, quantity: "250g" },
        { id: 3, name: "mléko", checked: false, quantity: "1l" },
      ],
    },
    {
      id: 1,
      name: "List2",
      created: "2022-03-19",
      owner: "VPetras",
      archived: false,
      shared: ["Sonic"],
      items: [
        { id: 1, name: "chleba", checked: false, quantity: "1ks" },
        { id: 2, name: "máslo", checked: true, quantity: "250g" },
        { id: 3, name: "mléko", checked: true, quantity: "1l" },
      ],
    },
    {
      id: 2,
      name: "List3",
      created: "2023-02-18",
      owner: "Sonic",
      shared: ["VPetras"],
      archived: false,
      items: [
        { id: 0, name: "hranolky", checked: false, quantity: "1kg" },
        { id: 1, name: "ketchup", checked: false, quantity: "1ks" },
        { id: 2, name: "hamburger", checked: false, quantity: "1ks" },
      ],
    },
    {
      id: 3,
      name: "List4",
      created: "2012-09-01",
      owner: "VPetras",
      shared: [],
      archived: true,
      items: [
        { id: 0, name: "rajcata", checked: false, quantity: "1kg" },
        { id: 1, name: "porek", checked: false, quantity: "1ks" },
      ],
    },
    {
      id: 4,
      name: "List5",
      created: "2032-08-07",
      owner: "VPetras",
      shared: [],
      archived: false,
      items: [
        { id: 0, name: "prasek do peciva", checked: false, quantity: "1ks" },
        { id: 1, name: "kakao", checked: false, quantity: "1ks" },
        { id: 2, name: "cukr", checked: false, quantity: "1ks" },
        { id: 3, name: "vanilkovy cukr", checked: false, quantity: "1ks" },
      ],
    },
  ]);

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
