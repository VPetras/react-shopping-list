import React from "react";

const ListCard = (props) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <a href={`/list/${props.name}`} className="btn btn-primary">
            Open
          </a>
        </div>
      </div>
    </div>
  );
};
