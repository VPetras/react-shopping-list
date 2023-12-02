// 404 not found page

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col">
          <h1>404 - Page not found</h1>
          <Link to="/" className="btn btn-primary">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
