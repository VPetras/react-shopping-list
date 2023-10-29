import React, { useState, createContext } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [visualList, setVisualList] = useState("active");
  const [users, setUsers] = useState([
    {
      nickname: "VPetras",
      lists: {
        active: ["List1", "List2"],
        shared: ["List3"],
        archived: ["List4"],
      },
    },
    { nickname: "Sonic", lists: { active: [], shared: [], archived: [] } },
  ]);

  const [lists, setLists] = useState([
    {
      name: "List1",
      owner: "VPetras",
      created: "2021-04-20",
      items: [
        { name: "brambory", checked: false, quantity: "1kg" },
        { name: "mouka", checked: true, quantity: "1kg" },
        { name: "máslo", checked: false, quantity: "250g" },
        { name: "mléko", checked: false, quantity: "1l" },
      ],
    },
    {
      name: "List2",
      created: "2022-03-19",
      owner: "VPetras",
      items: [
        { name: "chleba", checked: false, quantity: "1ks" },
        { name: "máslo", checked: true, quantity: "250g" },
        { name: "mléko", checked: true, quantity: "1l" },
      ],
    },
    {
      name: "List3",
      created: "2023-02-18",
      owner: "Sonic",
      items: [
        { name: "hranolky", checked: false, quantity: "1kg" },
        { name: "ketchup", checked: false, quantity: "1ks" },
        { name: "hamburger", checked: false, quantity: "1ks" },
      ],
    },
    {
      name: "List4",
      created: "2012-09-01",
      owner: "VPetras",
      items: [
        { name: "rajcata", checked: false, quantity: "1kg" },
        { name: "porek", checked: false, quantity: "1ks" },
      ],
    },
    {
      name: "List5",
      created: "2032-08-07",
      owner: "VPetras",
      items: [
        { name: "prasek do peciva", checked: false, quantity: "1ks" },
        { name: "kakao", checked: false, quantity: "1ks" },
        { name: "cukr", checked: false, quantity: "1ks" },
        { name: "vanilkovy cukr", checked: false, quantity: "1ks" },
      ],
    },
  ]);

  return (
    <ShoppingListContext.Provider
      value={{
        users,
        setUsers,
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
