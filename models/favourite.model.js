const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavouriteSchema = new Schema({
  createdBy: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  link: {
    type: [{}],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Favourite = mongoose.model("favourite", FavouriteSchema);
module.exports = Favourite;
