import React, { Component } from "react";

import { AuthContext } from "../../context/AuthProvider";

class AccountForm extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}>
          <div
            className="card bg-dark text-white"
            style={{ borderRadius: "1rem" }}>
            <div className="card-body text-center">
              <div className="mb-md-1 mt-md-4 px-2 mx-4">
                <h2 className="fw-bold mb-2 text-uppercase">Account</h2>

                <div className="row from-control">
                  <div className="col-md-6 form-outline form-white mb-2">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        id="name"
                        className={"form-control form-control-lg h-50"}
                        placeholder="Enter your name"
                      />
                      <button
                        className="btn btn-primary input-group-text px-2"
                        id="name">
                        change
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 form-outline form-white mb-2">
                    <label className="form-label" htmlFor="lastname">
                      Surname
                    </label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        id="lastname"
                        className={"form-control form-control-lg"}
                        placeholder="Enter your surname"
                      />
                      <button
                        className="btn btn-primary input-group-text px-2"
                        id="lastname">
                        change
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="nickname">
                    Nickname
                  </label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      id="nickname"
                      className={"form-control form-control-lg"}
                      placeholder="Enter your nickname"
                    />
                    <button
                      className="btn btn-primary input-group-text px-2"
                      id="nickname">
                      change
                    </button>
                  </div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <div class="input-group mb-3">
                    <input
                      type="email"
                      id="email"
                      className={"form-control form-control-lg"}
                      placeholder="Enter a valid email address"
                    />
                    <button
                      className="btn btn-primary input-group-text px-2"
                      id="email">
                      change
                    </button>
                  </div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={"form-control form-control-lg"}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="password2">
                    Repeat password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    className={"form-control form-control-lg"}
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg px-5 mb-2"
                  type="submit">
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountForm;
