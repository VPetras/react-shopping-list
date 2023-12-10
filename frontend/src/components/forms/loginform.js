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
        errMsg:
          context.language === "en"
            ? "Email is required."
            : "Email je povinný.",
      });
      setPassword({
        ...password,
        touched: true,
        valid: false,
        errMsg:
          context.language === "en"
            ? "Password is required."
            : "Heslo je povinné.",
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
            errMsg:
              context.language === "en"
                ? "User not found"
                : "Uživatel nenalezen",
          });
          setPassword({
            ...password,
            valid: false,
            touched: true,
            errMsg:
              context.language === "en" ? "Wrong password" : "Špatné heslo",
          });
        }
        if (error === "Wrong password") {
          setPassword({
            ...password,
            valid: false,
            touched: true,
            errMsg:
              context.language === "en" ? "Wrong password" : "Špatné heslo",
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
        errMsg:
          context.language === "en"
            ? "You must provide valid email."
            : "Musíte zadat platný email.",
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
        errMsg:
          context.language === "en"
            ? "You must provide valid password."
            : "Musíte zadat platné heslo.",
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
          className={
            "card " +
            (context.theme === "dark"
              ? "bg-dark text-white"
              : "bg-info text-dark")
          }
          style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">
                {context.language === "en" ? "Login" : "Přihlášení"}
              </h2>
              <p className=" mb-5">
                {context.language === "en"
                  ? "Please enter your email and password to log in to your account."
                  : "Prosím zadejte svůj email a heslo pro přihlášení do vašeho účtu."}
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
                  placeholder={
                    context.language === "en"
                      ? "Enter a valid email address"
                      : "Zadejte platnou emailovou adresu"
                  }
                  onChange={handleEmailChange}
                  value={email.value}
                />
                <div className="invalid-feedback">
                  {email.errMsg
                    ? email.errMsg
                    : "You must provide valid email."}
                </div>
                <div className="valid-feedback">
                  {context.language === "en"
                    ? "Looks good."
                    : "Vypadá to dobře."}
                </div>
              </div>

              <div className="form-outline form-white mb-3">
                <label className="form-label" htmlFor="typePassword">
                  {context.language === "en" ? "Password" : "Heslo"}
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
                  placeholder={
                    context.language === "en"
                      ? "Enter your password"
                      : "Zadejte vaše heslo"
                  }
                  onChange={handlePasswordChange}
                  value={password.value}
                />

                <div className="invalid-feedback">
                  {password.errMsg
                    ? password.errMsg
                    : "You must provide valid password."}
                </div>

                <div className="valid-feedback">
                  {context.language === "en"
                    ? "Looks good."
                    : "Vypadá to dobře."}
                </div>
              </div>

              <p className="small mb-3 pb-lg-2">
                <a
                  className={
                    context.theme === "dark" ? "text-white-50" : "text-dark"
                  }
                  href="#!">
                  {context.language === "en"
                    ? "Forgot password?"
                    : "Zapomenuté heslo?"}
                </a>
              </p>

              <button
                className={
                  "btn btn-lg px-5" +
                  (submitting ? " disabled" : "") +
                  (context.theme === "dark" ? " btn-info" : " btn-dark")
                }
                type="submit"
                onClick={login}>
                {submitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"></span>
                ) : context.language === "en" ? (
                  "Login"
                ) : (
                  "Přihlásit se"
                )}
              </button>
              <p className="mb-0">
                {context.language === "en"
                  ? "Don't have an account? "
                  : "Nemáte účet? "}
                <a
                  href="/register"
                  className={
                    "fw-bold " +
                    (context.theme === "dark" ? "text-white" : "text-dark")
                  }>
                  {context.language === "en" ? "Register" : "Registrace"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
