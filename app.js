const express = require("express");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
const multer = require("multer");
/* module requiring section */

const app = express();
const _path = path.join(__dirname, "/dist");
const port = 3000;
console.log(_path);
/* path & port_num settings section */

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "/download"));
  },
  filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, "latin1").toString("utf8");
    cb(null, fix);
  },
});
let upload = multer({ storage: storage });
/* storage element setting section */

app.use("/", express.static(_path));
app.use(logger("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
/* using by app section */

app.get("/test", (req, res) => {
  let id = req.query.id;
  let name = req.query.name;
  let result = "아이디: " + id + "<br>이름: " + name;
  res.send(result);
});
/* routing section */

app.post("/config", (req, res) => {
  let name = req.body.name ? req.body.name : "이름";
  let age = req.body.age ? req.body.age : "나이";
  let request = req.body.request ? req.body.request : "요청사항";

  const data = "나이: " + age + "\t 문의사항: " + request;
  fs.writeFile(_path + "/" + name + ".txt", data, (e) => {
    if (e) console.log(e);
  });
  res.send(
    `<script>alert('${
      name + ".txt"
    }로 만들었습니다.');location.replace('index.html')</script>`
  );
});
app.post("/down", upload.single("ufile"), (req, res) => {
  res.send(
    `<script>alert('자료 전송 완료.');location.replace('index.html')</script>`
  );
});
/* file creating || sending section */

app.listen(port, (_) => {
  console.log(port + "로 시작.");
});
/* server opening section */
