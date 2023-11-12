import React, { Component } from "react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: "", valid: false, touched: false },
      lastname: { value: "", valid: false, touched: false },
      nickname: { value: "", valid: false, touched: false },
      email: { value: "", valid: false, touched: false },
      password: { value: "", valid: false, touched: false },
      password2: { value: "", valid: false, touched: false },
      submitting: false,
    };
  }
  postRegister = () => {
    const { name, lastname, nickname, email, password } = this.state;
    const user = {
      name: name.value,
      lastname: lastname.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value,
    };
    fetch("https://api.uu.vojtechpetrasek.com/v4/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("status" in data) {
          this.setState({ registered: true });
          setInterval(() => {
            window.location.href = "/login";
          }, 500);
        } else {
          if (data.nickname) {
            this.setState((state) => ({
              ...state,
              nickname: {
                ...state.nickname,
                valid: false,
                touched: true,
                errMsg: "Nickname is already taken",
              },
            }));
          }
          if (data.email) {
            this.setState((state) => ({
              ...state,
              email: {
                ...state.email,
                valid: false,
                touched: true,
                errMsg: "Email is already taken",
              },
            }));
          }
        }
      });
  };

  register = (e) => {
    e.preventDefault();

    if (
      this.state.name.valid &&
      this.state.lastname.valid &&
      this.state.nickname.valid &&
      this.state.email.valid &&
      this.state.password.valid &&
      this.state.password2.valid
    ) {
      this.setState({ submitting: true });
      this.postRegister();
      this.setState({ submitting: false });
    } else {
      alert("Please fill out all the fields");
    }
  };

  handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "name") {
      this.setState({
        [id]: {
          ...this.state[id],
          value: value,
          valid: value.length > 0,
          touched: true,
          errMsg: "Name is required",
        },
      });
    } else if (id === "lastname") {
      this.setState({
        [id]: {
          ...this.state[id],
          value: value,
          valid: value.length > 0,
          touched: true,
          errMsg: "Last name is required",
        },
      });
    } else if (id === "nickname") {
      this.setState({
        [id]: {
          ...this.state[id],
          value: value,
          valid: value.length > 0,
          touched: true,
          errMsg: "Nickname is required",
        },
      });
    } else if (id === "email") {
      if (value.length === 0) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Email is required",
          },
        });
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Email is not valid",
          },
        });
      } else {
        this.setState({
          [id]: { ...this.state[id], value: value, valid: true, touched: true },
        });
      }
    } else if (id === "password") {
      if (value.length === 0) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Password is required",
          },
        });
      } else if (value.length < 8) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Password must be at least 8 characters long",
          },
        });
      } else if (!/\d/.test(value)) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Password must contain at least one digit",
          },
        });
      } else {
        this.setState({
          [id]: { ...this.state[id], value: value, valid: true, touched: true },
        });
      }
    } else if (id === "password2") {
      if (value.length === 0) {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Password is required",
          },
        });
      } else if (value === this.state.password.value) {
        this.setState({
          [id]: { ...this.state[id], value: value, valid: true, touched: true },
        });
      } else {
        this.setState({
          [id]: {
            ...this.state[id],
            value: value,
            valid: false,
            touched: true,
            errMsg: "Passwords do not match",
          },
        });
      }
    }
  };

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
                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={
                      "form-control form-control-lg h-50" +
                      (this.state.name.touched
                        ? this.state.name.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter your name"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.name.errMsg
                      ? this.state.name.errMsg
                      : "You must provide valid name."}
                  </div>
                  <div className="valid-feedback">Looks good.</div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="lastname">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className={
                      "form-control form-control-lg" +
                      (this.state.lastname.touched
                        ? this.state.lastname.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter your surname"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.lastname.errMsg
                      ? this.state.lastname.errMsg
                      : "You must provide valid last name."}
                  </div>
                  <div className="valid-feedback">Looks good.</div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="nickname">
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    className={
                      "form-control form-control-lg" +
                      (this.state.nickname.touched
                        ? this.state.nickname.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter your nickname"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.nickname.errMsg
                      ? this.state.nickname.errMsg
                      : "You must provide valid name."}
                  </div>
                  <div className="valid-feedback">Looks good.</div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={
                      "form-control form-control-lg" +
                      (this.state.email.touched
                        ? this.state.email.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter a valid email address"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.email.errMsg
                      ? this.state.email.errMsg
                      : "You must provide valid email."}
                  </div>
                  <div className="valid-feedback">Looks good.</div>
                </div>

                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={
                      "form-control form-control-lg" +
                      (this.state.password.touched
                        ? this.state.password.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.password.errMsg
                      ? this.state.password.errMsg
                      : "You must provide valid password."}
                  </div>

                  <div className="valid-feedback">Looks good.</div>
                </div>
                <div className="form-outline form-white mb-2">
                  <label className="form-label" htmlFor="password2">
                    Repeat password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    className={
                      "form-control form-control-lg" +
                      (this.state.password2.touched
                        ? this.state.password2.valid
                          ? " is-valid"
                          : " is-invalid"
                        : "")
                    }
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.password2.errMsg
                      ? this.state.password2.errMsg
                      : "You must provide valid password."}
                  </div>

                  <div className="valid-feedback">Passwords match.</div>
                </div>

                <button
                  className="btn btn-outline-light btn-lg px-5 mb-2"
                  type="submit"
                  onClick={this.register}>
                  Register
                </button>
                <p className="form-outline">
                  Already registerd?{" "}
                  <a href="/login" className="text-white-50 fw-bold">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
