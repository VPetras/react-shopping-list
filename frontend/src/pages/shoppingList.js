import React from "react";

import { ShoppingListContext } from "../context/shoppingListContext";

class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
    };
  }

  checkItem = (item) => {
    console.log("item: ", item);
    console.log(this.context.lists);
    let currentlist = this.context.lists.find((l) => l.name === this.props.id);
    console.log("currentlist: ", currentlist);
    let currentitem = currentlist.items.find((i) => i.name === item);
    console.log("currentitem: ", currentitem);
    console.log("currentitem.checked: ", currentitem.checked);
    console.log(this.context.lists[currentlist]);

    let index = this.context.lists.findIndex((l) => l.name === this.props.id);
    console.log("index: ", index);

    this.context.setLists(...this.context.lists, [
      { name: "test", items: [{ name: "test", quantity: 1, checked: true }] },
    ]);

    console.log("lists: ", this.context.lists);
  };

  showList = (List) => {
    let currentlist = this.context.lists.find((l) => l.name === List);
    console.log("currentlist: ", currentlist);

    return (
      <>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Bought</th>
            </tr>
          </thead>
          <tbody>
            {currentlist.items.map((item) => (
              <tr>
                <td scope="col">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => this.checkItem(item.name)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.checked ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  render() {
    return (
      <>
        <div className="container">
          <h1>{this.props.id}</h1>
          <button onClick={() => this.checkItem("máslo")}>test</button>
          {this.showList(this.props.id)}
        </div>
      </>
    );
  }
}

export default ShoppingList;
