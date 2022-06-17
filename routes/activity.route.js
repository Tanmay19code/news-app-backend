const express = require("express");
const router = express.Router();

const {
  createitem,
  deleteitem,
  getitems
} = require("../controllers/activity.controller");

const fetchuser = require("../middlewares/fetchuser.middleware.js");

//Route 1: Add item to favourite list: POST "/api/activity//createitem/:urlLink/:imgLink/:title/:description/:badge/:author/:date" . login required
router.post(
  "/createitem",
  fetchuser,
  createitem
);

router.post("/deleteitem", fetchuser, deleteitem);

router.post("/getitems",fetchuser, getitems);

module.exports = router;
