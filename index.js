let express = require("express");
let app = express();
require("dotenv").config();
let getschema = require("./public/modules/schema");
let mongo = require("mongoose");
let bp = require("body-parser");
let cors = require("cors");
app.use(express.static("public"));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());
const allowedorigin = ["http://localhost:3000"];
const options = (cors.CorsOptions = {
  origin: allowedorigin,
});
app.use(cors(options));
mongo
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((op) => console.log("connect"))
  .catch((err) => console.log("error at- " + err));

//routes

app.get("/", (req, res) => {
  getschema
    .find()
    .then((op) => {
      res.json(op);
    })
    .catch((err) => console.log("err at search" + err));
});
app.post("/", (req, res) => {
  let createpost = new getschema({
    task: req.body.saveastask,
  });
  createpost
    .save()
    .then(() => res.send("Added"))
    .catch((err) => res.send("couldnt Add"));
});
app.put("/:id", (req, res) => {
  getschema
    .findByIdAndUpdate(req.params.id, { task: req.body.saveastask })
    .then(() => res.send("updated"))
    .catch((err) => res.send("couldnt updated"));
});
app.delete("/:id", (req, res) => {
  getschema
    .findByIdAndDelete(req.params.id)
    .then(() => res.send("deleted"))
    .catch((err) => res.send("couldnt deleted"));
});
app.listen(process.env.PORT, () => {
  console.log("listening at - " + process.env.PORT);
});
