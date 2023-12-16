import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ShoppingListContext } from "../../context/shoppingListContext";
import SingleGauge from "../Graph/Gauge";

const ListCard = (props) => {
  const context = useContext(ShoppingListContext);
  return (
    <div className="col" style={{ minWidth: "400px" }}>
      <div className="card">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <h5 className="card-title">{props.name}</h5>
            <div className="col-4">
              <p className="card-text">
                {context.language === "en"
                  ? "Owner: " + props.owner
                  : "Majitel: " + props.owner}
              </p>
              <p className="card-text">Status: {props.status}</p>
            </div>
            <div className="col-2">
              <SingleGauge checked={props.checked} items={props.items} />
            </div>
          </div>
          <Link to={`/list/${props.id}`} className="btn btn-primary">
            {context.language === "en" ? "Open" : "Otevřít"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
