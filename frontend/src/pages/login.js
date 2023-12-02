import React, { Component } from "react";

import { LoginForm } from "../components/forms/loginform";

class LoginPage extends Component {
  render() {
    return (
      <div className="container pt-5">
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
