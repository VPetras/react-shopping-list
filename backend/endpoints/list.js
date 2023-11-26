const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const {
  createListValidator,
  tokenValidator,
  updateListValidator,
} = require("../validations/lists_validations.js");

const {
  createList,
  updateList,
  getActiveLists,
  getArchivedLists,
  getSharedLists,
  deleteList,
  getList,
} = require("../db/lists.js");

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
  getActiveLists(req.user._id).then((active_lists) => {
    getArchivedLists(req.user._id).then((archived_lists) => {
      getSharedLists(req.user._id).then((shared_lists) => {
        let lists = {
          active_lists: active_lists,
          archived_lists: archived_lists,
          shared_lists: shared_lists,
        };
        return res.status(200).json(lists);
      });
    });
  });
});

router.get("/list/:id", tokenValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let list_id = req.params.id;

  console.log(req.user);

  //check if list exists and belongs to user
  getList(list_id).then((list) => {
    if (!list) {
      return res.status(404).json({ errors: ["List not found"] });
    }

    console.log(list);

    if (list.owner_id !== req.user._id) {
      if (
        list.shared_users.filter((user) => user.id === req.user._id).length ===
        0
      ) {
        return res.status(403).json({ errors: ["Forbidden"] });
      } else {
        return res.status(200).json(list);
      }
    } else {
      return res.status(200).json(list);
    }
  });
});

router.post("/list/create", createListValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);

    let new_list = {
      sys: {
        cts: new Date().toISOString(),
        mts: new Date().toISOString(),
        ver: 0,
      },
      name: data.name,
      owner_id: req.user._id,
      owner_name: req.user.nickname,
      archived: data.archived || false,
      shared_users: data.shared_users || [],
      item_list: data.item_list || [],
    };

    createList(new_list).then((result) => {
      if (result.acknowledged) {
        return res.status(201).json(new_list);
      } else {
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    });
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

router.delete("/list/:id", tokenValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let list_id = req.params.id;

  //find list
  getList(list_id).then((list) => {
    if (!list) {
      return res.status(404).json({ errors: ["List not found"] });
    }

    //check if user is owner
    if (list.owner_id.toString() !== req.user._id) {
      return res.status(403).json({ errors: ["Forbidden"] });
    }

    deleteList(list_id).then((result) => {
      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "List deleted" });
      } else {
        return res.status(500).json({ errors: ["Internal Server Error"] });
      }
    });
  });
});

router.put("/list/:id", updateListValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);
    console.log(data);

    let list_id = req.params.id;

    getList(list_id).then((list) => {
      if (!list) {
        return res.status(404).json({ errors: ["List not found"] });
      }

      console.log(list, req.user);

      if (list.owner_id !== req.user._id) {
        if (
          list.shared_users.filter((user) => user.id === req.user._id)
            .length === 0
        ) {
          return res.status(403).json({ errors: ["Forbidden"] });
        }
      }
      let updateData = { $set: {} };

      data.name !== undefined ? (updateData.$set.name = data.name) : null;
      data.shared_users !== undefined
        ? (updateData.$set.shared_users = data.shared_users)
        : null;
      data.item_list !== undefined
        ? (updateData.$set.item_list = data.item_list)
        : null;
      data.archived !== undefined
        ? (updateData.$set.archived = data.archived)
        : null;
      updateData.$set.sys = list.sys;
      updateData.$set.sys.mts = new Date().toISOString();
      updateData.$set.sys.ver += 1;

      console.log(updateData);

      updateList(list_id, updateData).then((result) => {
        console.log(result);
        if (result.acknowledged) {
          getList(list_id).then((list) => {
            return res.status(200).json(list);
          });
        } else {
          return res.status(500).json({ errors: ["Internal Server Error"] });
        }
      });
    });
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

module.exports = router;
