const express = require("express");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const {
  createListValidator,
  tokenValidator,
  updateListValidator,
} = require("../validations/lists_validations.js");

const lists = require("../test_data/lists.json");
const auth = require("../middlewares/auth.js");

function withoutProperty(obj, property) {
  const { [property]: unused, ...rest } = obj;

  return rest;
}

router.get("/lists", tokenValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let owned_lists = lists.filter((list) => list.owner_id === req.user.id);
  let shared_lists = lists.filter(
    (list) =>
      list.shared_users.filter((user) => user.id === req.user.id).length !== 0
  );

  res.status(200).json({ owned_lists, shared_lists });
});

router.get("/list/:id", tokenValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let list_id = req.params.id;

  console.log(req.user);

  //check if list exists and belongs to user
  let list = lists.find((list) => String(list.id) === list_id);
  console.log(list);

  if (!list) {
    return res.status(404).json({ errors: ["List not found"] });
  }

  if (list.owner_id !== req.user.id) {
    if (
      list.shared_users.filter((user) => user.id === req.user.id).length === 0
    ) {
      return res.status(403).json({ errors: ["Forbidden"] });
    }
  }

  res.status(200).json(list);
});

router.post("/list/create", createListValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);

    let new_list = {
      id: lists.length + 1,
      sys: {
        cts: new Date().toISOString(),
        mts: new Date().toISOString(),
        ver: 1,
      },
      name: data.name,
      owner_id: req.user.id,
      owner_name: req.user.name,
      shared: data.shared || false,
      shared_users: data.shared_users || [],
      items: data.items || [],
    };

    lists.push(new_list);
    return res.status(201).json(new_list);
  }
  res.status(400).json({ errors: errors.array() });
});

router.delete("/list/:id", tokenValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let list_id = req.params.id;

  //find list
  let list = lists.find((list) => String(list.id) === list_id);

  if (!list) {
    return res.status(404).json({ errors: ["List not found"] });
  }

  if (list.owner_id !== req.user.id) {
    return res.status(403).json({ errors: ["Forbidden"] });
  }

  lists.splice(lists.indexOf(list), 1);

  res.status(200).json({ message: "List deleted" });
});

router.put("/list/:id", updateListValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);

    let list_id = req.params.id;
    let list = lists.find((list) => String(list.id) === list_id);

    if (!list) {
      return res.status(404).json({ errors: ["List not found"] });
    }

    //check if user is owner
    if (list.owner_id !== req.user.id) {
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
  res.status(400).json({ errors: errors.array() });
});

module.exports = router;
