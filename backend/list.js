const express = require("express");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const {
  createListValidator,
  tokenValidator,
  updateListValidator,
} = require("./validation.js");

const lists = require("./test_data/lists.json");

function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;

  return rest;
}

router.get("/list/:id", tokenValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //token is fake, its only for dev purposes and its user id
  const token = req.headers.authorization.split(" ")[1];
  let list_id = req.params.id;

  //check if list exists and belongs to user
  let list = lists.find((list) => String(list.id) === list_id);

  if (!list) {
    return res.status(404).json({ errors: ["List not found"] });
  }

  if (String(list.owner_id) !== token) {
    if (
      list.shared_users.filter((user) => String(user.id) === token).length === 0
    ) {
      return res.status(403).json({ errors: ["Forbidden"] });
    }
  }

  res.status(200).json(list);
});

router.post("/list/create", createListValidator, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);

    let list = lists.find((list) => list.name === data.name);
    if (list) {
      return res.status(422).json({ errors: ["List already exists"] });
    }
    let new_list = {
      id: lists.length + 1,
      name: data.name,
      owner_id: data.authorization.split(" ")[1],
      shared_users: data.shared_users || [],
      items: data.items || [],
      sys: {
        cts: new Date().toISOString(),
        mts: new Date().toISOString(),
        ver: 1,
      },
    };

    lists.push(new_list);
    return res.status(200).json(new_list);
  }
  res.status(422).json({ errors: errors.array() });
});

router.delete("/list/:id", tokenValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //token is fake, its only for dev purposes and its user id
  const token = req.headers.authorization.split(" ")[1];
  let list_id = req.params.id;

  //check if list exists and belongs to user
  let list = lists.find((list) => String(list.id) === list_id);

  if (!list) {
    return res.status(404).json({ errors: ["List not found"] });
  }

  if (String(list.owner_id) !== token) {
    return res.status(403).json({ errors: ["Forbidden"] });
  }

  lists.splice(lists.indexOf(list), 1);

  res.status(200).json({ message: "List deleted" });
});

router.put("/list/:id", updateListValidator, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    console.log(data);

    let list_id = req.params.id;
    let list = lists.find((list) => String(list.id) === list_id);

    if (!list) {
      return res.status(404).json({ errors: ["List not found"] });
    }

    //check if user is owner
    if (String(list.owner_id) !== data.authorization.split(" ")[1]) {
      return res.status(403).json({ errors: ["Forbidden"] });
    }

    list.name = data.name;
    list.shared_users = data.shared_users || [];
    list.items = data.items || [];
    list.sys.mts = new Date().toISOString();
    list.sys.rev += 1;
    list.archived = data.archived || false;

    //TODO update list in db

    //update list in lists
    lists.splice(lists.indexOf(list), 1);
    lists.push(list);

    return res.status(200).json(list);
  }
  res.status(422).json({ errors: errors.array() });
});

module.exports = router;
