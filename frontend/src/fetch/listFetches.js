const config = require("../config");

let lists = require("./mock_data/ShoppingList.Lists.json");

export async function getListsFetch(user) {
  console.log("getListsFetch", config.mock_data);
  if (config.mock_data) {
    // for mocking token is user id
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("user", user);
        let userActiveLists = lists.filter(
          (list) => list.owner_id === user._id && list.archived === false
        );
        let userSharedLists = lists.filter(
          (list) =>
            list.shared_users.filter((u) => u.id === user._id).length > 0
        );

        let userArchivedLists = lists.filter(
          (list) => list.owner_id === user._id && list.archived === true
        );
        console.log("active", userActiveLists);
        console.log("shared", userSharedLists);
        console.log("archived", userArchivedLists);
        resolve({
          active_lists: userActiveLists,
          shared_lists: userSharedLists,
          archived_lists: userArchivedLists,
        });
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          return data.lists;
        } else {
          throw new Error(data.message);
        }
      });
  }
}

export async function getListFetch(listId, user) {
  console.log("getListFetch", config.mock_data);
  if (config.mock_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let list = lists.find((list) => list._id === listId);
        console.log("getList", list);

        if (list === undefined) {
          reject(new Error("List not found"));
        } else {
          if (list.owner_id !== user._id) {
            let sharedUser = list.shared_users.find((u) => u.id === user._id);
            if (sharedUser === undefined) {
              reject(new Error("List not found"));
            }
          }
        }
        console.log("list", list);
        resolve(list);
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/lists/" + listId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          return data.list;
        } else {
          throw new Error(data.message);
        }
      });
  }
}

export async function addListFetch(list, user) {
  if (config.mock_data) {
    return new Promise((resolve, reject) => {
      console.log("debug", user);
      setTimeout(() => {
        list._id = Math.random().toString(36).substr(2, 9);
        list.owner_id = user._id;
        list.owner_name = user.nickname;
        list.shared_users = [];
        list.archived = false;
        list.item_list = [];
        lists.push(list);
        console.log("addList", list, lists);
        resolve(list);
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          return data.list;
        } else {
          throw new Error(data.message);
        }
      });
  }
}

export async function editListFetch(list, user) {
  if (config.mock_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let listIndex = lists.findIndex((l) => l._id === list._id);
        if (listIndex === -1) {
          reject(new Error("List not found"));
        }
        lists[listIndex] = list;
        resolve(list);
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/lists/" + list._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          return data.list;
        } else {
          throw new Error(data.message);
        }
      });
  }
}

export async function deleteListFetch(listId, user) {
  if (config.mock_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let listIndex = lists.findIndex((l) => l._id === listId);
        if (listIndex === -1) {
          reject(new Error("List not found"));
        }
        lists.splice(listIndex, 1);
        resolve();
      }, 1000);
    });
  } else {
    return fetch(config.api_url + "/lists/" + listId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          return;
        } else {
          throw new Error(data.message);
        }
      });
  }
}
