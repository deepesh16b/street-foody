const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// -----------mongodb------------------------

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://deepesh16b:atharva1@cluster0.5jmf7ef.mongodb.net/shopDB"
); // shopDB

const domains = new Map([
  ["universal indian", ["panipuri", "samosa", "chaat"]],
  ["north indian", ["chole bathure", "tawa chicken", "kulcha"]],
  ["fast food", ["pizza", "sandwich", "burger"]],
]);

const eachPostSchema = {
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
};

const EachPost = mongoose.model("EachPost", eachPostSchema);

const allPostSchema = {
  name: String,
  allPostsArray: [eachPostSchema],
};

const AllPost = mongoose.model("AllPost", allPostSchema);

const eachPost = new EachPost({
  title: "Day 1",
  content: "Just ending my day with a coffee!",
});

const defaultArray = [eachPost];

//--MAIN OBJECT FOR STORING ALL POSTS IN ARRAY
const allPost = new AllPost({
  name: "Main",
  allPostsArray: defaultArray,
});

// ----------get request---------------------

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/add", (req, res) => {
  const domainsArray = Array.from(domains.keys());
  res.render("add-shop", { domains: domainsArray });
});
app.get("/filter", (req, res) => {
  res.render("filter-shop");
});
app.get("/update", (req, res) => {
  res.render("update-shop");
});

// -----------post request--------------------

// ------------ listen - port--------------------

app.listen(process.env.PORT || 3000, () => {
  console.log("Server 'NEW' started at Port : 3000!");
});
