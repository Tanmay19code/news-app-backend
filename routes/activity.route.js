const express = require("express");
const router = express.Router();

const { createitem, deleteitem } = require("../controllers/activity.controller");

const fetchuser = require("../middlewares/fetchuser.middleware.js");

//Route 1: Add item to favourite list: POST "/api/activity/:link" . login required
router.post("/createitem/:link", fetchuser, createitem);
router.post("/deleteitem/:id", fetchuser, deleteitem);

module.exports = router;
