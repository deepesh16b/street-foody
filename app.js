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

const eachShopDataSchema = {
  name: {
    type: String,
    require: true,
  },
  owner: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  domain: {
    type: String,
    require: true,
  },
  items: {
    type: [String],
  },
  description: {
    type: String,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
};

const EachShop = mongoose.model("EachShop", eachShopDataSchema);

const allShopsSchema = {
  name: String,
  allShopsArray: [eachShopDataSchema],
};

const AllShops = mongoose.model("AllShops", allShopsSchema);

const eachShop = new EachShop({
  name: "Bombay Foods",
  owner: "Faizu",
  location: "Piplani, Bhopal",
  domain: "north indian",
  items: ["chole bathure", "tawa chicken"],
  description: "Bombay foods variety",
  start_time: "10am",
  end_time: "10pm",
});

const defaultArray = [eachShop];

//--MAIN OBJECT FOR STORING ALL POSTS IN ARRAY
const allShops = new AllShops({
  name: "Main",
  allShopsArray: defaultArray,
});
// AllShops.save();
// ----------get request---------------------

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/add", (req, res) => {
  const domainsArray = Array.from(domains.keys());
  res.render("add-shop", { domains: domainsArray });
});
app.get("/filter", (req, res) => {
  const domainsArray = Array.from(domains.keys());
  res.render("filter-shop", { domains: domainsArray });
});
app.get("/update", (req, res) => {
  res.render("update-shop");
});
app.get("/added", (req, res) => {
  res.render("added");
});
app.get("/fail-added", (req, res) => {
  res.render("fail-added");
});
// ------- API endpoint-----------
app.get('/search/:option', async (req, res) => {
  const option = decodeURIComponent(req.params.option);

  try {
    const foundShops = await AllShops.find({'allShopsArray.domain': option});

    if (foundShops.length === 0) {
      res.json([]);
    } else {
      const shops = foundShops[0].allShopsArray.filter(shop => shop.domain === option);
      res.json(shops);
    }
  } catch (error) {
    console.log(error);
    res.send('Error occurred while searching for shops');
  }
});

// -----------post request--------------------

app.post("/add", function (req, res) {
  const newShop = new EachShop({
    name: req.body.name,
    owner: req.body.owner,
    location: req.body.location,
    domain: req.body.domain,
    description: req.body.description,
    // items: ["chole bathure", "tawa chicken"],
    // start_time: "10am",
    // end_time: "10pm",
  });

  AllShops.find({}, function (error, foundArrayOfObjects) {
    if (foundArrayOfObjects.length === 0) {
      AllShops.insertMany([allShops], function (err) {
        if (err) console.log(err);
        else console.log("Successfully saved default items to database");
      });
      res.redirect("/");
    }
    // const posts = foundArrayOfObjects[0].allPostsArray;
    // res.render("home", {content : homeStartingContent, allPosts : posts});
  });

  AllShops.findOne({}, function (err, foundObject) {
    if (err) console.log(err);
    else {
      try {
        foundObject.allShopsArray.push(newShop);
        foundObject.save();
        console.log("New Shop added in Database!");
        res.redirect("/added");
      } catch (err) {
        console.log(err.message);
        res.redirect("/fail-added");
      }
    }
  });
});

// ------------ listen - port--------------------

app.listen(process.env.PORT || 3000, () => {
  console.log("Server 'NEW' started at Port : 3000!");
});
