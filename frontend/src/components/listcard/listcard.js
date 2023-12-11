import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";

const ListCard = (props) => {
  const context = useContext(ShoppingListContext);
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            {context.language === "en"
              ? "Owner: " + props.owner
              : "Majitel: " + props.owner}
          </p>
          <p className="card-text">Status: {props.status}</p>
          <Link to={`/list/${props.id}`} className="btn btn-primary">
            {context.language === "en" ? "Open" : "Otevřít"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
