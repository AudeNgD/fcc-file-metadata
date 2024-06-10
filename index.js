var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), uploadFile);

function uploadFile(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ error: "Please upload a file" });
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
