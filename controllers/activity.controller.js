const User = require("../models/user.model.js");
const Favourite = require("../models/favourite.model.js");
let mongoose = require("mongoose");

const response = {
  success: true,
  message: "",
};

// Create new item
const createitem = async (req, res) => {
  const createdBy = req.user.id;

  const { urlLink, imgLink, title, description, badge, author, date } =
    req.body;

  const linkId = new mongoose.Types.ObjectId();

  if (!createdBy) {
    response.success = false;
    response.message = "Please validate using authtoken";
    console.log(response);
    return res.status(401).send("Please validate using authtoken");
  }

  await Favourite.findOne({ createdBy: createdBy })
    .then(async (result) => {
      if (result) {
        let array = result.link;
        let updatedArray = [
          ...array,
          {
            url: urlLink,
            _id: linkId,
            img: imgLink,
            title: title,
            description: description,
            badge: badge,
            author: author,
            date: date,
          },
        ];
        await Favourite.findOneAndUpdate(
          { createdBy: createdBy },
          { link: updatedArray }
        )
          .then((result) => {
            response.success = true;
            response.message = "List appended successfully";
            console.log(response);
            res.status(200).send(result);
          })
          .catch((error) => {
            response.success = false;
            response.message = "Some error has occured";
            console.log(response, error);
            res.status(500).send(response);
          });
      } else {
        linkArray = [
          {
            url: urlLink,
            _id: linkId,
            img: imgLink,
            title: title,
            description: description,
            badge: badge,
            author: author,
            date: date,
          },
        ];
        let newFavourite = { createdBy: createdBy, link: linkArray };
        await Favourite.create(newFavourite)
          .then((result2) => {
            if (result2) {
              response.success = true;
              response.message =
                "Item added succesfully, list appended successfully";
              console.log(response);
              res.status(200).send(result2);
            } else {
              response.success = false;
              response.message = "Some error has occured";
              console.log(response);
              res.status(500).send(response);
            }
          })
          .catch((error) => {
            response.message = "Some error has occured";
            console.log(response, error);
            res.status(500).send(error.message);
          });
      }
    })
    .catch((error) => {
      response.message = "Some error has occured";
      console.log(response, error);
      res.status(500).send(error.message);
    });
};

// Delete
const deleteitem = async (req, res) => {
  const createdBy = req.user.id;
  const linkId = req.body.linkId;

  if (!createdBy) {
    response.success = false;
    response.message = "Please validate using authtoken";
    console.log(response);
    return res.status(401).send("Please validate using authtoken");
  }

  await Favourite.findOne({ createdBy: createdBy })
    .then(async (result) => {
      if (result) {
        let array = result.link;
        // remove alement from array
        let updatedArray = array.filter((element) => {
          return element.link != linkId;
        });
        // let updatedArray = [...array, { url: urlLink, _id: linkId }];
        await Favourite.findOneAndUpdate(
          { createdBy: createdBy },
          { link: updatedArray }
        )
          .then((result) => {
            response.success = true;
            response.message = "Item deleted successfully";
            console.log(response);
            res.status(200).send(result);
          })
          .catch((error) => {
            response.success = false;
            response.message = "Some error has occured";
            console.log(response);
            res.status(500).send(response);
          });
      } else {
        response.message = "This link not found";
        console.log(response);
        res.status(500).send("This link not found");
      }
    })
    .catch((error) => {
      response.message = "Some error has occured";
      console.log(response, error);
      res.status(500).send(error.message);
    });
};

// Get all items
const getitems = async (req, res) => {
  const createdBy = req.user.id;
  if (!createdBy) {
    response.success = false;
    response.message = "Please validate using authtoken";
    console.log(response);
    return res.status(401).send("Please validate using authtoken");
  }
  await Favourite.find({ createdBy: createdBy })
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Items found successfully";
        console.log(response);
        return res
          .status(200)
          .send({ numberOfItems: result[0].link.length, items: result });
      } else {
        response.success = false;
        response.message = "No items found";
        console.log(response);
        return res.status(404).send({ numberOfItems: 0 });
      }
    })
    .catch((error) => {
      response.success = false;
      response.message = "Some error has occured";
      console.log(response, error);
      res.status(500).send(error);
    });
};

module.exports = { createitem, deleteitem, getitems };
