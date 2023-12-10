const config = require("../config");

let users = require("./mock_data/ShoppingList.Users.json");

export async function loginFetch(email, password) {
  console.log("loginFetch", config.mock_data);
  if (config.mock_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = users.filter((user) => user.email === email);
        if (user.length === 0) {
          reject("User not exist");
        } else if (user[0].password !== password) {
          reject("Wrong password");
        } else {
          resolve(user[0]);
        }
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          return data.user;
        } else if (data.message === "User not exist") {
          throw new Error("User not exist");
        } else if (data.message === "Wrong password") {
          throw new Error("Wrong password");
        }
      });
  }
}
