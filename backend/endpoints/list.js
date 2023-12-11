const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { validationResult, matchedData } = require("express-validator");
const Joi = require("joi");
const {
  createListValidator,
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

router.get("/lists", auth, (req, res) => {
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

router.get("/list/:id", auth, (req, res) => {
  let list_id = req.params.id;

  //check if list exists and belongs to user
  getList(list_id).then((list) => {
    if (!list) {
      return res.status(404).json({ errors: ["List not found"] });
    }

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

    //check if items are valid

    if (data.item_list && data.item_list.length > 0) {
      const item_list_schema = Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          quantity: Joi.number().required(),
          unit: Joi.string().required(),
          checked: Joi.boolean().required(),
        })
      );

      const { error } = item_list_schema.validate(data.item_list);

      if (error) {
        return res
          .status(400)
          .json({ errors: ["item_list error", error.message] });
      }
    }

    if (data.shared_users && data.shared_users.length > 0) {
      const shared_users_schema = Joi.array().items(
        Joi.object({
          nickname: Joi.string().required(),
          id: Joi.string().required(),
        })
      );

      const { error } = shared_users_schema.validate(data.shared_users);

      if (error) {
        return res
          .status(400)
          .json({ errors: ["shared_users error", error.message] });
      }
    }

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
      }
    });
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

router.delete("/list/:id", auth, (req, res) => {
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
        return res.status(200).json({ deletedCount: result.deletedCount });
      }
    });
  });
});

router.put("/list/:id", updateListValidator, auth, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let data = matchedData(req);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ errors: ["No data provided"] });
    }

    if (data.item_list) {
      const itemSchema = Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        unit: Joi.string().required(),
        checked: Joi.boolean().required(),
      });

      const item_list_schema = Joi.array().items(itemSchema);

      const { error } = item_list_schema.validate(data.item_list);

      if (error) {
        return res
          .status(400)
          .json({ errors: ["item_list error", error.message] });
      }
    }

    if (data.shared_users && data.shared_users.length > 0) {
      const shared_users_schema = Joi.array().items(
        Joi.object({
          nickname: Joi.string().required(),
          id: Joi.string().required(),
        })
      );

      const { error } = shared_users_schema.validate(data.shared_users);

      if (error) {
        return res
          .status(400)
          .json({ errors: ["shared_users error", error.message] });
      }
    }

    let list_id = req.params.id;

    let user_is_owner = false;

    getList(list_id).then((list) => {
      if (!list) {
        return res.status(404).json({ errors: ["List not found"] });
      }

      if (list.owner_id !== req.user._id) {
        if (
          list.shared_users.filter((user) => user.id === req.user._id)
            .length === 0
        ) {
          return res.status(403).json({ errors: ["Forbidden"] });
        }
      } else {
        user_is_owner = true;
      }

      if (data.shared_users) {
        if (!user_is_owner) {
          return res.status(403).json({ errors: ["Forbidden"] });
        }
      }

      if (data.archived) {
        if (!user_is_owner) {
          return res.status(403).json({ errors: ["Forbidden"] });
        }
      }

      if (data.name) {
        if (!user_is_owner) {
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

      updateList(list_id, updateData).then((result) => {
        if (result.acknowledged) {
          getList(list_id).then((list) => {
            return res.status(200).json(list);
          });
        }
      });
    });
  }
});

module.exports = router;
