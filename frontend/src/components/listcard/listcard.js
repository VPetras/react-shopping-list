import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Owner: {props.owner}</p>
          <p className="card-text">Status: {props.status}</p>
          <Link to={`/list/${props.id}`} className="btn btn-primary">
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
