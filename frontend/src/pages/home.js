import React from "react";

import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import { ShoppingListContext } from "../context/shoppingListContext";
import ShoppingListList from "../components/shoppingList";

class Home extends React.Component {
  static contextType = ShoppingListContext;

  setVisual = (visual) => {
    this.context.setVisualList(visual);
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          {this.context.logged !== false ? (
            <>
              <div class="input-group mb-3 mt-5">
                <button
                  type="submit"
                  class="btn btn-primary mb-3 form-control border border-dark"
                  style={{ borderRadius: "20px 0px 0px 20px" }}
                  onClick={() => this.setVisual("active")}>
                  My active
                </button>
                <button
                  type="submit"
                  class="btn btn-primary mb-3 form-control border border-dark"
                  onClick={() => this.setVisual("shared")}>
                  Shared
                </button>
                <button
                  type="submit"
                  class="btn btn-primary mb-3 form-control border border-dark "
                  style={{ borderRadius: "0px 20px 20px 0px" }}
                  onClick={() => this.setVisual("archived")}>
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
        <Footer />
      </>
    );
  }
}

export default Home;
