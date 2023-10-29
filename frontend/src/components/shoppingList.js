import React from "react";

import { ShoppingListContext } from "../context/shoppingListContext";

import { Link } from "react-router-dom";

class ShoppingListList extends React.Component {
  static contextType = ShoppingListContext;
  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
    };
  }

  showList = (List) => {
    let currentlist = this.context.lists.find((l) => l.name === List);
    window.location.href = `/${List}`;
  };

  showLists = () => {
    let user = this.context.logged;
    let userLists = this.context.users.find((u) => u.nickname === user).lists[
      this.context.visualList
    ];
    console.log("userLists: ", userLists);

    let userListsdata = this.context.lists.filter((l) =>
      userLists.includes(l.name)
    );
    console.log("visualList: ", userListsdata);
    userListsdata = userListsdata.map((l) => (
      <>
        <div class="input-group mb-3 mt-5">
          <a className="btn btn-primary" href={"/" + l.name}>
            Open
          </a>
          <span class="input-group-text w-50" id="inputGroup-sizing-lg">
            {l.name}
          </span>
          <span class="input-group-text w-25" id="inputGroup-sizing-sm">
            {l.created}
          </span>
          <span class="input-group-text" id="inputGroup-sizing-sm">
            {l.owner}
          </span>
          <span class="input-group-text" id="inputGroup-sizing-sm">
            {l.items.filter((i) => i.checked === true).length} /{" "}
            {l.items.length}
          </span>
        </div>
      </>
    ));
    return userListsdata;
  };
  render() {
    return (
      <>
        <div>
          <h1>Your {this.context.visualList} shopping list</h1>
        </div>

        {this.showLists()}
      </>
    );
  }
}

export default ShoppingListList;
