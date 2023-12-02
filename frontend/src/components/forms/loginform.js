import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../../context/shoppingListContext";
import { loginFetch } from "../../fetch/userFetches";

export const LoginForm = () => {
  const context = useContext(ShoppingListContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    valid: false,
    touched: false,
    errMsg: "",
  });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    touched: false,
    errMsg: "",
  });

  const login = (e) => {
    e.preventDefault();
    if (email.value === "" || password.value === "") {
      setEmail({
        ...email,
        touched: true,
        valid: false,
        errMsg: "You must provide valid email.",
      });
      setPassword({
        ...password,
        touched: true,
        valid: false,
        errMsg: "You must provide valid password.",
      });
    } else {
      setSubmitting(true);
      postLogin();
    }
  };

  const postLogin = () => {
    loginFetch(email.value, password.value, context)
      .then((user) => {
        console.log("User authenticated:", user);
        context.setLogged(true);
        context.setUser(user);
        navigate("/");
        setSubmitting(false);
      })
      .catch((error) => {
        if (error === "User not exist") {
          setEmail({
            ...email,
            valid: false,
            touched: true,
            errMsg: "User not found",
          });
          setPassword({
            ...password,
            valid: false,
            touched: true,
            errMsg: "Wrong password",
          });
        }
        if (error === "Wrong password") {
          setPassword({
            ...password,
            valid: false,
            touched: true,
            errMsg: "Wrong password",
          });
        }
        setSubmitting(false);
      });
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    if (
      e.target.value === "" ||
      e.target.value === null ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmail({
        value: e.target.value,
        valid: false,
        touched: true,
        errMsg: "You must provide valid email.",
      });
    } else {
      setEmail({
        value: e.target.value,
        valid: true,
        touched: true,
        errMsg: "",
      });
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (e.target.value === "" || e.target.value === null) {
      setPassword({
        value: e.target.value,
        valid: false,
        touched: true,
        errMsg: "You must provide valid password.",
      });
    } else {
      setPassword({
        value: e.target.value,
        valid: true,
        touched: true,
        errMsg: "",
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center" style={{ height: "70vh" }}>
        <div
          className="card bg-dark text-white"
          style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your email and password!
              </p>

              <div className="form-outline form-white mb-3">
                <label className="form-label" htmlFor="typeEmailX">
                  Email
                </label>
                <input
                  type="email"
                  id="typeEmailX"
                  className={
                    "form-control form-control-lg" +
                    (email.touched
                      ? email.valid
                        ? " is-valid"
                        : " is-invalid"
                      : "")
                  }
                  placeholder="Enter a valid email address"
                  onChange={handleEmailChange}
                  value={email.value}
                />
                <div className="invalid-feedback">
                  {email.errMsg
                    ? email.errMsg
                    : "You must provide valid email."}
                </div>
                <div className="valid-feedback">Looks good.</div>
              </div>

              <div className="form-outline form-white mb-3">
                <label className="form-label" htmlFor="typePassword">
                  Password
                </label>
                <input
                  type="password"
                  id="typePassword"
                  className={
                    "form-control form-control-lg" +
                    (password.touched
                      ? password.valid
                        ? " is-valid"
                        : " is-invalid"
                      : "")
                  }
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  value={password.value}
                />

                <div className="invalid-feedback">
                  {password.errMsg
                    ? password.errMsg
                    : "You must provide valid password."}
                </div>

                <div className="valid-feedback">Looks good.</div>
              </div>

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>

              <button
                className={
                  "btn btn-outline-light btn-lg px-5" +
                  (submitting ? " disabled" : "")
                }
                type="submit"
                onClick={login}>
                {submitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"></span>
                ) : (
                  "Login"
                )}
              </button>
              <p className="mb-0">
                Don't have an account?{" "}
                <a href="/register" className="text-white-50 fw-bold">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
